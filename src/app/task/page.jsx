"use client"
import React, {useEffect} from "react";
import { useState } from "react";
import { useUser } from '@clerk/nextjs';

export default function Page() {
    const [task, createTask] = useState({
        taskName: "",
        description: "",
        dueDate:""
    });
    const { user } = useUser();
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const showNotification = (message, type = 'success') => {
        setNotification({
            show: true,
            message,
            type
        });

        setTimeout(() => {
            setNotification(prev => ({
                ...prev,
                show: false
            }));
        }, 3000);
    };
    const showTask = async ()=>{
        try{
            const response = await fetch(`/api/task?userId=${user.id}`,{
                method: 'GET'
            })
            const data = await response.json();
            setTasks(data);

/*
                console.log(data)
*/
                }
        catch(error){

        }
    }
    const saveTask = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch('api/task', {
                method: 'POST',
                body: JSON.stringify({
                    "task": task,
                    "user_id": user?.id,
                })
            });
            console.log("Save task response ", response);

            if (response.ok) {
                const savedTask = { ...task, id: Date.now() };

                setTasks([...tasks, savedTask]);

                showNotification('Task saved successfully!');
            } else {
                showNotification('Failed to save task. Please try again.', 'error');
            }

            if (task.taskName) {
                createTask({
                    taskName: "",
                    description: "",
                    dueDate: "",
                });
            }
            setShowForm(false);
        } catch (error) {
            console.log('Error saving task', error);
            showNotification('Error saving task. Please try again.', 'error');
        }
    };
    useEffect(() => {
        const loadInitialTasks = async () => {
            if (user?.id) {
                await showTask();
            }
        };
        loadInitialTasks();
    }, [user]);

    useEffect(() => {
        if (!user?.id) return;
        const pollTasks = async () => {
            await showTask();
        };
        pollTasks();
        const interval = setInterval(pollTasks, 10000);
        return () => clearInterval(interval);
    }, [user]);
    const handleInput = (e) => {
        const { name, value } = e.target;
        createTask({ ...task, [name]: value });
    };
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    return (
        <div className="min-h-screen bg-[#F9E9EC] py-8 px-4 relative">
            {notification.show && (
                <div className={`fixed top-4 right-4 left-4 md:left-auto md:right-4 md:w-96 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0 ${
                    notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' :
                        'bg-red-100 border-l-4 border-red-500 text-red-700'
                }`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {notification.type === 'success' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            <p className="font-medium">{notification.message}</p>
                        </div>
                        <button
                            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#577590]">Task Manager</h1>
                    <button
                        onClick={toggleForm}
                        className="bg-[#F2A541] hover:bg-[#F08A4B] text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Create Task
                    </button>
                </div>

                {showForm && (
                    <div className="mb-8 p-8 bg-white rounded-xl shadow-lg border-l-4 border-[#577590] transform transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-6 text-[#577590]">Create New Task</h2>
                        <form onSubmit={saveTask} className="space-y-6">
                            <div>
                                <label
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                    htmlFor="taskName"
                                >
                                    Task Name
                                </label>
                                <input
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F3CA40] focus:border-transparent transition"
                                    type="text"
                                    placeholder="Enter Task Name"
                                    name="taskName"
                                    value={task.taskName}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                    htmlFor="taskDescription"
                                >
                                    Task Description
                                </label>
                                <textarea
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F3CA40] focus:border-transparent transition"
                                    id="taskDescription"
                                    placeholder="Enter Task Description"
                                    name="description"
                                    value={task.description}
                                    onChange={handleInput}
                                    rows={4}
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                    htmlFor="dueDate"
                                >
                                    Due Date
                                </label>
                                <input
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F3CA40] focus:border-transparent transition"
                                    type="date"
                                    placeholder="YYYY-MM-DD"
                                    name="dueDate"
                                    value={task.dueDate}
                                    onChange={handleInput}
/*
                                    min={new Date().toISOString().split('T')[0]}
*/

                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-[#577590] hover:bg-[#4A6275] text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 flex-1"
                                >
                                    Save Task
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleForm}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-[#577590] flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        All Tasks
                    </h2>

                    {tasks.length > 0 ? (
                        <div className="space-y-4">
                            {tasks.map((t) => {
                                const dueDate = t.dueDate ? new Date(t.dueDate) : null;
                                const isOverdue = dueDate && dueDate < new Date();
                                return (
                                <div
                                    key={t.id}
                                    className="p-4 border-l-4 border-[#F3CA40] bg-gray-50 rounded-lg hover:shadow-md transition duration-300"
                                >
                                    <h3 className="font-bold text-lg text-[#F08A4B] mb-2">{t.taskName}</h3>
                                    {t.dueDate && (
                                        <span className={`text-sm font-medium px-2 py-1 rounded ${isOverdue ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                {isOverdue ? 'Overdue: ' : 'Due: '}
                                            {new Date(t.dueDate).toLocaleDateString()}
                            </span>
                                    )}
                                    <p className="text-gray-600">{t.description || "No description provided."}</p>
                                </div>
                            )})}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-gray-500 text-lg">No tasks to display yet...</p>
                            <p className="text-gray-400 mt-2">Your tasks will appear here once you create them.</p>
                            <button
                                onClick={toggleForm}
                                className="mt-6 bg-[#F2A541] hover:bg-[#F08A4B] text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-300"
                            >
                                Create Your First Task
                            </button>
                        </div>
                    )}
                </div>
            </div>
{/* This is use for testing, dont remove it
            <button onClick={showTask}>Testing button</button>
*/}
        </div>
    );
}