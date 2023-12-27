'use client'
import Image from 'next/image'
import React from 'react'

export default function Home() {
  const [focusedTask, setFocusedTask] = React.useState({})

  React.useEffect(() => {
    const fetchFocused = async () => {
      const idResponse = await fetch('http://localhost:8000/tasks/focus/', {cache: 'no-store'})
      const focusedId = await idResponse.json()
      if(focusedId == '') {
        setFocused({})
        return
      }
      const response = await fetch('http://localhost:8000/tasks/' + focusedId, {cache: 'no-store'})
      const focused = await response.json()
      setFocusedTask(focused)
      console.log(new Date(focused['deadline']))
    }

    fetchFocused()
  }, [])

  return (
    <div>
      <h1>{focusedTask['name']}</h1>
      <p>{focusedTask['notes']}</p>
    </div>
  )
}
