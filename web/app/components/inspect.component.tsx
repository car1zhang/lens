'use client'
import React from 'react'
import Add from './inspectcomponents/add.component.tsx'
import Edit from './inspectcomponents/edit.component.tsx'
import View from './inspectcomponents/view.component.tsx'

export default function Inspect({ viewTaskId, setViewTaskId }) {

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
  })
  React.useEffect(() => setIsEdit(false), [viewTaskId])

  return (viewTaskId == '' ?
    <Add />
    : isEdit ? 
    <Edit viewTask={viewTask} setViewTaskId={setViewTaskId} setIsEdit={setIsEdit} />
    :
    <View viewTask={viewTask} setViewTaskId={setViewTaskId} setIsEdit={setIsEdit} />
  )
}
