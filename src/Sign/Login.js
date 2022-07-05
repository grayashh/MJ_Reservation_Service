import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

function Login() {
  // color, font 설정
  const theme = createTheme({
    palette: {
      primary: {
        main: "#005cb8",
      },
      secondary: {
        main: "#051c48",
      },
    },
    typography: {
      fontFamily: "'Noto Sans KR', sans-serif",
    },
  });

  // 재입력 useState 추가
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  //  아이디, 패스워드 받기
  const onhandlePost = async (data) => {
    const { id, password } = data;
    const postData = { id, password };

    // post
    await axios
      .post("/user/login", { postData })
      .then((res) => {
        console.log(res, "성공");
        navigate.push("/main");
      })
      .catch((err) => {
        console.log(err);
        alert("아이디 또는 비밀번호를 다시 확인하세요.");
        setIdError("아이디를 다시 입력해주세요.");
        setPasswordError("비밀번호를 다시 입력해주세요.");
      });
  };

  // form 전송
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const LoginData = {
      id: data.get("id"),
      password: data.get("password"),
    };
    onhandlePost(LoginData);
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
          {/* 아이콘 */}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          {/* 메인 제목 */}
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Boxs
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              {/* 아이디 입력 폼 */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="id"
                    label="아이디"
                    name="id"
                    autoComplete="id"
                    autoFocus
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
                    label="비밀번호"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={passwordError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
              </Grid>

              {/* 로그인 버튼 */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                로그인
              </Button>
            </FormControl>

            {/* 비밀번호 재설정, 회원가입 페이지 링크 */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호 재설정
                </Link>
              </Grid>
              <Grid item>
                <Link href="/user/join" variant="body2">
                  아직 계정이 없으신가요? <b>계정 만들기</b>
                </Link>
              </Grid>
            </Grid>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
