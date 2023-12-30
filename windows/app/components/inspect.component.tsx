'use client'
import React from 'react'
import Add from './inspectcomponents/add.component'
import Edit from './inspectcomponents/edit.component'
import View from './inspectcomponents/view.component'

export default function Inspect({ u, fu, viewTaskId, setViewTaskId }) {

  const [viewTask, setViewTask] = React.useState({})

  const [isEdit, setIsEdit] = React.useState(false)

  React.useEffect(() => {
    const fetchViewTask = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/tasks/' + viewTaskId)
      const view = await response.json()
      if(view['completion']) setIsEdit(false)
      if(view['has_deadline']) view['deadline'] = new Date(view['deadline'])
      setViewTask(view)
    }

    fetchViewTask()
  }, [u, viewTaskId])

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
