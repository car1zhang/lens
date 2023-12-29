import uuid
import datetime
from typing import Optional, List
from pydantic import BaseModel, Field

class Task(BaseModel):
    id: str = Field(default=uuid.uuid4(), alias='_id')
    completion: bool = False

    creation: datetime.datetime = datetime.datetime.today()
    deadline: Optional[datetime.datetime] = None
    name: str = 'new task'
    tags: List[str] = []
    priority: int = 4
    notes: str = ''

    parents: List[str] = []
    children: List[str] = []
    pre: str = ''
    post: str = ''

class TaskUpdate(BaseModel):
    deadline: Optional[datetime.datetime] = None
    name: Optional[str] = None
    notes: Optional[str] = None
    tags: Optional[List[str]] = None
    priority: Optional[int] = None
    
