'use client'
import React from 'react'
import Task from './task.component'
import TaskSection from './tasksection.component'

export default function TagSort({ u, fu, viewTaskId, setViewTaskId, tagsFilter, fetchUrl }) {

  const [tagList, setTagList] = React.useState(tagsFilter)

  React.useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('http://localhost:8000/tags/', {cache: 'no-store'})
      const tags = await response.json()
      setTagList(tags)
    }

    if(tagsFilter.length == 0) {
      fetchTags()
    } else {
      setTagList(tagsFilter)
    }
  }, [u, tagsFilter])

  return (
    <ul className="flex flex-col">
      {tagList.map((tag, idx) => (
        <TaskSection u={u} fu={fu} key={idx} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} fetchUrl={fetchUrl.split('&tf=')[0] + '&tf=' + tag} title={tag} titleModifier="" />
      ))}
    </ul>
  )
}
