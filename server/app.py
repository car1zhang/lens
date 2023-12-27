import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pymongo import MongoClient

from taskrouter import task_router

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

app.include_router(task_router, prefix="/tasks")
