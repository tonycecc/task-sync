"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser,SignInButton } from '@clerk/nextjs';

export default function HomePage() {
    const { user, isLoaded } = useUser();
    const [isVisible, setIsVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        overdue: 0,
        upcoming: 0,
        completed: 0
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Fetch tasks for authenticated users
    useEffect(() => {
        const fetchTasks = async () => {
            if (user?.id) {
                try {
                    const response = await fetch(`/api/task?userId=${user.id}`, {
                        method: 'GET'
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setTasks(data);

                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        const overdueTasks = data.filter(task =>
                            task.dueDate && new Date(task.dueDate) < today
                        );

                        const upcomingTasks = data.filter(task =>
                            task.dueDate && new Date(task.dueDate) >= today
                        );

                        setStats({
                            total: data.length,
                            overdue: overdueTasks.length,
                            upcoming: upcomingTasks.length,
                            completed: 0
                        });
                    }
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            }
        };

        if (isLoaded && user) {
            fetchTasks();
        }
    }, [user, isLoaded]);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const buttonHover = {
        scale: 1.05,
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 }
    };

    const cardHover = {
        y: -10,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 }
    };
    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-[#F9E9EC] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#577590]"></div>
            </div>
        );
    }
    if (user) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-[#F9E9EC] to-[#F9E9EC]/80 py-12 px-4">
                <motion.div
                    className="max-w-6xl mx-auto"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={fadeIn}
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#577590]">
                                Welcome back, {user.firstName || user.username || 'User'}!
                            </h1>
                            <p className="text-[#577590]/70 mt-2">
                                Here's an overview of your tasks and progress
                            </p>
                        </div>
                        <motion.div
                            whileHover={buttonHover}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a href="/task" className="inline-block mt-4 md:mt-0 bg-[#F2A541] text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-[#F08A4B] transition-colors">
                                Manage Tasks
                            </a>
                        </motion.div>
                    </div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
                        variants={staggerChildren}
                    >
                        <motion.div
                            className="bg-white rounded-xl shadow-md p-6"
                            variants={fadeIn}
                            whileHover={cardHover}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-gray-500 font-medium">Total Tasks</h3>
                                <span className="p-2 bg-blue-100 rounded-full">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-[#577590]">{stats.total}</h2>
                            <p className="text-gray-500 mt-2">Tasks in total</p>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-xl shadow-md p-6"
                            variants={fadeIn}
                            whileHover={cardHover}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-gray-500 font-medium">Overdue</h3>
                                <span className="p-2 bg-red-100 rounded-full">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-red-500">{stats.overdue}</h2>
                            <p className="text-gray-500 mt-2">Tasks overdue</p>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-xl shadow-md p-6"
                            variants={fadeIn}
                            whileHover={cardHover}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-gray-500 font-medium">Upcoming</h3>
                                <span className="p-2 bg-green-100 rounded-full">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-green-500">{stats.upcoming}</h2>
                            <p className="text-gray-500 mt-2">Tasks upcoming</p>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-xl shadow-md p-6"
                            variants={fadeIn}
                            whileHover={cardHover}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-gray-500 font-medium">This Week</h3>
                                <span className="p-2 bg-purple-100 rounded-full">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-purple-500">
                                {tasks.filter(task => {
                                    if (!task.dueDate) return false;
                                    const taskDate = new Date(task.dueDate);
                                    const today = new Date();
                                    const nextWeek = new Date();
                                    nextWeek.setDate(today.getDate() + 7);
                                    return taskDate >= today && taskDate <= nextWeek;
                                }).length}
                            </h2>
                            <p className="text-gray-500 mt-2">Due this week</p>
                        </motion.div>
                    </motion.div>

                    {/* Recent Tasks */}
                    <motion.div
                        className="bg-white rounded-xl shadow-md p-6 mb-10"
                        variants={fadeIn}
                    >
                        <h2 className="text-2xl font-bold text-[#577590] mb-6">Recently Added Tasks</h2>
                        <div className="space-y-4">
                            {tasks.length > 0 ? (
                                tasks.slice(0, 5).map((task, index) => {
                                    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
                                    const isOverdue = dueDate && dueDate < new Date();

                                    return (
                                        <motion.div
                                            key={task.id || index}
                                            className={`p-4 border-l-4 ${isOverdue ? 'border-red-500' : 'border-[#F3CA40]'} bg-gray-50 rounded-lg hover:shadow-md transition duration-300`}
                                            whileHover={{ x: 5 }}
                                        >
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-lg text-[#F08A4B]">{task.taskName}</h3>
                                                {task.dueDate && (
                                                    <span className={`text-sm font-medium px-2 py-1 rounded ${isOverdue ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                            {isOverdue ? 'Overdue: ' : 'Due: '}
                                                        {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 mt-2">{task.description || "No description provided."}</p>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No tasks yet. Start by creating your first task!</p>
                                    <motion.div className="mt-4" whileHover={buttonHover}>
                                        <a href="/task" className="inline-block bg-[#F2A541] text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-[#F08A4B] transition-colors">
                                            Create Task
                                        </a>
                                    </motion.div>
                                </div>
                            )}
                        </div>
                        {tasks.length > 5 && (
                            <div className="text-center mt-6">
                                <motion.a
                                    href="/task"
                                    className="inline-block text-[#577590] font-medium hover:text-[#F08A4B] transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    View all tasks →
                                </motion.a>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        variants={staggerChildren}
                    >
                        <motion.a
                            href="/calendar"
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                            variants={fadeIn}
                            whileHover={cardHover}
                        >
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-full mr-4">
                                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-[#577590]">Calendar View</h3>
                                    <p className="text-gray-500">View tasks in calendar format</p>
                                </div>
                            </div>
                        </motion.a>

                        <motion.a
                            href="/profile"
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                            variants={fadeIn}
                            whileHover={cardHover}
                        >
                            <div className="flex items-center">
                                <div className="p-3 bg-purple-100 rounded-full mr-4">
                                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-[#577590]">Your Profile</h3>
                                    <p className="text-gray-500">View and update your profile</p>
                                </div>
                            </div>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </main>
        );
    }
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#F9E9EC] to-[#F9E9EC]/80 flex flex-col items-center justify-center overflow-hidden">
            <motion.section
                className="text-center max-w-3xl mx-auto px-4 py-12"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeIn}
            >
                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-[#577590] mb-6"
                    animate={{
                        scale: [1, 1.03, 1],
                        transition: {duration: 2, repeat: Infinity, repeatType: "reverse"}
                    }}
                >
                    Welcome to Task Syncs
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-[#577590]/90 mb-8 leading-relaxed"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.3, duration: 0.8}}
                >
                    Stay organized, boost productivity, and accomplish more with our
                    intuitive task management tool.
                </motion.p>
                <motion.a
                    whileHover={buttonHover}
                    whileTap={{scale: 0.95}}
                >
                    <SignInButton
                        mode="modal"
                        className="inline-block bg-[#F3CA40] text-[#577590] font-semibold px-8 py-4 rounded-full shadow-md hover:bg-[#F2A541] transition-colors"
                    >
                        Get Started
                    </SignInButton>
                </motion.a>
            </motion.section>

            <motion.section
                className="w-full max-w-6xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={staggerChildren}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >
                <motion.div
                    className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-all duration-300"
                    variants={fadeIn}
                    whileHover={cardHover}
                >
                    <motion.div
                        className="w-16 h-16 mx-auto mb-4 bg-[#F08A4B]/10 rounded-full flex items-center justify-center"
                        animate={{
                            rotate: [0, 10, 0, -10, 0],
                            transition: { duration: 6, repeat: Infinity }
                        }}
                    >
                        <svg className="w-8 h-8 text-[#F08A4B]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                    </motion.div>
                    <h2 className="text-[#F08A4B] font-bold text-xl mb-3">Easy Task Tracking</h2>
                    <p className="text-gray-700">
                        Quickly add tasks, set priorities, and track progress with minimal effort.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-all duration-300"
                    variants={fadeIn}
                    whileHover={cardHover}
                >
                    <motion.div
                        className="w-16 h-16 mx-auto mb-4 bg-[#F08A4B]/10 rounded-full flex items-center justify-center"
                        animate={{
                            scale: [1, 1.1, 1],
                            transition: { duration: 4, repeat: Infinity }
                        }}
                    >
                        <svg className="w-8 h-8 text-[#F08A4B]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                    </motion.div>
                    <h2 className="text-[#F08A4B] font-bold text-xl mb-3">Collaboration</h2>
                    <p className="text-gray-700">
                        Share tasks with teammates or family. Assign responsibilities and stay in sync effortlessly.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-all duration-300"
                    variants={fadeIn}
                    whileHover={cardHover}
                >
                    <motion.div
                        className="w-16 h-16 mx-auto mb-4 bg-[#F08A4B]/10 rounded-full flex items-center justify-center"
                        animate={{
                            y: [0, -5, 0],
                            transition: { duration: 2, repeat: Infinity }
                        }}
                    >
                        <svg className="w-8 h-8 text-[#F08A4B]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                    </motion.div>
                    <h2 className="text-[#F08A4B] font-bold text-xl mb-3">Smart Reminders</h2>
                    <p className="text-gray-700">
                        Get timely notifications and never miss an important task or deadline again.
                    </p>
                </motion.div>
            </motion.section>

            <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <motion.div
                    className="absolute top-20 left-20 w-16 h-16 rounded-full bg-[#F3CA40]/20"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.5, 1],
                        transition: { duration: 15, repeat: Infinity }
                    }}
                />
                <motion.div
                    className="absolute bottom-40 right-20 w-24 h-24 rounded-full bg-[#F08A4B]/10"
                    animate={{
                        x: [0, -120, 0],
                        y: [0, -80, 0],
                        scale: [1, 2, 1],
                        transition: { duration: 18, repeat: Infinity }
                    }}
                />
                <motion.div
                    className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-[#577590]/10"
                    animate={{
                        x: [0, 70, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.2, 1],
                        transition: { duration: 12, repeat: Infinity }
                    }}
                />
            </motion.div>
        </main>
    );
}