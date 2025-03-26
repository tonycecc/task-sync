'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { useUser } from '@clerk/nextjs';

export default function Calendar() {
    const [isMounted, setIsMounted] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [events, setEvents] = useState([]);
    const { user } = useUser();
    const fetchTasks = async () => {
        if (!user?.id) return;

        try {
            const response = await fetch(`/api/task?userId=${user.id}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }

            const data = await response.json();
            setTasks(data);

            const taskEvents = data.map(task => ({
                id: task.id,
                title: task.taskName,
                start: task.dueDate,
                allDay: true,
                backgroundColor: isTaskOverdue(task.dueDate) ? '#f87171' : '#60a5fa',
                borderColor: isTaskOverdue(task.dueDate) ? '#ef4444' : '#3b82f6',
                description: task.description || 'No description provided'
            }));

            setEvents(taskEvents);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const isTaskOverdue = (dueDate) => {
        if (!dueDate) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(dueDate) < today;
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && user?.id) {
            fetchTasks();

            const interval = setInterval(fetchTasks, 30000);

            return () => clearInterval(interval);
        }
    }, [isMounted, user]);

    const handleEventClick = (clickInfo) => {
        const event = clickInfo.event;
        alert(`Task: ${event.title}\nDue: ${event.start.toLocaleDateString()}\nDescription: ${event.extendedProps.description}`);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#F9E9EC] p-8 font-sans text-black-500">
            <h1 className="text-4xl font-bold mb-6 text-center text-orange-300 drop-shadow">
                My TaskSync Calendar
            </h1>
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                        multiMonthPlugin
                    ]}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth,multiMonthYear'
                    }}
                    events={events}
                    eventClick={handleEventClick}
                    eventDidMount={(info) => {
                        if (info.event.extendedProps.description) {
                            const tooltip = document.createElement('div');
                            tooltip.className = 'event-tooltip bg-gray-800 text-white p-2 rounded text-sm';
                            tooltip.innerHTML = info.event.extendedProps.description;
                            document.body.appendChild(tooltip);

                            const eventEl = info.el;
                            eventEl.onmouseover = function() {
                                const rect = eventEl.getBoundingClientRect();
                                tooltip.style.position = 'absolute';
                                tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
                                tooltip.style.left = `${rect.left + window.scrollX}px`;
                                tooltip.style.display = 'block';
                                tooltip.style.zIndex = 1000;
                            };
                            eventEl.onmouseout = function() {
                                tooltip.style.display = 'none';
                            };
                            info.el.addEventListener('mouseleave', () => {
                                document.body.removeChild(tooltip);
                            }, { once: true });
                        }
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto mt-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex justify-around">
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-[#577590]">{tasks.length}</span>
                        <span className="text-gray-600">Total Tasks</span>
                    </div>
                    <div className="text-center">
            <span className="block text-2xl font-bold text-red-500">
              {tasks.filter(task => isTaskOverdue(task.dueDate)).length}
            </span>
                        <span className="text-gray-600">Overdue</span>
                    </div>
                    <div className="text-center">
            <span className="block text-2xl font-bold text-green-500">
              {tasks.filter(task => !isTaskOverdue(task.dueDate) && task.dueDate).length}
            </span>
                        <span className="text-gray-600">Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
}