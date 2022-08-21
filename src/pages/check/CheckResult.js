import { Container, createTheme, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  ActivityTimeline,
  DateTimePicker,
  Input,
  TimelineMarker,
} from 'react-rainbow-components';
import { ThemeProvider } from '@mui/material';
import Header from '../../components/Header';
import FadeIn from 'react-fade-in/lib/FadeIn';
import BackgroundVideo from '../../components/Background';

const CheckResult = () => {
  // user data State
  const [users, setUsers] = useState([]);

  // user data 받아오고 set
  useEffect(() => {
    axios.get('/users').then((response) => {
      setUsers(response.data);
    });
  }, [users]);

  // 코트 이름 변환
  let printArea = users.court === 'RIGHT' ? '오른쪽 코트' : '왼쪽 코트';

  const theme = createTheme({
    palette: {
      primary: {
        main: '#005cb8',
      },
      secondary: {
        main: '#051c48',
      },
      header: {
        main: 'transparent',
      },
      icon: {
        main: '#FFFFFF',
      },
      typography: {
        fontFamily: "'Noto Sans KR', sans-serif",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <FadeIn>
        <Container component='main' maxWidth='md'>
          <Paper variant='outlined' sx={{ p: { xs: 6 } }}>
            <Grid container spacing={2} alignContent='center'>
              <ActivityTimeline>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Typography variant='h4' fontWeight='bold'>
                      예약정보
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TimelineMarker label='예약 시작시간' />
                    <DateTimePicker
                      readOnly
                      value={new Date(users.startDate)}
                      isCentered
                      icon=' '
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TimelineMarker label='예약 종료시간' />
                    <DateTimePicker
                      readOnly
                      value={new Date(users.endDate)}
                      isCentered
                      icon=' '
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TimelineMarker label='예약 장소' />
                    <Input readOnly value={printArea} isCentered></Input>
                  </Grid>

                  <Grid item xs={12}>
                    <TimelineMarker label='예약 인원' />
                    <Input
                      readOnly
                      value={users.headcount + '명'}
                      isCentered></Input>
                  </Grid>

                  <Grid item xs={12}>
                    <TimelineMarker label='예약자명' />
                    <Input readOnly value={users.name} isCentered></Input>
                  </Grid>

                  <Grid item xs={12}>
                    <TimelineMarker label='예약자 전화번호' />
                    <Input readOnly value={users.phone} isCentered></Input>
                  </Grid>
                </Grid>
              </ActivityTimeline>
            </Grid>
          </Paper>
        </Container>
      </FadeIn>
      <BackgroundVideo />
    </ThemeProvider>
  );
};

export default CheckResult;
