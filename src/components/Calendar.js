import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WeeklyCalendar, Card } from "react-rainbow-components";
import axios from "axios";

const StyledCard = styled(Card)`
  height: 600px;
  padding: 1rem;
`;

//  리렌더링 방지
export default function CustomWeeklyCalendar() {
  // 현재 주차 State, 예약 등록된 events State
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/events")
      .then((res) => {
        setEvents(res);
      })
      .catch((e) => {
        console.log(e);
      });
    // 여기에 코드를 적자
  }, [events]);

  //id, title(area), startDate, endDate 받아서 설정

  return (
    <StyledCard>
      <WeeklyCalendar
        events={events}
        currentWeek={currentWeek}
        onWeekChange={({ week }) => setCurrentWeek(week)}
        locale="ko"
      />
    </StyledCard>
  );
}
