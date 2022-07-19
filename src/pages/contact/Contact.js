import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styled from "styled-components";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Swal from "sweetalert2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import Header from "../../components/Header";

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

function Join() {
  // color, font 설정
  const theme = createTheme({
    palette: {
      primary: {
        main: "#005cb8",
      },
      secondary: {
        main: "#051c48",
      },
      header: {
        main: "#808080",
      },
      icon: {
        main: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "'Noto Sans KR', sans-serif",
    },
  });

  // 유효성 검사 useState 추가
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // 이름, 전화번호, 아이디, 패스워드 받기
  const onhandlePost = async (data) => {
    const { name, phone, email, message } = data;
    const postData = { name, phone, email, message };

    await axios
      .post("/contact", { postData })
      .then((res) => {
        // submit 버튼 중복클릭 방지
        let submitBtn = document.getElementById("submit");
        submitBtn.addEventListener("click", function (e) {
          this.setAttribute("disabled", "true");
          this.setAttribute("disabledElevation", "true");
          this.setAttribute("disabledRipple", "true");
        });
        Swal.fire({
          icon: "success",
          title: "정상적으로 전송되었습니다.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          iconColor: "#d32f2f",
          title: "전송 실패",
          text: "다시 시도해주세요",
          confirmButtonColor: "#005cb8",
        });
        console.log(postData);
      });
  };

  //form 전송
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const contactData = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      message: data.get("message"),
    };
    const { name, phone, email } = contactData;
    // 이름 유효성 체크
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1)
      setNameError("올바른 이름을 입력해주세요.");
    else setNameError("");

    // 전화번호 유효성 체크
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(phone))
      setPhoneError("올바른 전화번호를 입력해주세요.");
    else setPhoneError("");

    // 이메일 유효성 체크
    const emailRegrex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegrex.test(email))
      setEmailError("올바른 이메일 형식이 아닙니다.");
    else setEmailError("");

    // 모두 통과하면 post되는 코드 실행
    if (
      nameRegex.test(name) &&
      phoneRegex.test(phone) &&
      emailRegrex.test(email)
    ) {
      onhandlePost(contactData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container sx={{ mt: 18 }} maxWidth="sm">
        <Card>
          <CardContent>
            <Box sx={{ textAlign: "center" }}>
              {/* 메인 제목 */}
              <Typography component="h1" variant="h4">
                문의사항
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 6 }}
              >
                <FormControl component="fieldset" variant="standard">
                  {/* 이름 입력 폼 */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="이름"
                        autoFocus
                        error={nameError !== "" || false}
                      />
                    </Grid>
                    <FormHelperTexts>{nameError}</FormHelperTexts>

                    {/* 전화번호 입력 폼 */}
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="phone"
                        label="전화번호(010-XXXX-XXXX)"
                        name="phone"
                        autoComplete="phone"
                        error={phoneError !== "" || false}
                      />
                    </Grid>
                    <FormHelperTexts>{phoneError}</FormHelperTexts>

                    {/* 아이디 입력 폼 */}
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="이메일"
                        name="email"
                        autoComplete="email"
                        error={emailError !== "" || false}
                      />
                    </Grid>
                    <FormHelperTexts>{emailError}</FormHelperTexts>

                    {/* 내용 입력 폼 */}
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={8}
                        name="message"
                        label="내용"
                        id="message"
                      />
                    </Grid>
                  </Grid>

                  {/* 제출 버튼 */}
                  <Button
                    id="submit"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 8 }}
                    size="large"
                  >
                    제출
                  </Button>
                </FormControl>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
export default Join;
