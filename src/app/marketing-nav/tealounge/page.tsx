"use client"; // 이 페이지가 클라이언트 컴포넌트임을 명시

import styles from "./tealounge.module.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    start: new Date(),
    end: new Date(),
    title: "오늘",
  },
];

export default function Page() {
  return (
    <div className={styles.container}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
