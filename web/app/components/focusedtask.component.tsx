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
        if(focused['deadline'] != null) focused['deadline'] = new Date(focused['deadline']) // TODO convert all dates in fetch function
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

  const priorityColors = ['text-red-400', 'text-amber-500', 'text-green-500', 'text-blue-400', 'text-neutral-400']

  return ( // TODO tags
    Object.keys(focusedTask).length == 0 ? '' :
    <div className="text-neutral-200 z-50 fixed w-screen h-screen flex justify-center items-center">
      <div className="lg:w-1/3 w-4/5 flex flex-col bg-neutral-800 border-2 border-neutral-800 relative">
        <div className="flex flex-col p-6 items-center gap-4">
          <h1 className="w-full text-center text-6xl leading-tight px-4">{focusedTask['name']}</h1>
          {focusedTask['tags'] == null || focusedTask['tags'].length == 0 ? '' :
            <ul className="text-xl text-neutral-400 flex">
              {focusedTask['tags'].map((tag, idx) => (
                <li key={idx}>
                  {(idx == 0 ? '' : ', ') + tag}
                </li>
              ))}
            </ul>
          }
        </div>

        <div className="bg-neutral-200 p-6 flex flex-col gap-6">
          <p className="text-xl text-neutral-800 self-center">
            <span className={priorityColors[focusedTask['priority']]}>
              p{focusedTask['priority']}
            </span>
            
            {' · '}

            {focusedTask['deadline'] == null ? 'just do it'
            :
            focusedTask['deadline'] < Date.now() ? 'overdue'
            :
            Math.floor((focusedTask['deadline'] - Date.now()) / 3600000).toString() + ' hours and ' +
            Math.floor((focusedTask['deadline'] - Date.now()) % 3600000 / 60000).toString() + ' minutes remain'
            }
          </p>
          {focusedTask['notes'] == '' ? '' :
            <p className="text-xl text-neutral-800 whitespace-pre-wrap">{focusedTask['notes']}</p>
          }
          <button className="bg-neutral-200 border-2 border-neutral-800 text-neutral-800 p-3 text-xl hover:bg-neutral-800 hover:text-neutral-200 font-bold" onClick={() => {finish();unfocus();}}>finish</button>
        </div>
        <button className="absolute right-4 top-2 hover:text-neutral-400" onClick={unfocus}>X</button>
      </div>
      <div className="bg-neutral-200 opacity-90 w-full h-full absolute -z-50" />
    </div>
  )
}
