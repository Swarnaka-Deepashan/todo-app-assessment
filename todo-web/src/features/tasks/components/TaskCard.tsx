import React, { useEffect } from 'react';
import { useMarkDoneMutation } from '../api/tasks.api';
import { Bounce, toast } from 'react-toastify';

interface TaskCardProps {
    id: number;
    title: string;
    description: string;
}


const TaskCard: React.FC<TaskCardProps> = ({ id, title, description }) => {

    const [markDone, { isLoading, isError }] = useMarkDoneMutation()

    const onDone = async (id: number) => {
        await markDone({ id }).unwrap()
        console.log("Task marked as done");
    }

    useEffect(() => {
        if (isError) {
            toast.error(`Error marking ${title} Task as done`, {
                position: "bottom-right",
                autoClose: 5000,
                theme: "colored",
                transition: Bounce,
            });
        }
    }, [isError]);



    return (
        <div className="flex flex-col border border-gray-300 rounded-lg p-4 bg-gray-50">
            <p className="text-[16px] font-semibold">{title}</p>
            <div className='flex justify-between items-center mt-1'>
                <p className="text-[14px] font-light">{description}</p>
                <button disabled={isLoading} className="bg-green-500 text-white font-light italic rounded px-4 py-1 cursor-pointer hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed ml-4" onClick={() => onDone(id)}>Done</button>
                {/* <button className="bg-green-500 text-white font-light italic rounded px-4 py-1 cursor-pointer" onClick={() => onDone(id)}>{isLoading ? "Loading" : "Done"}</button> */}
            </div>
        </div>
    );
};

export default TaskCard;