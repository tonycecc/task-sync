'use client';

import { useEffect, useState, useRef } from 'react';
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
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();
    const tooltipContainerRef = useRef(null);

    const fetchTasks = async () => {
        if (!user?.id) return;

        setIsLoading(true);
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
                id: task.id || `task-${Math.random().toString(36).substr(2, 9)}`,
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
        } finally {
            setIsLoading(false);
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

        const existingTooltips = document.querySelectorAll('.event-tooltip');
        existingTooltips.forEach(tooltip => {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
        });

        return () => {
            const tooltips = document.querySelectorAll('.event-tooltip');
            tooltips.forEach(tooltip => {
                if (document.body.contains(tooltip)) {
                    document.body.removeChild(tooltip);
                }
            });
        };
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

            <div
                ref={tooltipContainerRef}
                className="tooltip-container relative"
                style={{ position: 'absolute', zIndex: 1000 }}
            />

            <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
                {isLoading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#577590]"></div>
                    </div>
                ) : (
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
                                const eventEl = info.el;
                                eventEl.setAttribute('data-tooltip', info.event.extendedProps.description);
                                eventEl.title = info.event.extendedProps.description;
                                eventEl.classList.add('tooltip-enabled');
                            }
                        }}
                        height="auto"
                    />
                )}
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

            {/* Add CSS for tooltip-enabled elements */}
            <style jsx global>{`
                .tooltip-enabled {
                    position: relative;
                    cursor: pointer;
                }
                
                .tooltip-enabled:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #1f2937;
                    color: white;
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                    white-space: nowrap;
                    z-index: 1000;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                }
                
                /* Hide any existing event tooltips */
                .event-tooltip {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}