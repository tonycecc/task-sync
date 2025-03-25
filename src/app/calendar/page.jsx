'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';

export default function Calendar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
              events={[
                { title: '(Just Sample)', start: '2025-03-26' },
                { title: '(just Sample)', start: '2025-03-27' },
                { title: '(Just Sample)', start: '2025-03-30' }
              ]}
          />
        </div>
      </div>
  );
}