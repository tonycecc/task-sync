import {NextResponse} from 'next/server';
import {createTaskApiClient} from '@/lib/task-sync-client';

export async function POST(request) {
    const requestBody = await request.json()
    const taskApiClient = createTaskApiClient()
    /*
        console.log('This is request Body',requestBody)
    */
        try{
            const response = await taskApiClient.post('/insert', {
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
