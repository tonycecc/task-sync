"use client"
import React from "react";
import {useState} from "react";


export default function Page() {
const [task, createTask] = useState(false);
const ToggleTask = () => { createTask(!task); }
    return (
        <div className="p-4">
        <button onClick={ToggleTask} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Create Task</button>
        {task && <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold">Create Task</h2>
            <form className="mt-4">
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
                    <button onClick={ToggleTask}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
        }
    </div>);
}
