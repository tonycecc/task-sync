import { NextResponse } from 'next/server';
import { createTaskApiClient } from '@/lib/task-sync-client';

export async function GET(request) {
    try {
        const taskApiClient = createTaskApiClient();
        const response = await taskApiClient.get("/health");
        return NextResponse.json({ status: response.data.data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
