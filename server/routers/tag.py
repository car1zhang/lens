from fastapi import APIRouter, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder

from models import Task
from typing import List

tag_router = APIRouter()

@tag_router.get('/', response_description='get all tags', response_model=List[str])
def get_all_tags(request: Request):
    tags = list(request.app.database['tasks'].distinct('tags'))
    tags.sort()
    return tags

