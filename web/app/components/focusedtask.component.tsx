'use client'
import React from 'react'

export default function FocusedTask() {
  const [focusedTask, setFocusedTask] = React.useState({})

  React.useEffect(() => {
    const fetchFocusedTask = async () => {
      const idResponse = await fetch('http://localhost:8000/tasks/focus/', {cache: 'no-store'})
      const focusedId = await idResponse.json()
      if(focusedId == '') {
        setFocusedTask({})
      } else {
        const response = await fetch('http://localhost:8000/tasks/' + focusedId, {cache: 'no-store'})
        const focused = await response.json()
        focused['creation'] = new Date(focused['creation'])
        focused['deadline'] = new Date(focused['deadline'])
        setFocusedTask(focused)
      }
    }

    fetchFocusedTask()
  })

  const finish = async () => {
    await fetch('http://localhost:8000/tasks/toggle/' + focusedTask['_id'], {method: 'PUT'})
  }
  const unfocus = async () => {
    await fetch('http://localhost:8000/tasks/focus/', {method: 'PUT'})
  }

  return (
    Object.keys(focusedTask).length == 0 ? '' :
    <div className="text-neutral-100 z-50 fixed w-screen h-screen flex justify-center items-center">
      <div className="lg:w-1/3 w-4/5 flex flex-col bg-neutral-800 border-2 border-neutral-800 relative">
        <div className="flex flex-col p-6 items-center gap-6">
          <h1 className="w-full text-center text-6xl leading-tight px-4">{focusedTask['name']}</h1>
          {focusedTask['deadline'] < Date.now() ? <p className="text-xl text-red-500">overdue</p>
          :
          <p className="text-xl text-neutral-100">
            {Math.floor((focusedTask['deadline'] - Date.now()) / 3600000)}
            {' hours and '}
            {Math.floor((focusedTask['deadline'] - Date.now()) % 3600000 / 60000)}
            {' minutes remain'}
          </p>
          }
        </div>
        <div className="bg-neutral-100 p-6 flex flex-col gap-6">
          <p className="text-xl text-neutral-800">{focusedTask['notes']}</p>
          <button className="bg-neutral-50 border-2 border-neutral-800 text-neutral-800 p-3 text-xl hover:bg-neutral-800 hover:text-neutral-100 font-bold" onClick={() => {finish();unfocus();}}>finish</button>
        </div>
        <button className="absolute right-4 top-2" onClick={unfocus}>X</button>
      </div>
      <div className="bg-neutral-200 opacity-90 w-full h-full absolute -z-50" />
    </div>
  )
}
