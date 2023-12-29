'use client'
import Image from 'next/image'
import React from 'react'

import FocusedTask from './components/focusedtask.component'
import Filter from './components/filter.component'
import Sort from './components/sort.component'
import TaskList from './components/tasklist.component'
import Inspect from './components/inspect.component'
import icon from '@/public/lens.svg'

export default function Home() {

  const [u, fu] = React.useState({})

  const [viewTaskId, setViewTaskId] = React.useState('')

  const [completionFilter, setCompletionFilter] = React.useState(0)
  const [priorityFilter, setPriorityFilter] = React.useState(4)
  const [tagsFilter, setTagsFilter] = React.useState([])

  const [groupMethod, setGroupMethod] = React.useState('none')

  React.useEffect(() => {
    Notification.requestPermission()
  }, [])

  return (
    <div className="bg-neutral-200 text-neutral-800">
      <FocusedTask u={u} fu={fu} />

      <div className="h-screen w-screen flex flex-col">
        <div className="relative h-1/5 w-full flex justify-center items-center">
          <Image src={icon} width={80} height={80} alt="lens" className="cursor-pointer" draggable="false" onClick={() => window.location.reload(true)} />
          <p className="text-xs text-neutral-400 absolute top-0 right-0 m-2">Built and maintained by <a href="https://car1zhang.com" className="underline hover:text-neutral-500">Carl Zhang</a>.</p>
        </div>

        <div className="flex h-4/5 w-full">
          <div className="w-1/4 flex-col h-full">
            <div className="relative border-t-2 border-neutral-800 h-1/2 w-full flex flex-col">
              <h1 className="text-2xl font-bold bg-neutral-200 self-center absolute -top-5 px-3">organize</h1>
              <Sort groupMethod={groupMethod} setGroupMethod={setGroupMethod} />
            </div>

            <div className="relative border-t-2 border-neutral-800 h-1/2 w-full flex flex-col">
              <h1 className="text-2xl font-bold bg-neutral-200 self-center absolute -top-5 px-3">filter</h1>
              <Filter completionFilter={completionFilter} priorityFilter={priorityFilter} tagsFilter={tagsFilter} setCompletionFilter={setCompletionFilter} setPriorityFilter={setPriorityFilter} setTagsFilter={setTagsFilter} />
            </div>
          </div>

          <div className="relative border-2 border-b-0 border-neutral-800 h-full w-2/4 flex flex-col">
            <h1 className="text-2xl font-bold bg-neutral-200 self-center absolute -top-5 px-3">lens.</h1>
            <TaskList u={u} fu={fu} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} completionFilter={completionFilter} priorityFilter={priorityFilter} tagsFilter={tagsFilter} groupMethod={groupMethod} />
          </div>

          <div className="relative border-t-2 border-neutral-800 h-full w-1/4 flex flex-col">
            <h1 className="text-2xl font-bold bg-neutral-200 self-center absolute -top-5 px-3">inspect</h1>
            <Inspect u={u} fu={fu} viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} />
          </div>
        </div>
      </div>
    </div>
  )
}
