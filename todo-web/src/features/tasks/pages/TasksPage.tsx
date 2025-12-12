import React from 'react';
import RecentTasksSection from '../components/RecentTasksSection';
import TaskFormSection from '../components/TaskFormSection';



const TasksPage: React.FC = () => {

    return (
        <div className="flex flex-col h-full ">
            {/* Header */}
            {/* <div className='flex justify-center border-2'>
                <p className='text-[28px] font-semibold'>ToDo Manager</p>
            </div> */}
            <div className='flex gap-6 mt-6 max-md:flex-col '>
                <div className="flex-1 ">
                    <TaskFormSection />
                </div>
                <div className="flex-1">
                    <RecentTasksSection />
                </div>
            </div>
        </div>
    );
};

export default TasksPage;