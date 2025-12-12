import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import type { TaskFormInputs } from "../types/task-form.types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateTaskMutation } from '../api/tasks.api';
import { Bounce, toast } from 'react-toastify';


const schema = yup.object({
    title: yup
        .string()
        .required("Title is required")
        .max(100, "Title must be less than 100 characters"),
    description: yup
        .string()
        .required("Description is required")
        .max(255, "Description must be less than 255 characters")
});

const TaskForm: React.FC = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TaskFormInputs>({
        resolver: yupResolver(schema),
    });

    const [createTask, { isLoading, error: apiError }] = useCreateTaskMutation();

    const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
        try {
            await createTask(data).unwrap();
            reset();
        } catch (err) {
            // Error handling is done in useEffect
            console.error("Failed to create task:", err);
        }
    };

    useEffect(() => {
        if (apiError) {
            toast.error("Error adding Task", {
                position: "bottom-left",
                autoClose: 5000,
                theme: "colored",
                transition: Bounce,
            });
        }
    }, [apiError]);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* Title */}
            <div className="w-full">
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50
                     placeholder:italic placeholder:font-light"
                    type="text"
                    placeholder="Task title"
                    {...register("title")}
                />
                <p className='text-red-600 text-sm mt-1 italic'>{errors.title?.message}</p>
                {/* <ErrorMessage message={errors.title?.message} /> */}
            </div>

            {/* Description */}
            <div className="mt-4 w-full">
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500 -mb-2 bg-gray-50
                     placeholder:italic placeholder:font-light"
                    placeholder="Task description"
                    {...register("description")}
                />
                <p className='text-red-600 text-sm mt-1 italic'>{errors.description?.message}</p>
                {/* <ErrorMessage message={errors.description?.message} /> */}
            </div>


            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="mt-4 px-4 py-1 font-light italic bg-blue-500 text-white rounded-md
                   hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isLoading ? "Adding..." : "Add Task"}
            </button>
        </form>
    );
};

export default TaskForm;
