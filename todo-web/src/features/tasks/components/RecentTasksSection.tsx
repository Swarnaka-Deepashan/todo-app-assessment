import React from 'react'
import SectionHeader from './SectionHeader'
import TaskList from './TaskList'

const RecentTasksSection: React.FC = () => {
  return (
    <div className='bg-green-50 border border-green-200 p-5 rounded-lg'>
      <SectionHeader text={"Recent Tasks"} />
      <div className='mt-4'>
        <TaskList />
      </div>
    </div>
  )
}

export default RecentTasksSection