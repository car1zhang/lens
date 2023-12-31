'use client'
import React from 'react'
import Task from './task.component'
import { FaAngleDown, FaAngleLeft } from 'react-icons/fa6'

export default function TaskSection({ u, fu, viewTaskId, setViewTaskId, fetchUrl, title, titleModifier }) {

  const [unrolled, setUnrolled] = React.useState(true)
  const [taskList, setTaskList] = React.useState([])

  React.useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(fetchUrl, {cache: 'no-store'})
      const tasks = await response.json()
      for(const i in tasks) {
        if(tasks[i]['has_deadline']) tasks[i]['deadline'] = new Date(tasks[i]['deadline'])
      }
      setTaskList(tasks)
    }

    if(fetchUrl != '') fetchTasks()
  }, [u, fetchUrl])

  return (
    <li className="flex flex-col">
      <div className="flex justify-between items-center cursor-pointer px-6 py-2 border-b border-neutral-400 bg-neutral-800 text-neutral-200 hover:bg-neutral-700" onClick={() => setUnrolled(!unrolled)}>
        <h1 className={"font-bold " + titleModifier}>
          {title}
        </h1>
        {unrolled ?
        <FaAngleDown />
        :
        <FaAngleLeft />
        }
      </div>

      {!unrolled ? '' :
      <ul className="flex flex-col">
        {taskList.map((task, idx) => (
          <Task key={idx} u={u} fu={fu} task={task} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} />
        ))}
      </ul>
      }
    </li>
  )
}
