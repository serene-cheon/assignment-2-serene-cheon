import checkIcon from '../assets/check_icon.png'

function TaskCounter({ total, completed }) {
  return (
    <div className="task-counter" aria-label="Tasks completed">
      <img src={checkIcon} alt="" className="header-icon" />
      <span className="task-counter-text">{total}/{completed}</span>
    </div>
  )
}

export default TaskCounter