'use client'
import React from 'react'

export default function Filter({ completionFilter, priorityFilter, tagsFilter, setCompletionFilter, setPriorityFilter, setTagsFilter }) {

  const [filterIncomplete, setFilterIncomplete] = React.useState(true)
  const [filterComplete, setFilterComplete] = React.useState(false)
  React.useEffect(() => {
    setCompletionFilter((filterIncomplete + 2*filterComplete + 2) % 3)
  }, [filterIncomplete, filterComplete])

  const resetCompletionPriority = () => {
    setFilterIncomplete(true)
    setFilterComplete(false)
    setPriorityFilter(4)
  }

  const [newTag, setNewTag] = React.useState('')
  const addNewTag = e => {
    e.preventDefault()
    if(!tagsFilter.includes(newTag) && newTag.length > 0) setTagsFilter(tagsFilter.concat([newTag]))
    setNewTag('')
  }
  const removeTag = (tag) => {
    setTagsFilter(tagsFilter.filter(t => t != tag))
  }
  const clearTags = () => {
    setTagsFilter([])
    setNewTag('')
  }

  const priorityColors = ['text-red-400', 'text-amber-500', 'text-green-500', 'text-blue-400', 'text-neutral-400']

  return (
    <div className="w-full h-full flex">

      <div className="flex flex-col w-1/2 border-r border-neutral-800 overflow-y-scroll">
        <h1 className="py-2 px-4 font-bold border-b border-neutral-400 bg-neutral-800 text-neutral-200">tags</h1>
        <form className="w-full" onSubmit={addNewTag}>
          <input className="w-full py-1 px-4 border-b border-neutral-400 text-xs hover:bg-neutral-100" placeholder="tag" value={newTag} onChange={e => setNewTag(e.target.value)} />
        </form>
        <ul className="flex flex-col grow overflow-y-scroll">
          {tagsFilter.map((tag, idx) => (
            <li key={idx} className="py-1 px-4 border-b border-neutral-400 text-xs cursor-pointer bg-neutral-700 hover:bg-neutral-600 text-neutral-200" onClick={() => removeTag(tag)}>
              {tag}
            </li>
          ))}
        </ul>
        <button className="border-2 border-neutral-800 font-bold py-1 m-4 hover:bg-neutral-800 hover:text-neutral-200" onClick={clearTags}>clear</button>
      </div>

      <div className="flex flex-col w-1/2 border-l border-neutral-800 justify-between overflow-y-scroll">
        <div className="flex flex-col">
          <h1 className="py-2 px-4 text-right font-bold border-b border-neutral-400 bg-neutral-800 text-neutral-200">completion</h1>
          <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer hover:bg-neutral-300 " + (filterIncomplete ? "bg-neutral-700 hover:bg-neutral-600 text-neutral-200" : "hover:bg-neutral-300")} onClick={() => setFilterIncomplete(!filterIncomplete)}>incomplete</p>
          <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer hover:bg-neutral-300 " + (filterComplete ? "bg-neutral-700 hover:bg-neutral-600 text-neutral-200" : "hover:bg-neutral-300")} onClick={() => setFilterComplete(!filterComplete)}>complete</p>

          <h1 className="py-2 px-4 text-right font-bold border-b border-neutral-400 bg-neutral-800 text-neutral-200">priority</h1>
          <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer " + priorityColors[0] + (0 <= priorityFilter ? " bg-neutral-700 hover:bg-neutral-600" : " hover:bg-neutral-300")} onClick={() => setPriorityFilter(0)} >p0</p>
          <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer " + priorityColors[1] + (1 <= priorityFilter ? " bg-neutral-700 hover:bg-neutral-600" : " hover:bg-neutral-300")} onClick={() => setPriorityFilter(1)} >p1</p>
          <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer " + priorityColors[2] + (2 <= priorityFilter ? " bg-neutral-700 hover:bg-neutral-600" : " hover:bg-neutral-300")} onClick={() => setPriorityFilter(2)} >p2</p>
          <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer " + priorityColors[3] + (3 <= priorityFilter ? " bg-neutral-700 hover:bg-neutral-600" : " hover:bg-neutral-300")} onClick={() => setPriorityFilter(3)} >p3</p>
          <p className={"py-1 px-4 text-right border-b border-neutral-400 text-xs cursor-pointer " + priorityColors[4] + (4 <= priorityFilter ? " bg-neutral-700 hover:bg-neutral-600" : " hover:bg-neutral-300")} onClick={() => setPriorityFilter(4)} >p4</p>
        </div>

        <button className="border-2 border-neutral-800 font-bold py-1 m-4 hover:bg-neutral-800 hover:text-neutral-200" onClick={resetCompletionPriority}>reset</button>
      </div>

    </div>
  )
}
