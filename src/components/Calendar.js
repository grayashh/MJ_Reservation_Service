import React, { useState } from "react";
import styled from "styled-components";
import { WeeklyCalendar, Card } from "react-rainbow-components";
import axios from "axios";

const StyledCard = styled(Card)`
  height: 600px;
  padding: 1rem;
`;

export default React.memo(function CustomWeeklyCalendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState([]);

  //id, area, startDate, endDate
  const EventsApiCall = async () => {
    await axios
      .get("/events")
      .then((res) => {
        setEvents(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  EventsApiCall();

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
});
