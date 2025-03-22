import {NextResponse} from 'next/server';
import {createTaskApiClient} from '@/lib/task-sync-client';

export async function POST(request) {
    const userId = await request.json()
    const taskApiClient = createTaskApiClient()
    console.log('This is userID',userId)
    const response = await taskApiClient.post('/testing',{
        userId: userId
    })
    console.log(response)
    return NextResponse.json({success:true, message:'Task Saved'})
}
