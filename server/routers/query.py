import datetime

from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder

from bson.objectid import ObjectId
from typing import List
from models import Task

query_router = APIRouter()

@query_router.get('/', response_description='get all tasks', response_model=List[Task])
def get_all_tasks(request: Request):
    tasks = list(request.app.database['tasks'].find())
    for task in tasks:
        task['_id'] = str(task['_id'])
    return tasks

@query_router.get('/{_id}', response_description='get details of a task', response_model=Task)
def get_task(_id: str, request: Request):
    task = request.app.database['tasks'].find_one({'_id': _id})
    return task
