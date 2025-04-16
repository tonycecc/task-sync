import axios from 'axios';

export function createTaskApiClient() {
    const baseURL = process.env.NEXT_PUBLIC_TASKSYNC_API;
    if (!baseURL) {
        throw new Error('NEXT_PUBLIC_TASKSYNC_API environment variable is not set');
    }
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function createGroupsApiClient() {
    const baseURL = process.env.NEXT_PUBLIC_TASKSYNC_API; 
    if (!baseURL) {
        throw new Error('NEXT_PUBLIC_TASKSYNC_API environment variable is not set');
    }
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
