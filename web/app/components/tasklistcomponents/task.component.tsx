'use client'
import React from 'react'

export default function Task({ task, viewTaskId, setViewTaskId }) {

  const finish = async () => {
    await fetch('http://localhost:8000/tasks/toggle/' + task['_id'], {method: 'PUT'})
  }

  const priorityColors = ['text-red-400', 'text-amber-500', 'text-green-500', 'text-blue-400', 'text-neutral-400']

  return (
    <li className={
      "border-b border-neutral-400 px-6 py-2 flex justify-between " + (viewTaskId == task['_id'] ? "bg-neutral-700 text-neutral-200 hover:bg-neutral-600" : "hover:bg-neutral-300")
    }>

      <div className="flex gap-4">

        <button className={
          "border-2 px-2 text-xs " + (task['completion'] ? "border-neutral-400 text-neutral-400 hover:bg-neutral-400 hover:text-neutral-200" : viewTaskId == task['_id'] ? "border-neutral-200 text-neutral-200 hover:bg-neutral-200 hover:text-neutral-800" : "border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-neutral-200")
        } onClick={finish}>X</button>

        <h1 className={
          "cursor-pointer w-64 overflow-clip " + (viewTaskId == task['_id'] ? "font-bold " : "") + (task['completion'] ? "line-through text-neutral-400 ": "")
        } onClick={() => {
          setViewTaskId(viewTaskId == task['_id'] ? '' : task['_id'])
        }}>
          {task['name']}
        </h1>

        <ul className="text-neutral-400 flex">
          {task['tags'].map((tag, idx) => (
            <li key={idx}>
              {(idx == 0 ? '' : ', ') + tag}
            </li>
          ))}
        </ul>

      </div>
            

      {task['completion'] ? '' :
        <p>
          <span className={priorityColors[task['priority']]}>
            p{task['priority']}
          </span>

          {task['deadline'] == null ? '' : 
            (new Date(task['deadline']) < Date.now() ? <span className="text-red-400"> · overdue</span> :
              <span className="text-neutral-400">
                {' · '}
                {Math.floor((new Date(task['deadline']) - Date.now()) / 3600000)}h
                {Math.floor((new Date(task['deadline']) - Date.now()) % 3600000 / 60000)}m
              </span>
            )
          }
        </p>
      }

    </li>
  )
}
