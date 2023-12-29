import datetime

from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder

from bson.objectid import ObjectId
from typing import List
from models import Task, TaskUpdate

modify_router = APIRouter()

@modify_router.post('/', response_description='post a task', status_code=status.HTTP_201_CREATED, response_model=Task)
def post_task(request: Request, task: Task = Body(...)):
    task = jsonable_encoder(task)
    task['creation'] = datetime.datetime.now(tz=datetime.timezone.utc)
    if task['deadline'] is not None:
        task['deadline'] = datetime.datetime.strptime(task['deadline'], '%Y-%m-%dT%H:%M:%SZ') 
    new_task = request.app.database['tasks'].insert_one(task)
    created_task = request.app.database['tasks'].find_one(
        {'_id': new_task.inserted_id}
        )
    return created_task

@modify_router.put('/{_id}', response_description='edit a task', response_model=Task)
def edit_task(_id: str, request: Request, task_update: TaskUpdate = Body(...)):
    task_update = {k: v for k, v in task_update.dict().items() if v is not None} # convert taskupdate object to dict

    if len(task_update) >= 1:
        update_result = request.app.database['tasks'].update_one(
            {'_id': _id},
            {
                '$set': task_update,
                '$unset': {'deadline': ''} if 'deadline' not in task_update or task_update['deadline'] is None else {}
            }
            )

    if (existing_task := request.app.database['tasks'].find_one({'_id': _id})) is not None:
        return existing_task

@modify_router.put('/toggle/{_id}', response_description='toggle completion of a task', response_model=Task)
def toggle_task(_id: str, request: Request):
    task = request.app.database['tasks'].find_one({'_id': _id})
    request.app.database['tasks'].update_one(
        {'_id': _id}, 
        {'$set': {'completion': not task['completion']}}
        )
    return task

@modify_router.delete('/{_id}', response_description='delete a task')
def delete_task(_id: str, request: Request, response: Response):
    delete_result = request.app.database['tasks'].delete_one({'_id': _id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

