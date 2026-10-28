import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (trimmed === '') return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="new-task-input" className="visually-hidden">New task</label>
      <input
        type="text"
        id="new-task-input"
        className="task-form-input"
        placeholder="Add a task"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit" className="task-form-button">Add task</button>
    </form>
  )
}

export default TaskForm