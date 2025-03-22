"use client"
import React from "react";
import {useState} from "react";
import { useUser } from '@clerk/nextjs';


export default function Page() {
    const [task, createTask] = useState(false);
    const { user } = useUser();

    const ToggleTask = () => {
        createTask(!task);
    }
    const checkApiHealth =  () => {
        try {
            const response =  fetch('/api/health', {
                method: 'GET',
            })
            console.log('Frontend response', response)
        } catch (error) {
            console.log('Error on the page', error)
        }
    }

    const saveTask =  () => {
        try {
            const response =  fetch('api/task', {
                method: 'POST',
                body:{
                    userId: user.id
                }
            })
            console.log("Save task response ",response)
            if(!response){
                throw new Error("Failed to save task")
            }
        }
        catch(error){
            console.log('Error saving task',error)
        }

    }

    return (
        <div className="p-4">
            <button onClick={ToggleTask}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Create Task
            </button>
            {task && <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-bold">Create Tasks</h2>
                <form onSubmit={saveTask} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskName">
                            Task Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="taskName"
                            type="text"
                            placeholder="Enter Task Name"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskDescription">
                            Task Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="taskDescription"
                            placeholder="Enter Task Description"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={saveTask} type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>

            </div>
            }
            <button onClick={saveTask}>Testing button</button>

        </div>);
}
