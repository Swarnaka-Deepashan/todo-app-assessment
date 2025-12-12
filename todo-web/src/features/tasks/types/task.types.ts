export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    errorCode: string;
    details: null | Record<string, unknown>;
    timestamp: string;
    path: string;
}

export interface ApiSuccessResponse {
    success: true;
    message: string;
    data: { [key: string]: Task[] };
}