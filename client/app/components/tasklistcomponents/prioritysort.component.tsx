'use client'
import React from 'react'
import Task from './task.component'
import TaskSection from './tasksection.component'
import { priorityColors } from '@/app/prioritycolors'

export default function PrioritySort({ u, fu, viewTaskId, setViewTaskId, priorityFilter, fetchUrl }) {

  const [priorityList, setPriorityList] = React.useState([])

  React.useEffect(() => {
    setPriorityList(Array.from(Array(priorityFilter+1).keys()))
  }, [priorityFilter])

  return (
    <ul className="flex flex-col">
      {priorityList.map(priority => (
        <TaskSection u={u} fu={fu} key={priority} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} fetchUrl={fetchUrl + `&pf=${priority}&pfl=${priority}`} title={`p${priority}`} titleModifier={priorityColors[priority]} />
      ))}
    </ul>
  )
}
