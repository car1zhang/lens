'use client'
import React from 'react'
import Task from './task.component'

export default function PrioritySort({ taskList, viewTaskId, setViewTaskId, priorityFilter }) {

  const priorityColors = ['text-red-400', 'text-amber-500', 'text-green-500', 'text-blue-400', 'text-neutral-400']

  return (
    <ul className="flex flex-col">
      {[...Array(priorityFilter+1).keys()].map(priority => (
        <li key={priority} className="flex flex-col">
          <h1 className={"px-6 py-2 border-b border-neutral-400 bg-neutral-800 font-bold " + priorityColors[priority]}>
            p{priority}
          </h1>
          <ul className="flex flex-col">
            {taskList.map(task => (task['priority'] != priority ? '' :
              <Task key={task['_id']} task={task} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
