import { Grid, Paper, Typography } from "@mui/material";
import * as React from "react";
import {
  ActivityTimeline,
  DateTimePicker,
  Input,
  TimelineMarker,
} from "react-rainbow-components";

export default function Result(data) {
  // props로 받은 data 저장
  const { startValue, endValue, area, headCounter, name, phone } = data;

  // 코트 이름 변환
  let printArea = area === "RIGHT" ? "오른쪽 코트" : "왼쪽 코트";

  return (
    <Paper sx={{ p: 3 }}>
      {/* 제목 헤더 */}
      <Typography variant="h4" fontWeight="bold">
        예약정보
      </Typography>
      <ActivityTimeline>
        <Grid container spacing={6}>
          {/* 예약 시작시간 */}
          <Grid item xs={12}>
            <TimelineMarker label="예약 시작시간" />
            <DateTimePicker
              readOnly
              value={new Date(startValue)}
              isCentered
              icon=" "
            />
          </Grid>

          {/* 예약 종료시간 */}
          <Grid item xs={12}>
            <TimelineMarker label="예약 종료시간" />
            <DateTimePicker
              readOnly
              value={new Date(endValue)}
              isCentered
              icon=" "
            />
          </Grid>

          {/* 예약 장소 */}
          <Grid item xs={12}>
            <TimelineMarker label="예약 장소" />
            <Input readOnly value={printArea} isCentered></Input>
          </Grid>

          {/* 예약 인원 */}
          <Grid item xs={12}>
            <TimelineMarker label="예약 인원" />
            <Input readOnly value={headCounter + "명"} isCentered></Input>
          </Grid>

          {/* 예약자명 */}
          <Grid item xs={12}>
            <TimelineMarker label="예약자명" />
            <Input readOnly value={name} isCentered></Input>
          </Grid>

          {/* 예약자 전화번호 */}
          <Grid item xs={12}>
            <TimelineMarker label="예약자 전화번호" />
            <Input readOnly value={phone} isCentered></Input>
          </Grid>
        </Grid>
      </ActivityTimeline>
    </Paper>
  );
}
