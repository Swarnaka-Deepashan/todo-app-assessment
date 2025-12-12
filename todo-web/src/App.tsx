import { ToastContainer } from 'react-toastify'
import './App.css'
import TasksPage from './features/tasks/pages/TasksPage'
import AppHeader from './features/tasks/components/AppHeader'

function App() {

  return (
    <div>
      <AppHeader />
      <div className='px-10 pb-6 max-sm:px-6 max-w-5xl mx-auto'>
        <TasksPage />
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
