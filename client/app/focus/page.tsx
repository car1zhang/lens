'use client'
import Image from 'next/image'
import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { emit, listen } from '@tauri-apps/api/event'

import { priorityColors } from '@/app/prioritycolors'
import Icon from '@/public/lens-nb.svg'

export default function Focus() {
  
  const loadingTask = {
    name: "loading...",
    deadline: null,
    has_deadline: false,
    tags: [""],
    notes: ""
  }

  const [focusedTask, setFocusedTask] = React.useState(loadingTask)

  React.useEffect(() => {
    const fetchFocusedTask = async () => {
      const idResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/tasks/focus/', {cache: 'no-store'})
      const focusedId = await idResponse.json()
      if(focusedId == '') {
        setFocusedTask(loadingTask)
      } else {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/tasks/' + focusedId, {cache: 'no-store'})
        const focused = await response.json()
        focused['creation'] = new Date(focused['creation'])
        if(focused['has_deadline']) focused['deadline'] = new Date(focused['deadline'])
        setFocusedTask(focused)
      }
    }
    
    fetchFocusedTask()

    const reloadListener = async () => { // todo unmount things ?
      await listen('reload', event => {
        window.location.reload()
      })
    }
    reloadListener()
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-neutral-800 overflow-hidden">
      <div data-tauri-drag-region className="w-screen h-10 bg-neutral-800 flex justify-center items-center">
        <Image data-tauri-drag-region src={Icon} height={22} alt="lens" draggable="false" />
      </div>
      <div className="grow flex flex-col w-full h-full justify-center items-center gap-1 border-2 border-neutral-800 bg-neutral-200">
        <h1 className="text-2xl">
          {focusedTask['name']}
        </h1>
        <div className="text-neutral-400 flex items-center gap-1">
          <ul className="flex">
            {focusedTask['tags'].map((tag, idx) => (
              <li key={idx}>
                {(idx == 0 ? '' : ', ') + tag}
              </li>
            ))}
          </ul>
          {focusedTask['tags'].length > 0 && focusedTask['has_deadline'] ? ' · ' : ''}
          {!focusedTask['has_deadline'] ? '' : 
            (focusedTask['deadline'] < new Date() ? <span className="text-red-400">overdue</span> :
              <span className="text-neutral-400">
                {Math.floor((focusedTask['deadline'].valueOf() - Date.now()) / 3600000)}h
                {Math.floor((focusedTask['deadline'].valueOf() - Date.now()) % 3600000 / 60000)}m
              </span>
            )
          }
        </div>
      </div>
    </div>
  )
}
