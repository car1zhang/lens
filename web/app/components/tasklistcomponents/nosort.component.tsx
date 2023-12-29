'use client'
import React from 'react'
import Task from './task.component'

export default function NoSort({ taskList, viewTaskId, setViewTaskId }) {

  return (
    <div className="flex flex-col">
      <ul>
        <li className="px-6 py-2 border-b border-neutral-400 bg-neutral-800 text-neutral-200 font-bold">tasks</li>

        {taskList.map(task => (
          <Task key={task['_id']} task={task} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} />
        ))}

      </ul>
    </div>
  )
}
