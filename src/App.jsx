import { useState } from 'react'
import './App.css'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import TaskCounter from './components/TaskCounter'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

const sampleTasks = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: true },
  { id: 3, text: 'Return the textbook to Josie', completed: false },
  { id: 4, text: 'Buy the new album by Rake', completed: true },
  { id: 5, text: 'Buy a gift card for Dad', completed: false },
]

const filters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

function App() {
  const [tasks, setTasks] = useState(sampleTasks)
  const [filter, setFilter] = useState('all')

  function handleAdd(text) {
    const newTask = { id: Date.now(), text: text, completed: false }
    setTasks([...tasks, newTask])
  }

  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="app-header">
        <div className="header-left">
          <button type="button" className="menu-button" aria-label="Toggle menu">
            <img src={menuIcon} alt="" className="header-icon" />
          </button>

          <form className="quick-find" role="search">
            <label htmlFor="quick-find-input" className="visually-hidden">Quick find</label>
            <img src={searchIcon} alt="" className="quick-find-icon" />
            <input type="search" id="quick-find-input" className="quick-find-input" placeholder="Quick find" />
          </form>
        </div>

        <TaskCounter total={tasks.length} completed={completedCount} />
      </header>

      <div className="app-body">
        {/* ========== LEFT NAVIGATION ========== */}
        <nav className="sidebar" aria-label="Task categories">
          <ul className="sidebar-list">
            <li className="sidebar-item sidebar-item--active">
              <a href="#" className="sidebar-link" aria-current="page">
                <img src={inboxIcon} alt="" className="sidebar-icon" />
                <span className="sidebar-label">Inbox</span>
                <span className="sidebar-count">{tasks.length}</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <img src={calendarIcon} alt="" className="sidebar-icon" />
                <span className="sidebar-label">Today</span>
                <span className="sidebar-count">5</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <img src={upcomingIcon} alt="" className="sidebar-icon" />
                <span className="sidebar-label">Upcoming</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* ========== MAIN CONTENT ========== */}
        <main className="main-content">
          <section className="task-section" aria-labelledby="task-section-title">
            <h1 id="task-section-title" className="task-section-title">Inbox</h1>

            <div className="task-filters" role="group" aria-label="Filter tasks">
              {filters.map((item, index) => (
                <span key={item.value}>
                  {index > 0 && <span className="task-filter-separator">|</span>}
                  <button
                    type="button"
                    className={
                      filter === item.value
                        ? 'task-filter-button task-filter-button--active'
                        : 'task-filter-button'
                    }
                    aria-pressed={filter === item.value}
                    onClick={() => setFilter(item.value)}
                  >
                    {item.label}
                  </button>
                </span>
              ))}
            </div>

            <TaskList tasks={visibleTasks} onToggle={handleToggle} onDelete={handleDelete} />
            <TaskForm onAdd={handleAdd} />
          </section>
        </main>
      </div>
    </>
  )
}

export default App