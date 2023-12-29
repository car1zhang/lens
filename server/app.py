import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pymongo import MongoClient

from routers.query import query_router
from routers.modify import modify_router
from routers.focus import focus_router

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
    )

@app.on_event('startup')
def startup_db_client():
    app.focus = ''
    app.mongodb_client = MongoClient(os.environ.get('MONGODB_URI'))
    app.database = app.mongodb_client['lens']

@app.on_event('shutdown')
def shutdown_db_client():
    app.mongodb_client.close()

app.include_router(query_router, prefix="/tasks")
app.include_router(modify_router, prefix="/tasks")
app.include_router(focus_router, prefix="/tasks/focus")
