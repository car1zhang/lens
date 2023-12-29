'use client'
import React from 'react'

export default function Add() {

  const [name, setName] = React.useState('new task')
  const [tags, setTags] = React.useState('')
  const [priority, setPriority] = React.useState(4)
  const [deadline, setDeadline] = React.useState(null)
  const [notes, setNotes] = React.useState('')

  const postTask = async() => {

    let dlstr
    if(deadline != null && deadline.valueOf() != 0 && !isNaN(deadline)) {
      const offsetdl = new Date(deadline - (new Date()).getTimezoneOffset() * 60000)
      dlstr = offsetdl.toISOString().split('.')[0]+'Z'
    } else {
      dlstr = null
    }

    await fetch('http://localhost:8000/tasks/', {method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: self.crypto.randomUUID(),
        name: (name == '' ? 'new task' : name),
        completion: false,
        deadline: dlstr,
        notes: notes,
        tags: tags.split(' '),
        priority: priority,
        parents: [],
        children: [],
        pre: '',
        post: '',
      })
    })
  }

  const priorityColors = ['text-red-400', 'text-amber-500', 'text-green-500', 'text-blue-400', 'text-neutral-400']

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col">
      <h1 className="pt-4 py-2 px-4 border-b border-neutral-400 hover:bg-neutral-300">_id: </h1>
      
      <input className="text-2xl font-bold py-2 px-4 border-b border-neutral-400 hover:bg-neutral-100" placeholder="new task" onChange={e => setName(e.target.value)} />
      <input className="text-neutral-400 py-2 px-4 border-b border-neutral-400 hover:bg-neutral-100" placeholder="tags" onChange={e => setTags(e.target.value)} />
      <select className={"py-2 px-4 border-b border-neutral-400 bg-white hover:bg-neutral-100 " + priorityColors[priority]} value={priority} onChange={e => setPriority(e.target.value)}>
        <option className={priorityColors[0]} value={0}>priority 0</option>
        <option className={priorityColors[1]} value={1}>priority 1</option>
        <option className={priorityColors[2]} value={2}>priority 2</option>
        <option className={priorityColors[3]} value={3}>priority 3</option>
        <option className={priorityColors[4]} value={4}>priority 4</option>
      </select>
      <input className="text-neutral-400 py-2 px-4 border-b border-neutral-400 hover:bg-neutral-100" type="datetime-local" onChange={e => setDeadline(new Date(e.target.value))} />
      <textarea className="resize-none py-2 px-4 border-b border-neutral-400 hover:bg-neutral-100" placeholder="do so and so" rows={3} onChange={e => setNotes(e.target.value)} />

      <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold mt-4 mx-4" onClick={postTask}>post</button>
    </div>
  )
}
