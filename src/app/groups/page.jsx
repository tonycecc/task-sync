"use client"
import React, {useEffect} from "react";
import { useState } from "react";
import { useUser } from '@clerk/nextjs';

export default function Page() {
    const [group, createGroup] = useState({
        groupName: "",
        groupDescription: ""
    });
    const { user } = useUser();
    const [showForm, setShowForm] = useState(false);
    const [groups, setGroups] = useState([]);
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
    
    const showGroups = async () => {
        try {
            const response = await fetch(`/api/group?userId=${user.id}`, {
                method: 'GET'
            });
            const data = await response.json();
            setGroups(data);
        }
        catch(error) {
            console.log("Error fetching groups", error);
        }
    }

    const saveGroup = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch('api/group', {
                method: 'POST',
                body: JSON.stringify({
                    "group": group,
                    "user_id": user?.id,
                })
            });
            console.log("Save group response ", response);

            if (response.ok) {
                const savedGroup = { ...group, id: Date.now() };
                setGroups([...groups, savedGroup]);
                showNotification('Group created successfully!');
            } else {
                showNotification('Failed to create group. Please try again.', 'error');
            }

            if (group.groupName) {
                createGroup({
                    groupName: "",
                    groupDescription: "",
                });
            }
            setShowForm(false);
        } catch (error) {
            console.log('Error creating group', error);
            showNotification('Error creating group. Please try again.', 'error');
        }
    };
    
    useEffect(() => {
        const loadInitialGroups = async () => {
            if (user?.id) {
                await showGroups();
            }
        };
        loadInitialGroups();
    }, [user]);

    useEffect(() => {
        if (!user?.id) return;
        const pollGroups = async () => {
            await showGroups();
        };
        pollGroups();
        const interval = setInterval(pollGroups, 10000);
        return () => clearInterval(interval);
    }, [user]);
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        createGroup({ ...group, [name]: value });
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
                    <h1 className="text-3xl font-bold text-[#577590]">Group Management</h1>
                    <button
                        onClick={toggleForm}
                        className="bg-[#F2A541] hover:bg-[#F08A4B] text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Create Group
                    </button>
                </div>

                {showForm && (
                    <div className="mb-8 p-8 bg-white rounded-xl shadow-lg border-l-4 border-[#577590] transform transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-6 text-[#577590]">Create New Group</h2>
                        <form onSubmit={saveGroup} className="space-y-6">
                            <div>
                                <label
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                    htmlFor="groupName"
                                >
                                    Group Name
                                </label>
                                <input
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F3CA40] focus:border-transparent transition"
                                    type="text"
                                    placeholder="Enter Group Name"
                                    name="groupName"
                                    value={group.groupName}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                    htmlFor="groupDescription"
                                >
                                    Group Description
                                </label>
                                <textarea
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F3CA40] focus:border-transparent transition"
                                    id="groupDescription"
                                    placeholder="Enter Group Description"
                                    name="groupDescription"
                                    value={group.groupDescription}
                                    onChange={handleInput}
                                    rows={4}
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-[#577590] hover:bg-[#4A6275] text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 flex-1"
                                >
                                    Create Group
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
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        All Groups
                    </h2>

                    {groups.length > 0 ? (
                        <div className="space-y-4">
                            {groups.map((g) => (
                                <div
                                    key={g.id}
                                    className="p-4 border-l-4 border-[#F3CA40] bg-gray-50 rounded-lg hover:shadow-md transition duration-300"
                                >
                                    <h3 className="font-bold text-lg text-[#F08A4B] mb-2">{g.groupName}</h3>
                                    <p className="text-gray-600">{g.groupDescription || "No description provided."}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-gray-500 text-lg">No groups to display yet...</p>
                            <p className="text-gray-400 mt-2">Your groups will appear here once you create them.</p>
                            <button
                                onClick={toggleForm}
                                className="mt-6 bg-[#F2A541] hover:bg-[#F08A4B] text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-300"
                            >
                                Create Your First Group
                            </button>
                        </div>
                    )}
                </div>
            </div>
{/* This is use for testing, dont remove it
            <button onClick={showGroups}>Testing button</button>
*/}
        </div>
    );
}