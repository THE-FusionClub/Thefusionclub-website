import React from "react";

import { useScrollReveal } from "@/utils/useScrollReveal";
import "./EventsSection.css";

const EVENTS = [
  {
    id: 1,
    title: "FusionX",
    date: "June 10 - 12, 2026",
    location: "Online",
    image: "/assets/events/fusionXposter.png",
    calendarMonth: "JUNE",
    calendarDay: "10",
    registerUrl:
      "https://docs.google.com/forms/d/1-H3nmBvKWKxST6AFST56EJXtRu5rdImaRcj0jO6wBeU/viewform?edit_requested=true",
  },
  {
    id: 2,
    title: "RibaryX 0.1",
    date: "21 Aug",
    location: "DBUU, Dehradun",
    image: "/assets/events/raibaryX.png",
    calendarMonth: "AUG",
    calendarDay: "21",
    badge: "DBUU, Dehradun",
  },
];

export default function EventsSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal({ threshold: 0.2 });
  const { ref: gridRef, isInView: gridInView } = useScrollReveal({ threshold: 0.15 });

  return (
    <section className="events-section">
      <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`events-header reveal ${headerInView ? "is-visible" : ""}`}>
        <h2>THINGS TO LOOK OUT FOR SOON</h2>
        <p>Don&apos;t miss out! We have exciting events and programs coming up for the community.</p>
      </div>

      <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`events-grid reveal ${gridInView ? "is-visible" : ""}`}>
        {EVENTS.map((event, idx) => (
          <div key={event.id} className={`event-card hover-lift`} style={{ transitionDelay: gridInView ? `${idx * 0.15}s` : "0s" }}>
            <div className="event-image-wrapper">
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-calendar">
                <div className="event-calendar-inner">
                  <div className="event-calendar-month">{event.calendarMonth}</div>
                  <div className="event-calendar-day">{event.calendarDay}</div>
                </div>
              </div>
            </div>

            <div className="event-content">
              <div className="event-header-row">
                <h3 className="event-title">{event.title}</h3>
                {event.badge && <div className="event-badge">{event.badge}</div>}
              </div>

              <div className="event-details">
                <div className="event-detail">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M6 1.5V4.5M12 1.5V4.5"
                      stroke="#7C3AED"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.75 3H14.25C15.0779 3 15.75 3.67213 15.75 4.5V15C15.75 15.8279 15.0779 16.5 14.25 16.5H3.75C2.92213 16.5 2.25 15.8279 2.25 15V4.5C2.25 3.67213 2.92213 3 3.75 3V3"
                      stroke="#7C3AED"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.25 7.5H15.75"
                      stroke="#7C3AED"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{event.date}</span>
                </div>
                <div className="event-detail">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M15 7.5C15 11.2448 10.8457 15.1447 9.45075 16.3492C9.18378 16.55 8.81622 16.55 8.54925 16.3492C7.15425 15.1447 3 11.2448 3 7.5C3 4.18851 5.68851 1.5 9 1.5C12.3115 1.5 15 4.18851 15 7.5"
                      stroke="#7C3AED"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.75 7.5C6.75 8.74181 7.75819 9.75 9 9.75C10.2418 9.75 11.25 8.74181 11.25 7.5C11.25 6.25819 10.2418 5.25 9 5.25C7.75819 5.25 6.75 6.25819 6.75 7.5V7.5"
                      stroke="#7C3AED"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>

              <a
                href={event.registerUrl || "https://luma.com/ehjhtl3c"}
                target="_blank"
                rel="noopener noreferrer"
                className="event-button"
              >
                Register Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
