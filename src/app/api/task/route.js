import {NextResponse} from 'next/server';
import {createTaskApiClient} from '@/lib/task-sync-client';

export async function POST(request) {
    const requestBody = await request.json()
    const taskApiClient = createTaskApiClient()
/*
        console.log('This is request Body',requestBody)
*/
        try{
            const response = await taskApiClient.post('/insertTask', {
                task: requestBody.task.taskName,
                description: requestBody.task.description,
                user_id: requestBody.user_id
            })
            if (!response){
                console.log("The task can't be send to the api")
            }
            return NextResponse.json({success: true, message: 'Task Saved'})

        }
      catch (error){
            console.log("Internal sever error", error)
      }
    }
export async function GET(request){
    const taskApiClient = createTaskApiClient()
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
/*
    console.log('This is the userId from GET route',userId)
*/
    const response = await taskApiClient.get(`/getUserTask/${userId}`)
    
    console.log("This is what coming back", response.data)
    if (Array.isArray(response.data)) {
        const formattedTasks = response.data.map(task => ({
            id: task.id,
            taskName: task.task || '',
            description: task.description || '',
            dueDate: task.duedate || ''
        }));
        return NextResponse.json(formattedTasks);
    } else {
        return NextResponse.json([{
            taskName: response.data.task || '',
            description: response.data.description || '',
            dueDate: response.data.duedate || ''
        }]);
    }


}