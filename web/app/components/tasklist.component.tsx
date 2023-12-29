'use client'
import React from 'react'
import Task from './tasklistcomponents/task.component'

export default function TaskList({ viewTaskId, setViewTaskId, completionFilter, priorityFilter, tagsFilter }) {

  const [taskList, setTaskList] = React.useState([])

  React.useEffect(() => {
    const fetchTaskList = async () => {
      let tagsParam = ''
      for(const i in tagsFilter) tagsParam += '&tf=' + tagsFilter[i].replace(' ', '%20')
      const response = await fetch('http://localhost:8000/tasks/?' + 'cf=' + completionFilter + '&pf=' + priorityFilter + tagsParam, {cache: 'no-store'})
      const tasks = await response.json()
      setTaskList(tasks)
    }
    
    fetchTaskList()
  })


  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col">
      <ul>
        <li className="px-6 py-2 flex justify-center border-b border-neutral-400 bg-neutral-800 text-neutral-800">X</li>

        { taskList == null ? '' :
        taskList.map(task => (
          <Task key={task['_id']} task={task} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} />
        ))}

        <li className={
          "px-6 py-2 flex justify-center cursor-pointer text-neutral-400 font-bold " + (viewTaskId == '' ? "bg-neutral-700 hover:bg-neutral-600 " : "hover:bg-neutral-300")
          } onClick={() => setViewTaskId('')}>
        +
        </li>
      </ul>
    </div>
  )
}
