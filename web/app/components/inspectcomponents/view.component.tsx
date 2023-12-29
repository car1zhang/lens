'use client'
import React from 'react'

export default function View({ viewTask, setViewTaskId, setIsEdit }) {

  const del = async () => {
    setViewTaskId('')
    await fetch('http://localhost:8000/tasks/' + viewTask['_id'], {method: 'DELETE'})
  }
  const focus = async () => {
    await fetch('http://localhost:8000/tasks/focus/' + viewTask['_id'], {method: 'PUT'})
  }
  
  const priorityColors = ['text-red-400', 'text-amber-500', 'text-green-500', 'text-blue-400', 'text-neutral-400']

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col">
      <h1 className="pt-4 py-2 px-4 border-b border-neutral-400 hover:bg-neutral-300">_id: {viewTask['_id']}</h1>
      
      <h1 className="text-2xl font-bold py-2 px-4 border-b border-neutral-400 hover:bg-neutral-300">{viewTask['name']}</h1>
      <ul className="text-neutral-400 flex py-2 px-4 border-b border-neutral-400 hover:bg-neutral-300">
        {viewTask['tags'] == null ? '' :
          viewTask['tags'].length == 0 ? 'untagged' : 
          viewTask['tags'].map(tag => (
            <li key={tag}>
              {(tag == viewTask['tags'][0] ? '' : ', ') + tag}
            </li>
          ))
        }
      </ul>
      <p className={"py-2 px-4 border-b border-neutral-400 hover:bg-neutral-300 " + priorityColors[viewTask['priority']]}>priority {viewTask['priority']}</p>
      <p className="text-neutral-400 py-2 px-4 border-b border-neutral-400 hover:bg-neutral-300">
        {viewTask['deadline'] == null ? 'no deadline' : (new Date(viewTask['deadline'])).toString()}
      </p>
      {viewTask['notes'] == '' ? '' : 
        <p className="whitespace-pre-wrap py-2 px-4 border-b border-neutral-400 hover:bg-neutral-300">{viewTask['notes']}</p>
      }
      
      {viewTask['completion'] ? 
        <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold mt-4 my-2 mx-4" onClick={del}>delete</button> :
        <div className="flex gap-4 mt-4 my-2 mx-4">
          <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-2/4" onClick={focus}>focus</button>
          <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-1/4" onClick={() => setIsEdit(true)}>edit</button>
          <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-1/4" onClick={del}>delete</button>
        </div>
      }
    </div>
  )
}

