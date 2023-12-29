'use client'
import React from 'react'
import Task from './tasklistcomponents/task.component'

export default function TaskList({ viewTaskId, setViewTaskId }) {

  const [taskList, setTaskList] = React.useState([])

  React.useEffect(() => {
    const fetchTaskList = async () => {
      const response = await fetch('http://localhost:8000/tasks/', {cache: 'no-store'})
      const tasks = await response.json()
      setTaskList(tasks)
    }
    
    fetchTaskList()
  })

  const finish = async (_id) => {
    await fetch('http://localhost:8000/tasks/toggle/' + _id, {method: 'PUT'})
  }

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col">
      <ul>
        <li className="px-6 py-2 flex justify-center border-b border-neutral-400 bg-neutral-800 text-neutral-800">
          X
        </li>

        {taskList.map(task => (
          <Task key={task['_id']} task={task} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} />
        ))}

        <li className={
          "px-6 py-2 flex justify-center cursor-pointer " + (viewTaskId == '' ? "bg-neutral-800 text-neutral-200 hover:bg-neutral-700 font-bold" : "hover:bg-neutral-300")
          } onClick={() => setViewTaskId('')}>
        +
        </li>
      </ul>
    </div>
  )
}
