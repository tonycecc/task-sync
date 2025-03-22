"use client";
import { useEffect } from "react";

export default function Calendar() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js";
    script.async = true;
    script.onload = () => {
      const calendarEl = document.getElementById("calendar");
      if (window.FullCalendar && calendarEl) {
        const calendar = new window.FullCalendar.Calendar(calendarEl, {
          initialView: "dayGridMonth",
          editable: true,
          selectable: true,
          headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth,multiMonthYear",
          },
          events: [
            { title: "(Just sample)", start: "2025-03-26" },
            { title: "(just sample)", start: "2025-03-27" },
            { title: "(Just Sample)", start: "2025-03-30" },
          ],
        });
        calendar.render();
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-[#e0f2f1] p-8 font-sans text-black-500">
      <h1 className="text-4xl font-bold mb-6 text-center text-orange-300 drop-shadow">
        My TaskSync Calendar
      </h1>
      <div
        id="calendar"
        className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl"
      ></div>
    </div>
  );
}
