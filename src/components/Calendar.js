import React, { useState } from "react";
import styled from "styled-components";
import { WeeklyCalendar, Card } from "react-rainbow-components";

const firstDay = new Date();
firstDay.setDate(firstDay.getDate() - firstDay.getDay());
const daysOfWeek = Array.from(Array(7), (_value, index) => {
  const day = new Date(firstDay);
  day.setDate(day.getDate() + index);
  return day;
});

const events = [
  {
    id: 1,
    title: "Reinier",
    startDate: new Date(daysOfWeek[0].setHours(6, 0, 0, 0)),
    endDate: new Date(daysOfWeek[0].setHours(6, 30, 0, 0)),
    backgroundColor: "rgba(253,230,230,1)",
    color: "rgba(254,72,73,1)",
  },
  {
    id: 2,
    title: "JL Torres",
    startDate: new Date(daysOfWeek[0].setHours(7, 30, 0, 0)),
    endDate: new Date(daysOfWeek[0].setHours(8, 0, 0, 0)),
    backgroundColor: "rgba(255,204,0,0.4)",
    color: "rgba(255,157,0,1)",
  },
  {
    id: 3,
    title: "Leandro Torres",
    startDate: new Date(daysOfWeek[0].setHours(11, 0, 0, 0)),
    endDate: new Date(daysOfWeek[0].setHours(12, 15, 0, 0)),
    backgroundColor: "rgba(145,220,193,1)",
    color: "rgba(0,171,142,1)",
  },
  {
    id: 4,
    title: "Yuri V. Munayev",
    startDate: new Date(daysOfWeek[1].setHours(6, 30, 0, 0)),
    endDate: new Date(daysOfWeek[1].setHours(7, 30, 0, 0)),
    backgroundColor: "rgba(254,72,73,1)",
  },
  {
    id: 5,
    title: "Tahimi",
    startDate: new Date(daysOfWeek[1].setHours(8, 0, 0, 0)),
    endDate: new Date(daysOfWeek[1].setHours(8, 15, 0, 0)),
    backgroundColor: "rgba(240,243,56,1)",
  },
  {
    id: 6,
    title: "Tahimi L",
    startDate: new Date(daysOfWeek[2].setHours(8, 0, 0, 0)),
    endDate: new Date(daysOfWeek[2].setHours(9, 30, 0, 0)),
    backgroundColor: "rgba(240,243,56,1)",
  },
  {
    id: 7,
    title: "Sara",
    startDate: new Date(daysOfWeek[3].setHours(6, 0, 0, 0)),
    endDate: new Date(daysOfWeek[3].setHours(6, 30, 0, 0)),
    backgroundColor: "rgba(254,72,73,1)",
  },
  {
    id: 8,
    title: "Tahimi",
    startDate: new Date(daysOfWeek[3].setHours(6, 30, 0, 0)),
    endDate: new Date(daysOfWeek[3].setHours(7, 0, 0, 0)),
    backgroundColor: "rgba(254,72,73,1)",
  },
  {
    id: 9,
    title: "Reinier",
    startDate: new Date(daysOfWeek[3].setHours(7, 30, 0, 0)),
    endDate: new Date(daysOfWeek[3].setHours(8, 15, 0, 0)),
    backgroundColor: "rgba(255,204,0,1)",
  },
  {
    id: 10,
    title: "Sara P",
    startDate: new Date(daysOfWeek[4].setHours(6, 30, 0, 0)),
    endDate: new Date(daysOfWeek[4].setHours(8, 0, 0, 0)),
    backgroundColor: "rgba(254,72,73,1)",
  },
  {
    id: 11,
    title: "Leo Torres",
    startDate: new Date(daysOfWeek[5].setHours(6, 0, 0, 0)),
    endDate: new Date(daysOfWeek[5].setHours(7, 0, 0, 0)),
    backgroundColor: "rgba(254,72,73,1)",
  },
  {
    id: 12,
    title: "Tahimi",
    startDate: new Date(daysOfWeek[6].setHours(8, 0, 0, 0)),
    endDate: new Date(daysOfWeek[6].setHours(9, 30, 0, 0)),
    backgroundColor: "rgba(240,243,56,1)",
  },
];

const StyledCard = styled(Card)`
  height: 600px;
  padding: 1rem;
`;

export default function CustomWeeklyCalendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  return (
    <div className="rainbow-m-around_large">
      <StyledCard>
        <WeeklyCalendar
          events={events}
          currentWeek={currentWeek}
          onWeekChange={({ week }) => setCurrentWeek(week)}
          onEventClick={(event) => alert(event.title)}
          locale="en"
        />
      </StyledCard>
    </div>
  );
}
