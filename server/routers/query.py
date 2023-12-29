import datetime

from fastapi import APIRouter, Body, Request, Response, Query, HTTPException, status
from fastapi.encoders import jsonable_encoder

from bson.objectid import ObjectId
from typing import List, Annotated
from models import Task

query_router = APIRouter()

@query_router.get('/', response_description='get tasks while filtering/sorting - completion [0, 2] - priority [0, 4] - tag', response_model=List[Task])
def get_all_tasks(request: Request, cf: int = 2, pf: int = 4, tf: Annotated[list[str] | None, Query()] = None):
    params = {
        'priority': {'$lte': pf}
    }
    if cf == 0:
        params['completion'] = False
    elif cf == 1:
        params['completion'] = True
    if tf is not None:
        params['$or'] = [{'tags': tag} for tag in tf]

    tasks = list(request.app.database['tasks'].find(params).sort(['completion', 'priority', 'deadline', 'name']))
    for task in tasks:
        task['_id'] = str(task['_id'])
    return tasks

@query_router.get('/{_id}', response_description='get details of a task', response_model=Task)
def get_task(_id: str, request: Request):
    task = request.app.database['tasks'].find_one({'_id': _id})
    return task
