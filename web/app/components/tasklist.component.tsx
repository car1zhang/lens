'use client'
import React from 'react'

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
        {taskList.map(task => (
          <li className={
            "border-b border-neutral-400 px-6 py-2 flex justify-between " + (viewTaskId == task['_id'] ? "bg-neutral-800 text-neutral-200" : "")
            } key={task['_id']}>
            <div className="flex gap-2 ">

              <button className={
                "border-2 px-2 text-xs " + (task['completion'] ? "border-neutral-400 text-neutral-400 hover:bg-neutral-400 hover:text-neutral-200" : viewTaskId == task['_id'] ? "border-neutral-200 text-neutral-200 hover:bg-neutral-200 hover:text-neutral-800" : "border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-neutral-200")
                } onClick={() => finish(task['_id'])}>✓</button>

              <h1 className={
                "cursor-pointer " + (viewTaskId == task['_id'] ? "font-bold " : "") + (task['completion'] ? "line-through text-neutral-400 ": "")
                } onClick={() => {
                  setViewTaskId(viewTaskId == task['_id'] ? '' : task['_id'])
                }}>
                {task['name']}
              </h1>
            </div>
            
            {task['completion'] ? '' : 
              (new Date(task['deadline']) < Date.now() ? <p className="text-red-500">overdue</p> :
              <p className="text-neutral-400">
                {Math.floor((new Date(task['deadline']) - Date.now()) / 3600000)}h
                {Math.floor((new Date(task['deadline']) - Date.now()) % 3600000 / 60000)}m
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
