'use client'
import React from 'react'

export default function View({ viewTaskId, setViewTaskId }) {

  const [viewTask, setViewTask] = React.useState({})

  const [isEdit, setIsEdit] = React.useState(false)

  const [name, setName] = React.useState('new task')
  const [deadline, setDeadline] = React.useState(new Date())
  const [notes, setNotes] = React.useState('')

  React.useEffect(() => {
    const fetchViewTask = async () => {
      if(viewTaskId != '') {
        const response = await fetch('http://localhost:8000/tasks/' + viewTaskId)
        const view = await response.json()
        setViewTask(view)
      } else {
        setIsEdit(false)
      }
    }

    fetchViewTask()
  })

  React.useEffect(() => {
    setViewTask({})
    setIsEdit(false)
    setName('new task')
    setDeadline(new Date())
    setNotes('')
  }, [viewTaskId])

  React.useEffect(() => {
    if(isEdit) {
      setName(viewTask['name'])
      setDeadline(new Date(viewTask['deadline']))
      setNotes(viewTask['notes'])
    } else {
      setViewTask({})
      setName('new task')
      setDeadline(new Date())
      setNotes('')
    }
  }, [isEdit])

  const postTask = async() => {
    await fetch('http://localhost:8000/tasks/', {method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: self.crypto.randomUUID(),
        name: (name == '' ? 'new task' : name),
        completion: false,
        deadline: (new Date(deadline - (new Date()).getTimezoneOffset() * 60000)).toISOString().split('.')[0]+'Z',
        notes: notes,
        tags: [],
        priority: 0,
        parents: [],
        children: [],
        pre: '',
        post: '',
      })
    })
  }
  const editTask = async() => {
    await fetch('http://localhost:8000/tasks/' + viewTaskId, {method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deadline: (new Date(deadline - (new Date()).getTimezoneOffset() * 60000)).toISOString().split('.')[0]+'Z',
        name: (name == '' ? 'new task' : name),
        notes: notes
      })
    })
    setIsEdit(false)
  }

  const focus = async () => {
    await fetch('http://localhost:8000/tasks/focus/' + viewTaskId, {method: 'PUT'})
  }
  const del = async () => {
    setViewTaskId('')
    await fetch('http://localhost:8000/tasks/' + viewTaskId, {method: 'DELETE'})
  }

  return (viewTaskId == '' ? // add
    <div className="w-full h-full overflow-y-scroll flex flex-col gap-2">
      <h1 className="m-4 mb-0">_id: </h1>
      
      <input className="text-2xl font-bold px-4" placeholder="new task" onChange={e => setName(e.target.value)} />
      <input className="text-neutral-400 px-4" type="datetime-local" onChange={e => setDeadline(new Date(e.target.value))} />
      <textarea className="resize-none px-4" placeholder="do so and so" rows={3} onChange={e => setNotes(e.target.value)} />

      <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold mt-2 mx-4" onClick={postTask}>post</button>
    </div>
    :
    isEdit ? // edit
    <div className="w-full h-full overflow-y-scroll flex flex-col gap-2">
      <h1 className="m-4 mb-0">_id: {viewTaskId}</h1>

      <input className="text-2xl font-bold px-4" defaultValue={viewTask['name']} placeholder="new task" onChange={e => setName(e.target.value)} />
      <input className="text-neutral-400 px-4" defaultValue={viewTask['deadline']} type="datetime-local" onChange={e => setDeadline(new Date(e.target.value))} />
      <textarea className="resize-none px-4" defaultValue={viewTask['notes']} placeholder="do so and so" rows={3} onChange={e => setNotes(e.target.value)} />

      <div className="flex gap-4 mt-2 mx-4">
        <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-1/2" onClick={editTask}>save</button>
        <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-1/2" onClick={() => setIsEdit(false)}>cancel</button>
      </div>
    </div>
    : // view
    <div className="w-full h-full overflow-y-scroll flex flex-col p-4 gap-2">
      <h1 className="">_id: {viewTaskId}</h1>
      
      <h1 className="text-2xl font-bold">{viewTask['name']}</h1>
      <p className="text-neutral-400">{(new Date(viewTask['deadline'])).toString()}</p>
      <p>{viewTask['notes']}</p>
      
      {viewTask['completion'] ? 
        <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold mt-2" onClick={del}>delete</button> :
        <div className="flex gap-4 mt-2">
          <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-2/4" onClick={focus}>focus</button>
          <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-1/4" onClick={() => setIsEdit(true)}>edit</button>
          <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-1/4" onClick={del}>delete</button>
        </div>
      }
    </div>
  )
}
