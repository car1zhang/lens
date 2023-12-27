import datetime

from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder

from bson.objectid import ObjectId
from typing import List
from models import Task, TaskUpdate

task_router = APIRouter()

@task_router.get('/focus/', response_description='get focused task')
def get_focused_task(request: Request):
    return request.app.focus

@task_router.put('/focus/{_id}', response_description='set focused task', response_model=Task)
def set_focused_task(_id: str, request: Request):
    task = request.app.database['tasks'].find_one({'_id': _id})
    request.app.focus = task['_id']
    return task

@task_router.get('/', response_description='get all tasks', response_model=List[Task])
def get_all_tasks(request: Request):
    tasks = list(request.app.database['tasks'].find())
    for task in tasks:
        task['_id'] = str(task['_id'])
    return tasks

@task_router.get('/{_id}', response_description='get details of a task', response_model=Task)
def get_task(_id: str, request: Request):
    task = request.app.database['tasks'].find_one({'_id': _id})
    return task

@task_router.post('/', response_description='post a task', status_code=status.HTTP_201_CREATED, response_model=Task)
def post_task(request: Request, task: Task = Body(...)):
    task = jsonable_encoder(task)
    task['creation'] = datetime.datetime.now(tz=datetime.timezone.utc)
    task['deadline'] = datetime.datetime.strptime(task['deadline'], '%Y-%m-%dT%H:%M:%S.%f')
    new_task = request.app.database['tasks'].insert_one(task)
    created_task = request.app.database['tasks'].find_one(
        {'_id': new_task.inserted_id}
        )
    return created_task

@task_router.put('/{_id}', response_description='edit a task', response_model=Task)
def edit_task(_id: str, request: Request, task: TaskUpdate = Body(...)):
    task = {k: v for k, v in task.dict().items() if v is not None}
    if len(task) >= 1:
        update_result = request.app.database['tasks'].update_one(
            {'_id': _id},
            {'$set': task}
            )

    if (existing_task := request.app.database['tasks'].find_one({'_id': _id})) is not None:
        return existing_task

@task_router.put('/toggle/{_id}', response_description='toggle completion of a task', response_model=Task)
def toggle_task(_id: str, request: Request):
    task = request.app.database['tasks'].find_one({'_id': _id})
    request.app.database['tasks'].update_one(
        {'_id': _id}, 
        {'$set': {'completion': not task['completion']}}
        )
    return task

@task_router.delete('/{_id}', response_description='delete a task')
def delete_task(_id: str, request: Request, response: Response):
    delete_result = request.app.database['tasks'].delete_one({'_id': _id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

