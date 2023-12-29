'use client'
import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { priorityColors } from '@/app/prioritycolors'

export default function Task({ u, fu, task, viewTaskId, setViewTaskId }) {

  const finish = async e => {
    e.stopPropagation()

    await fetch('http://localhost:8000/tasks/toggle/' + task['_id'], {method: 'PUT'})
    
    fu({})
  }

  return (
    <li className={
      "cursor-pointer border-b border-neutral-400 px-6 py-2 flex justify-between text-xs " + (viewTaskId == task['_id'] ? "bg-neutral-700 text-neutral-200 hover:bg-neutral-600" : "hover:bg-neutral-300")
    } onClick={() => {
      setViewTaskId(viewTaskId == task['_id'] ? '' : task['_id'])
    }}>

      <div className="flex gap-4">

        <button className={
          "border-2 text-xs " + (task['completion'] ? "border-neutral-400 text-neutral-400 hover:bg-neutral-400 hover:text-neutral-200" : viewTaskId == task['_id'] ? "border-neutral-200 text-neutral-200 hover:bg-neutral-200 hover:text-neutral-800" : "border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-neutral-200")
        } onClick={finish}>
          <FaCheck />
        </button>

        <h1 className={
          "w-64 overflow-clip " + (viewTaskId == task['_id'] ? "font-bold " : "") + (task['completion'] ? "line-through text-neutral-400 ": "")
        }>
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
