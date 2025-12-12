import { api } from "../../../app/api";
import type { TaskFormInputs } from "../types/task-form.types";

import type { Task, ApiErrorResponse, ApiSuccessResponse } from "../types/task.types";

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({


        fetchRecentTasks: builder.query<Task[], void>({
            query: () => '/tasks/recent',
            transformResponse: (response: ApiSuccessResponse) => response.data.tasks,
            transformErrorResponse: (response) => (response.data as ApiErrorResponse),
            providesTags: ['Tasks'],
        }),


        createTask: builder.mutation<Task, TaskFormInputs>({
            query: (body) => ({
                url: '/tasks',
                method: 'POST',
                body,
            }),
            transformResponse: (response: ApiSuccessResponse) => response.data.task[0],
            transformErrorResponse: (response) => (response.data as ApiErrorResponse),
            invalidatesTags: ['Tasks'],
        }),

        markDone: builder.mutation<Task, { id: number }>({
            query: ({ id }) => ({
                url: `/tasks/${id}/complete`,
                method: 'PATCH',
                body: { completed: true },
            }),
            transformResponse: (response: ApiSuccessResponse) => response.data.task[0],
            transformErrorResponse: (response) => (response.data as ApiErrorResponse),
            invalidatesTags: ['Tasks'],
        }),

    })
});

export const {
    useFetchRecentTasksQuery,
    useCreateTaskMutation,
    useMarkDoneMutation,
} = tasksApi;
