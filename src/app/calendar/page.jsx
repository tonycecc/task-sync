"use client";
import { useEffect } from "react";

export default function Calendar() {
  useEffect(() => {
    // Load FullCalendar script from CDN
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js";
    script.async = true;
    script.onload = () => {
      const calendarEl = document.getElementById("calendar");
      if (window.FullCalendar && calendarEl) {
        const calendar = new window.FullCalendar.Calendar(calendarEl, {
          initialView: "dayGridMonth",
        });
        calendar.render();
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Testing FullCalendar with Script Tags</h1>
      <div id="calendar"></div>
    </div>
  );
}
