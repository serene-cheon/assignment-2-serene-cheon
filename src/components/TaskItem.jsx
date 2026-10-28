function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        id={`task-${task.id}`}
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <label htmlFor={`task-${task.id}`} className="task-label">
        {task.text}
      </label>
      <button
        type="button"
        className="task-delete"
        aria-label={`Delete ${task.text}`}
        onClick={() => onDelete(task.id)}
      >
        ×
      </button>
    </li>
  )
}

export default TaskItem