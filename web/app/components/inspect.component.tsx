'use client'
import React from 'react'
import Add from './inspectcomponents/add.component.tsx'
import Edit from './inspectcomponents/edit.component.tsx'
import View from './inspectcomponents/view.component.tsx'

export default function Inspect({ u, fu, viewTaskId, setViewTaskId }) {

  const [viewTask, setViewTask] = React.useState({})

  const [isEdit, setIsEdit] = React.useState(false)

  React.useEffect(() => {
    const fetchViewTask = async () => {
      const response = await fetch('http://localhost:8000/tasks/' + viewTaskId)
      const view = await response.json()
      if(view['completion']) setIsEdit(false)
      setViewTask(view)
    }

    fetchViewTask()
  }, [u, viewTaskId])
  React.useEffect(() => setIsEdit(false), [u, viewTaskId])

  return (
    <div className="flex flex-col h-full overflow-y-scroll">
      <h1 className="py-2 px-4 font-bold border-b border-neutral-400 bg-neutral-800 text-neutral-200">task</h1>
      {viewTaskId == '' ?
      <Add u={u} fu={fu} />
      : isEdit ? 
      <Edit u={u} fu={fu} viewTask={viewTask} setViewTaskId={setViewTaskId} setIsEdit={setIsEdit} />
      :
      <View u={u} fu={fu} viewTask={viewTask} setViewTaskId={setViewTaskId} setIsEdit={setIsEdit} />
      }
    </div>
  )
}
