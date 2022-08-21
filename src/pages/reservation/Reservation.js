import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReservationForm from '../../components/ReservationForm';
import PrivacyForm from '../../components/PrivacyForm';
import Result from '../../components/Result';
import Header from '../../components/Header';
import BackgroundVideo from '../../components/Background';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useNavigate } from 'react-router-dom';

const steps = ['개인정보 동의', '예약정보 작성', '예약 완료'];

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

export default function Checkout() {
  async function onhandlePost(data) {
    const { startValue, endValue, area, headCount, name, phone, password } =
      data;
    const postData = {
      name,
      phone,
      password,
      headcount: headCount,
      court: area,
      startDate: startValue,
      endDate: endValue,
    };

    console.log(postData);

    await axios
      .post('http://localhost:7000/reservation', postData)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: '예약 성공',
          showConfirmButton: false,
          timer: 1000,
        });
        handleNext();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          iconColor: '#d32f2f',
          title: '예약 실패',
          text: '다시 시도해주세요',
          confirmButtonColor: '#005cb8',
        });
      });
  }

  // Step State
  const [activeStep, setActiveStep] = React.useState(0);

  // 다음 스텝 넘어가는 함수
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  //이전 스텝 돌아가는 함수
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // 버튼 상태

  // 예약 정보
  const [startValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(new Date());
  const [headCount, setCount] = useState(6);
  const [area, setArea] = useState('RIGHT');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // 재확인용 비밀번호 State
  const [rePassword, setRePassword] = useState('');

  // 유효성 검사
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const buttonValue = activeStep === steps.length - 1 ? '예약하기' : '다음';

  // 이용약관 동의 state
  const [checked, setChecked] = useState(false);

  // 스텝에 따른 페이지 불러오기
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PrivacyForm setChecked={setChecked} checked={checked} />;
      case 1:
        return (
          <FadeIn>
            <ReservationForm
              startValue={startValue}
              setStartValue={setStartValue}
              endValue={endValue}
              setEndValue={setEndValue}
              headCount={headCount}
              setCount={setCount}
              area={area}
              setArea={setArea}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              password={password}
              setPassword={setPassword}
              rePassword={rePassword}
              setRePassword={setRePassword}
              nameError={nameError}
              setNameError={setNameError}
              phoneError={phoneError}
              setPhoneError={setPhoneError}
              passwordState={passwordState}
              setPasswordState={setPasswordState}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />
          </FadeIn>
        );
      case 2:
        return (
          <Result
            startValue={startValue}
            endValue={endValue}
            headCount={headCount}
            area={area}
            name={name}
            phone={phone}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      startValue,
      endValue,
      area,
      headCount,
      name,
      phone,
      password,
    };

    //개인정보 동의 checkbox 유효성 검사
    if (activeStep === 0) {
      if (!checked) {
        Swal.fire({
          icon: 'error',
          iconColor: '#d32f2f',
          title: '개인정보 약관에 동의해주세요.',
          confirmButtonColor: '#005cb8',
        });
      } else handleNext();
    }

    if (activeStep === 1) {
      // 이름 유효성 체크
      const nameRegex = /^[가-힣a-zA-Z]+$/;
      if (!nameRegex.test(name) || name.length < 1)
        setNameError('올바른 이름을 입력해주세요.');
      else setNameError('');

      // 전화번호 유효성 체크
      const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
      if (!phoneRegex.test(phone))
        setPhoneError('올바른 전화번호를 입력해주세요.');
      else setPhoneError('');

      // 비밀번호 유효성 체크
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
      if (!passwordRegex.test(password))
        setPasswordState('영문자+숫자 조합으로 8자리 이상 입력해주세요.');
      else setPasswordState('');

      // 비밀번호 같은지 체크
      if (password !== rePassword)
        setPasswordError('비밀번호가 일치하지 않습니다.');
      else setPasswordError('');

      // 유효성 체크 후 통과시 다음으로 넘어가기
      if (
        nameRegex.test(name) &&
        phoneRegex.test(phone) &&
        passwordRegex.test(password) &&
        password === rePassword &&
        checked
      ) {
        handleNext();
      } else {
      }
    }

    // 마지막에서 예약하기 버튼일 경우 onhandlePost
    if (activeStep === 2) {
      if (event.target.id === '예약하기') {
        onhandlePost(userData);
      }
    }
  };
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <FadeIn>
        <Container component='main' maxWidth='md'>
          <Paper variant='outlined' sx={{ p: { xs: 2, md: 5 } }}>
            <Typography variant='h4' align='center'>
              농구장 예약
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant='h5' gutterBottom>
                    예약해주셔서 감사합니다.
                  </Typography>
                  <Typography variant='subtitle1'>
                    예약은 "내 예약 확인하기"에서 다시 확인하실 수 있습니다.
                  </Typography>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ mt: 3 }}
                    onClick={() => {
                      navigate('/check');
                    }}>
                    내 예약 확인하기
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                    onSubmit={handleSubmit}
                    component='form'
                    noValidate>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        이전
                      </Button>
                    )}

                    <Button
                      id={buttonValue}
                      type='submit'
                      variant='contained'
                      sx={{ mt: 3, ml: 1 }}
                      onClick={(event) => handleSubmit(event)}>
                      {buttonValue}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </FadeIn>
      <BackgroundVideo />
    </ThemeProvider>
  );
}
