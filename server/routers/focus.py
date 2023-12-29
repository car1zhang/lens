from fastapi import APIRouter, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder

from models import Task

focus_router = APIRouter()

@focus_router.get('/', response_description='get focused task')
def get_focused_task(request: Request):
    return request.app.focus

@focus_router.put('/{_id}', response_description='set focused task', response_model=Task)
def set_focused_task(_id: str, request: Request):
    task = request.app.database['tasks'].find_one({'_id': _id})
    request.app.focus = task['_id']
    return task
@focus_router.put('/', response_description='unfocus task')
def unfocus_task(request: Request, response: Response):
    request.app.focus = ''
    response.status_code = status.HTTP_204_NO_CONTENT
    return response
