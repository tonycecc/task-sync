import { NextResponse } from 'next/server';
import {taskApiClient} from "@/lib/task-sync-client";

export async function GET(request){
    try{
        const response = await taskApiClient.get("/health")
        const { data } = response;

        return NextResponse.json({
            status: data.data
        },{status:200})
    }
    catch(error){
        console.log(error)
    }
}