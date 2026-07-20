import React from "react";

import { useScrollReveal } from "@/utils/useScrollReveal";
import styles from "./EventsSection.module.css";

const EVENTS = [
  {
    id: 1,
    title: " SURVIVOR'S ZONE",
    date: "July 24 - 26, 2026",
    location: "Online",
    image: "/assets/events/survivors_zone_poster.webp",
    calendarMonth: "JULY",
    calendarDay: "24",
    registerUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdLRa08mnm9v3FMDT-StTx51YHsC2pU_xaQqUuyru1c0vhyDQ/viewform",
  },
  {
    id: 2,
    title: "RaibarX 1.0",
    date: "21 Aug",
    location: "DBUU, Dehradun",
    image: "/assets/events/RaibarX.png",
    calendarMonth: "AUG",
    calendarDay: "21",
    badge: "DBUU, Dehradun",
  },
];

export default function EventsSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal({ threshold: 0.2 });
  const { ref: gridRef, isInView: gridInView } = useScrollReveal({ threshold: 0.15 });

  return (
    <section className={styles.eventsSection}>
      <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`${styles.eventsHeader} reveal ${headerInView ? "is-visible" : ""}`}>
        <h2>THINGS TO LOOK OUT FOR SOON</h2>
        <p>Don't miss out! We have exciting events and programs coming up for the community.</p>
      </div>

      <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`${styles.eventsGrid} reveal ${gridInView ? "is-visible" : ""}`}>
        {EVENTS.map((event, idx) => (
          <div key={event.id} className={`${styles.eventCard} hover-lift`} style={{ transitionDelay: gridInView ? `${idx * 0.15}s` : "0s" }}>
            <div className={styles.eventImageWrapper}>
              <img src={event.image} alt={event.title} className={styles.eventImage} />
              <div className={styles.eventCalendar}>
                <div className={styles.eventCalendarInner}>
                  <div className={styles.eventCalendarMonth}>{event.calendarMonth}</div>
                  <div className={styles.eventCalendarDay}>{event.calendarDay}</div>
                </div>
              </div>
            </div>

            <div className={styles.eventContent}>
              <div className={styles.eventHeaderRow}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                {event.badge && <div className={styles.eventBadge}>{event.badge}</div>}
              </div>

              <div className={styles.eventDetails}>
                <div className={styles.eventDetail}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M6 1.5V4.5M12 1.5V4.5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.75 3H14.25C15.0779 3 15.75 3.67213 15.75 4.5V15C15.75 15.8279 15.0779 16.5 14.25 16.5H3.75C2.92213 16.5 2.25 15.8279 2.25 15V4.5C2.25 3.67213 2.92213 3 3.75 3V3" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.25 7.5H15.75" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{event.date}</span>
                </div>
                <div className={styles.eventDetail}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M15 7.5C15 11.2448 10.8457 15.1447 9.45075 16.3492C9.18378 16.55 8.81622 16.55 8.54925 16.3492C7.15425 15.1447 3 11.2448 3 7.5C3 4.18851 5.68851 1.5 9 1.5C12.3115 1.5 15 4.18851 15 7.5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.75 7.5C6.75 8.74181 7.75819 9.75 9 9.75C10.2418 9.75 11.25 8.74181 11.25 7.5C11.25 6.25819 10.2418 5.25 9 5.25C7.75819 5.25 6.75 6.25819 6.75 7.5V7.5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>

              <a
                href={event.registerUrl || "https://luma.com/ehjhtl3c"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.eventButton}
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