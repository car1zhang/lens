'use client'
import React from 'react'

export default function Sort({ groupMethod, setGroupMethod }) {
  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col">
      <h1 className="py-2 px-4 font-bold text-right border-b border-neutral-400 bg-neutral-800 text-neutral-200">grouping</h1>
      <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer hover:bg-neutral-300 " + (groupMethod == 'all' ? "bg-neutral-700 hover:bg-neutral-600 text-neutral-200" : "hover:bg-neutral-300")} onClick={() => setGroupMethod('all')}>all</p>
      <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer hover:bg-neutral-300 " + (groupMethod == 'tags' ? "bg-neutral-700 hover:bg-neutral-600 text-neutral-200" : "hover:bg-neutral-300")} onClick={() => setGroupMethod('tags')}>tags</p>
      <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer hover:bg-neutral-300 " + (groupMethod == 'priority' ? "bg-neutral-700 hover:bg-neutral-600 text-neutral-200" : "hover:bg-neutral-300")} onClick={() => setGroupMethod('priority')}>priority</p>
    </div>
  )
}
