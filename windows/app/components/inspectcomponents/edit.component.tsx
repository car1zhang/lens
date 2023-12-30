'use client'
import React from 'react'
import { priorityColors } from '@/app/prioritycolors'

export default function Edit({ u, fu, viewTask, setViewTaskId, setIsEdit }) {

  const [name, setName] = React.useState(viewTask['name'])
  const [tags, setTags] = React.useState(viewTask['tags'].join(' '))
  const [priority, setPriority] = React.useState(viewTask['priority'])
  const [deadline, setDeadline] = React.useState(viewTask['has_deadline'] ? viewTask['deadline'] : null)
  const [notes, setNotes] = React.useState(viewTask['notes'])

  const editTask = async() => {

    let dlstr
    if(deadline != null && deadline.valueOf() != 0 && !isNaN(deadline.valueOf())) {
      const offsetdl = new Date(deadline.valueOf() - (new Date()).getTimezoneOffset() * 60000)
      dlstr = offsetdl.toISOString().split('.')[0]+'Z'
    } else {
      dlstr = null
    }

    await fetch(process.env.NEXT_PUBLIC_API_URL + '/tasks/' + viewTask['_id'], {method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: (name == '' ? 'new task' : name),
        tags: tags.split(' ').filter((t, i) => tags.split(' ').indexOf(t) == i).filter(t => t != ''),
        priority: priority,
        deadline: dlstr,
        notes: notes
      })
    })
    setIsEdit(false)

    fu({})
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">

      <div className="flex flex-col">
        <input className="text-2xl font-bold p-4 border-b border-neutral-400 hover:bg-neutral-100" defaultValue={name} placeholder="new task" onChange={e => setName(e.target.value)} />
        <input className="text-neutral-400 py-2 px-4 border-b border-neutral-400 hover:bg-neutral-100" defaultValue={tags} placeholder="tags" onChange={e => setTags(e.target.value)} />
        <select className={"py-2 px-4 border-b border-neutral-400 bg-white hover:bg-neutral-100 " + priorityColors[priority]} value={priority} onChange={e => setPriority(Number(e.target.value))}>
          <option className={priorityColors[0]} value={0}>priority 0</option>
          <option className={priorityColors[1]} value={1}>priority 1</option>
          <option className={priorityColors[2]} value={2}>priority 2</option>
          <option className={priorityColors[3]} value={3}>priority 3</option>
          <option className={priorityColors[4]} value={4}>priority 4</option>
        </select>
        <input className="text-neutral-400 py-2 px-4 border-b border-neutral-400 hover:bg-neutral-100" defaultValue={deadline == null || isNaN(deadline.valueOf()) ? null : deadline.toISOString().slice(0, -1)} type="datetime-local" onChange={e => setDeadline(new Date(e.target.value))} />
        <textarea className="resize-none py-2 px-4 border-b border-neutral-400 hover:bg-neutral-100" defaultValue={notes} placeholder="do so and so" rows={3} onChange={e => setNotes(e.target.value)} />

        <div className="flex gap-4 m-4">
          <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-1/2" onClick={editTask}>save</button>
          <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-1/2" onClick={() => setIsEdit(false)}>cancel</button>
        </div>
      </div>

      <h1 className="py-2 px-4 border-t border-neutral-400 hover:bg-neutral-300">_id: {viewTask['_id']}</h1>
    </div>
  )
}
