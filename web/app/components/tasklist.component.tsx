'use client'
import React from 'react'
import NoSort from './tasklistcomponents/nosort.component'
import TagSort from './tasklistcomponents/tagsort.component'
import PrioritySort from './tasklistcomponents/prioritysort.component'

export default function TaskList({ viewTaskId, setViewTaskId, completionFilter, priorityFilter, tagsFilter, groupMethod }) {

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
      {groupMethod == 'tags' ? 
      <TagSort taskList={taskList} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} tagsFilter={tagsFilter} />
      : groupMethod == 'priority' ?
      <PrioritySort taskList={taskList} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} priorityFilter={priorityFilter} />
      :
      <NoSort taskList={taskList} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} />
      }

      <li className={
        "px-6 py-2 flex justify-center cursor-pointer text-neutral-400 font-bold " + (viewTaskId == '' ? "bg-neutral-800 hover:bg-neutral-700 " : "hover:bg-neutral-300")
        } onClick={() => setViewTaskId('')}>
      +
      </li>
    </div>
  )
}
