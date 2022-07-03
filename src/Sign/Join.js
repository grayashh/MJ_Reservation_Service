import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styled from "styled-components";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

export default function Join() {
  const theme = createTheme();

  // 유효성 검사 useState 추가
  const [checked, setChecked] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  // 약관 동의 체크 확인
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  // 이름, 전화번호, 아이디, 패스워드 받기
  const onhandlePost = async (data) => {
    const { name, phone, id, password } = data;
    const postData = { name, phone, id, password };

    await axios
      .post("/user/join", { postData })
      .then((res) => {
        console.log(res, "성공");
        navigate.push("/user/login");
      })
      .catch((err) => {
        console.log(err);
        setRegisterError("회원가입에 실패하였습니다.");
      });
  };

  //form 전송
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const joinData = {
      name: data.get("name"),
      phone: data.get("phone"),
      id: data.get("id"),
      password: data.get("password"),
      rePassword: data.get("rePassword"),
    };
    const { name, phone, id, password, rePassword } = joinData;
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

    // 아이디 유효성 체크
    const idRegrex = /^[a-zA-Z]\w{2,7}$/;
    if (!idRegrex.test(id)) setIdError("올바른 아이디 형식이 아닙니다.");
    else setIdError("");

    // 비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordState("영문자+숫자 조합으로 8자리 이상 입력해주세요!");
    else setPasswordState("");

    // 비밀번호 같은지 체크
    if (password !== rePassword)
      setPasswordError("비밀번호가 일치하지 않습니다.");
    else setPasswordError("");

    // 회원가입 동의 체크
    if (!checked) alert("회원가입 약관에 동의해주세요.");

    // 모두 통과하면 post되는 코드 실행
    if (
      nameRegex.test(name) &&
      phoneRegex.test(phone) &&
      idRegrex.test(id) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      checked
    ) {
      onhandlePost(joinData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Boxs
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              {/* 이름 입력 폼 */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
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
                    id="id"
                    label="아이디"
                    name="id"
                    autoComplete="id"
                    error={idError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{idError}</FormHelperTexts>

                {/* 비밀번호 입력 폼 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="비밀번호 (영문자+숫자 8자리 이상)"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={passwordState !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>

                {/* 비밀번호 재입력 폼 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="rePassword"
                    label="비밀번호 재입력"
                    type="password"
                    id="rePassword"
                    autoComplete="new-password"
                    error={passwordError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>

                {/* 이용약관 체크 박스 */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleAgree} color="primary" />
                    }
                    label="이용약관 및 개인정보 처리 방침에 동의합니다."
                  />
                </Grid>
              </Grid>

              {/* 회원가입 버튼 */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/user/login" variant="body2">
                  이미 계정이 있으신가요? <b>로그인 하기</b>
                </Link>
              </Grid>
            </Grid>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
