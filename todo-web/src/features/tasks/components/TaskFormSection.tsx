import React from 'react'
import SectionHeader from './SectionHeader'
import TaskForm from './TaskForm'

const TaskFormSection: React.FC = () => {
  return (
    <div className='bg-blue-50 border border-blue-200 p-5 rounded-lg'>
        <SectionHeader text={"Add Task"} />
      <div className="mt-4">
        <TaskForm />
      </div>
    </div>
  )
}

export default TaskFormSection