'use client'
import React from 'react'
import Task from './task.component'
import TaskSection from './tasksection.component'

export default function NoSort({ u, fu, viewTaskId, setViewTaskId, fetchUrl }) {

  return (
    <div className="flex flex-col">
      <TaskSection u={u} fu={fu} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} fetchUrl={fetchUrl} title="all tasks" titleModifier="" />
    </div>
  )
}
