'use client'
import Image from 'next/image'
import React from 'react'
import FocusedTask from './components/focusedtask.component'

import Filter from './components/filter.component'
import Sort from './components/sort.component'
import TaskList from './components/tasklist.component'
import Inspect from './components/inspect.component'

export default function Home() {

  const [viewTaskId, setViewTaskId] = React.useState('')

  const [completionFilter, setCompletionFilter] = React.useState(0)
  const [priorityFilter, setPriorityFilter] = React.useState(4)
  const [tagsFilter, setTagsFilter] = React.useState([])

  return (
    <div className="bg-neutral-200 text-neutral-800">
      <FocusedTask />
      <div className="h-screen w-screen flex flex-col">
        <div className="h-1/5 w-full flex justify-center items-center">
          <Image src="/lens.svg" width={80} height={80} alt="lens" className="cursor-pointer" draggable="false" onClick={() => window.location.reload(true)} />
        </div>
        <div className="flex h-4/5 w-full">
          <div className="w-1/4 flex-col h-full">
            <div className="relative border-t-2 border-neutral-800 h-1/2 w-full flex flex-col">
              <h1 className="text-2xl font-bold bg-neutral-200 self-center absolute -top-5 px-3">sort</h1>
              <Sort />
            </div>
            <div className="relative border-t-2 border-neutral-800 h-1/2 w-full flex flex-col">
              <h1 className="text-2xl font-bold bg-neutral-200 self-center absolute -top-5 px-3">filter</h1>
              <Filter completionFilter={completionFilter} priorityFilter={priorityFilter} tagsFilter={tagsFilter} setCompletionFilter={setCompletionFilter} setPriorityFilter={setPriorityFilter} setTagsFilter={setTagsFilter} />
            </div>
          </div>
          <div className="relative border-2 border-b-0 border-neutral-800 h-full w-2/4 flex flex-col">
            <h1 className="text-2xl font-bold bg-neutral-200 self-center absolute -top-5 px-3">lens.</h1>
            <TaskList viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} completionFilter={completionFilter} priorityFilter={priorityFilter} tagsFilter={tagsFilter} />
          </div>
          <div className="relative border-t-2 border-neutral-800 h-full w-1/4 flex flex-col">
            <h1 className="text-2xl font-bold bg-neutral-200 self-center absolute -top-5 px-3">inspect</h1>
            <Inspect viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} />
          </div>
        </div>
      </div>
    </div>
  )
}
