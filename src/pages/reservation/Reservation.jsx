import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReservationForm from "../../components/ReservationForm";
import PrivacyForm from "../../components/PrivacyForm";
import Result from "../../components/Result";
import Header from "../../components/Header";
import BackgroundVideo from "../../components/Background";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import FadeIn from "react-fade-in/lib/FadeIn";

const steps = ["개인정보 동의", "예약정보 작성", "예약 완료"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#005cb8",
    },
    secondary: {
      main: "#051c48",
    },
    header: {
      main: "transparent",
    },
    icon: {
      main: "#FFFFFF",
    },
    typography: {
      fontFamily: "'Noto Sans KR', sans-serif",
    },
  },
});

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const buttonValue = activeStep === steps.length - 1 ? "예약하기" : "다음";

  async function onhandlePost(data) {
    const { startValue, endValue, area, headCount, name, phone, password } =
      data;
    const postData = {
      startValue,
      endValue,
      area,
      headCount,
      name,
      phone,
      password,
    };

    await axios
      .post("/reservation/court", { postData })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "예약 성공",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          iconColor: "#d32f2f",
          title: "예약 실패",
          text: "다시 시도해주세요",
          confirmButtonColor: "#005cb8",
        });
      });
  }

  // 이용약관 동의 state
  const [checked, setChecked] = useState(false);

  // 스텝에 따른 페이지 불러오기
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PrivacyForm setChecked={setChecked} checked={checked} />;
      case 1:
        return <ReservationForm />;
      case 2:
        return <Result />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (activeStep == 1) {
      if (
        props.nameRegex.test(props.name) &&
        props.phoneRegex.test(props.phone) &&
        props.passwordRegex.test(props.password) &&
        props.password === props.rePassword &&
        checked
      ) {
        props.setOnHandlePost();
      }
    }
    if (!checked) {
      Swal.fire({
        icon: "error",
        iconColor: "#d32f2f",
        title: "개인정보 약관에 동의해주세요.",
        confirmButtonColor: "#005cb8",
      });
    } else handleNext();
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <FadeIn>
        <Container component="main" maxWidth="md">
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 5 } }}>
            <Typography variant="h4" align="center">
              농구장 예약
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                    onSubmit={handleSubmit}
                    component="form"
                    noValidate
                  >
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        이전
                      </Button>
                    )}

                    <Button
                      id="submit"
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, ml: 1 }}
                    >
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
