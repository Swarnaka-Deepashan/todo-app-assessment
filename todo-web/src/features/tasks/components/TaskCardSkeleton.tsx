import React from 'react';

const TaskCardSkeleton: React.FC = () => {
  return (
    <div data-testid="task-card-skeleton" className="flex flex-col border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse">
      
      {/* Title */}
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>

      {/* Description & Button Row */}
      <div className="flex justify-between items-center mt-3 gap-4">
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-8 w-16 bg-gray-300 rounded"></div>
      </div>

    </div>
  );
};

export default TaskCardSkeleton;
