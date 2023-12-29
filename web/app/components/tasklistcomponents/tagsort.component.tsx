'use client'
import React from 'react'
import Task from './task.component'

export default function TagSort({ taskList, viewTaskId, setViewTaskId, tagsFilter }) {

  const [tagList, setTagList] = React.useState(tagsFilter)

  React.useEffect(() => {
    let unsorted = tagsFilter
    if(unsorted.length == 0) {
      for(const i in taskList) {
        for(const j in taskList[i]['tags']) {
          if(!unsorted.includes(taskList[i]['tags'][j])) unsorted = unsorted.concat([taskList[i]['tags'][j]])
        }
      }
    }
    unsorted.sort()
    setTagList(unsorted)
  }, [tagsFilter, taskList])

  return (
    <ul className="flex flex-col">
      {tagList.map((tag, idx) => (
        <li key={idx} className="flex flex-col">
          <h1 className="px-6 py-2 border-b border-neutral-400 bg-neutral-800 text-neutral-200 font-bold">
            {tag}
          </h1>
          <ul className="flex flex-col">
            {taskList.map(task => (!task['tags'].includes(tag) ? '' :
              <Task key={task['_id']} task={task} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
