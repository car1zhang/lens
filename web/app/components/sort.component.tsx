'use client'
import React from 'react'

export default function Sort({ groupMethod, setGroupMethod }) {

  const reset = () => {
    setGroupMethod('none')
  }

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col justify-between">
      <div className="flex flex-col">
        <h1 className="py-2 px-4 font-bold text-right border-b border-neutral-400 bg-neutral-800 text-neutral-200">grouping</h1>
        <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer hover:bg-neutral-300 " + (groupMethod == 'none' ? "bg-neutral-700 hover:bg-neutral-600 text-neutral-200" : "hover:bg-neutral-300")} onClick={() => setGroupMethod('none')}>none</p>
        <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer hover:bg-neutral-300 " + (groupMethod == 'tags' ? "bg-neutral-700 hover:bg-neutral-600 text-neutral-200" : "hover:bg-neutral-300")} onClick={() => setGroupMethod('tags')}>tags</p>
        <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer hover:bg-neutral-300 " + (groupMethod == 'priority' ? "bg-neutral-700 hover:bg-neutral-600 text-neutral-200" : "hover:bg-neutral-300")} onClick={() => setGroupMethod('priority')}>priority</p>
      </div>
      <button className="m-4 mb-8 py-1 border-2 border-neutral-800 font-bold hover:text-neutral-200 hover:bg-neutral-800" onClick={reset}>reset</button>
    </div>
  )
}
