import axios from 'axios'

if (!process.env.NEXT_PUBLIC_TASKSYNC_API) {
    throw new Error('NEXT_PUBLIC_TASKSYNC_API environment variable is not set');
}

export const taskApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TASKSYNC_API,
    headers: {
        'Content-Type': 'application/json',
    },
});