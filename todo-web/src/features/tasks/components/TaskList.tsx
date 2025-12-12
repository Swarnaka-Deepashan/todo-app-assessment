import React from 'react'
import TaskCard from './TaskCard'
import { useFetchRecentTasksQuery } from '../api/tasks.api';
import TaskCardSkeleton from './TaskCardSkeleton';

const TaskList: React.FC = () => {

    const { data: tasks, isLoading, isError } = useFetchRecentTasksQuery();

    console.log("Fetched tasks:", tasks);


    if (isLoading) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <TaskCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (isError) {
        return <p className="text-gray-500">Error fetching tasks.</p>;
    }

    if (!tasks?.length) {
        return <p className="text-gray-500">No recent tasks.</p>;
    }


    return (
        <div className="space-y-3">

            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                />
            ))}

        </div>
    );
}

export default TaskList