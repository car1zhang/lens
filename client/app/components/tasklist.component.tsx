'use client'
import React from 'react'
import NoSort from './tasklistcomponents/nosort.component'
import TagSort from './tasklistcomponents/tagsort.component'
import PrioritySort from './tasklistcomponents/prioritysort.component'

export default function TaskList({ u, fu, viewTaskId, setViewTaskId, completionFilter, priorityFilter, tagsFilter, groupMethod }) {

  const [fetchUrl, setFetchUrl] = React.useState('')

  React.useEffect(() => {
    let tagsParam = ''
    for(const i in tagsFilter) tagsParam += '&tf=' + tagsFilter[i].replace(' ', '%20')
    setFetchUrl(process.env.NEXT_PUBLIC_API_URL + '/tasks/?' + 'cf=' + completionFilter + '&pf=' + priorityFilter + tagsParam)
  }, [u, completionFilter, priorityFilter, tagsFilter])

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col">
      {groupMethod == 'tags' ? 
      <TagSort u={u} fu={fu} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} tagsFilter={tagsFilter} fetchUrl={fetchUrl} />
      : groupMethod == 'priority' ?
      <PrioritySort u={u} fu={fu} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} priorityFilter={priorityFilter} fetchUrl={fetchUrl} />
      :
      <NoSort u={u} fu={fu} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} fetchUrl={fetchUrl} />
      }

      <li className={
        "px-6 py-2 flex justify-center cursor-pointer text-neutral-400 font-bold " + (viewTaskId == '' ? "bg-neutral-700 hover:bg-neutral-600 " : "hover:bg-neutral-300")
        } onClick={() => setViewTaskId('')}>
        +
      </li>
    </div>
  )
}
