'use client'
import Image from 'next/image'
import React from 'react'
import FocusedTask from './components/focusedtask.component'

import TaskList from './components/tasklist.component'
import View from './components/view.component'

export default function Home() {

  const [viewTaskId, setViewTaskId] = React.useState('')

  return (
    <div className="bg-neutral-200 text-neutral-800">
      <FocusedTask />
      <div className="h-screen w-screen flex flex-col">
        <div className="h-1/5 w-full flex justify-center items-center">
          <Image src="/lens.svg" width={80} height={80} alt="lens" className="cursor-pointer" onClick={() => window.location.reload(true)} />
        </div>
        <div className="h-4/5 flex h-full w-full">
          <div className="relative grow border-t-2 border-neutral-800 h-full w-1/4 flex flex-col">
            <h1 className="text-2xl font-bold bg-neutral-200 self-center absolute -top-5 px-3">organize</h1>

          </div>
          <div className="relative grow border-2 border-b-0 border-neutral-800 h-full w-2/4 flex flex-col">
            <h1 className="text-2xl font-bold bg-neutral-200 self-center absolute -top-5 px-3">lens.</h1>
            <TaskList viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} />
          </div>
          <div className="relative grow border-t-2 border-neutral-800 h-full w-1/4 flex flex-col">
            <h1 className="text-2xl font-bold bg-neutral-200 self-center absolute -top-5 px-3">view</h1>
            <View viewTaskId={viewTaskId} setViewTaskId={setViewTaskId} />
          </div>
        </div>
      </div>
    </div>
  )
}
