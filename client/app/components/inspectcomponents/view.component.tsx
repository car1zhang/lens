'use client'
import React from 'react'
import { priorityColors } from '@/app/prioritycolors'

export default function View({ u, fu, viewTask, setViewTaskId, setIsEdit }) {

  const [confirmDel, setConfirmDel] = React.useState(false)

  const del = async () => {
    setViewTaskId('')
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/tasks/' + viewTask['_id'], {method: 'DELETE'})

    fu({})
  }
  const focus = async () => {
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/tasks/focus/' + viewTask['_id'], {method: 'PUT'})

    fu({})
  }
  
  return (
    <div className="w-full h-full flex flex-col justify-between">
      
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold p-4 border-b border-neutral-400 hover:bg-neutral-300">{viewTask['name']}</h1>
        <ul className="flex py-2 px-4 border-b border-neutral-400 hover:bg-neutral-300">
          {viewTask['tags'] == null ? '' :
            viewTask['tags'].length == 0 ? 'untagged' : 
            viewTask['tags'].map((tag, idx) => (
              <li key={idx}>
                {(idx == 0 ? '' : ', ') + tag}
              </li>
            ))
          }
        </ul>
        <p className={"py-2 px-4 border-b border-neutral-400 hover:bg-neutral-300 " + priorityColors[viewTask['priority']]}>priority {viewTask['priority']}</p>
        <p className="text-neutral-400 py-2 px-4 border-b border-neutral-400 hover:bg-neutral-300">
          {!viewTask['has_deadline'] ? 'no deadline' : viewTask['deadline'].toString()}
        </p>
        {viewTask['notes'] == '' ? '' : 
          <p className="whitespace-pre-wrap py-2 px-4 border-b border-neutral-400 hover:bg-neutral-300">{viewTask['notes']}</p>
        }
        
        {viewTask['completion'] ? 
          (
          confirmDel ? 
          <div className="flex flex-col my-4 mx-4">
            <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold" onClick={() => setConfirmDel(false)}>cancel</button>
            <button className="border-2 border-t-0 border-neutral-800 p-1 hover:text-red-400 hover:bg-neutral-800 font-bold" onClick={del}>confirm</button>
          </div>
          :
          <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold my-4 mx-4" onClick={() => setConfirmDel(true)}>delete</button>
          )
          :
          <div className="flex gap-4 my-4 mx-4">
            <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-2/4 self-start" onClick={focus}>focus</button>
            <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-1/4 self-start" onClick={() => setIsEdit(true)}>edit</button>
            {confirmDel ? 
              <div className="flex flex-col w-1/4">
                <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold" onClick={() => setConfirmDel(false)}>cancel</button>
                <button className="border-2 border-t-0 border-neutral-800 p-1 hover:text-red-400 hover:bg-neutral-800 font-bold" onClick={del}>confirm</button>
              </div>
              :
              <button className="border-2 border-neutral-800 p-1 hover:text-neutral-200 hover:bg-neutral-800 font-bold w-1/4" onClick={() => setConfirmDel(true)}>delete</button>
            }
          </div>
        }
      </div>

      <h1 className="py-2 px-4 border-t border-neutral-400 hover:bg-neutral-300">_id: {viewTask['_id']}</h1>
    </div>
  )
}

