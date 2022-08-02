import { Grid, Container } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Application, Button, Input } from "react-rainbow-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Check() {
  const theme = {
    rainbow: {
      palette: {
        brand: "#005cb8",
      },
    },
  };

  // 예약 비밀번호 확인 state
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // 이름 입력 handle
  const handleOnName = (event) => {
    setName(event.target.value);
  };

  // 비밀번호 입력 handle
  const handleOnPassword = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  // post Data
  const onhandlePost = async (data) => {
    const { name, password } = data;

    const postData = {
      name,
      password,
    };

    console.log(postData);

    await axios
      .post("/reservation/check", { postData })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "조회 성공",
          showConfirmButton: false,
          timer: 1000,
        });
        // 성공시 navigate
        navigate("/my/reservation");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          iconColor: "#d32f2f",
          title: "조회 실패",
          text: "다시 시도해주세요",
          confirmButtonColor: "#005cb8",
        });
      });
  };

  // submit 버튼 handle
  const handleSubmit = (event) => {
    event.preventDefault();

    const Data = {
      name,
      password,
    };
    onhandlePost(Data);
  };

  return (
    <Application theme={theme}>
      <Container component="main" maxWidth="xs">
        <Grid
          container
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
          spacing={1}
        >
          <Grid item xs={12}>
            <Input
              id="name"
              label="이름을 입력하세요"
              type="name"
              onChange={handleOnName}
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              id="password"
              label="예약 확인용 비밀번호를 입력하세요"
              type="password"
              onChange={handleOnPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              shaded
              type="submit"
              variant="brand"
              label="제출"
              onClick={(event) => handleSubmit(event)}
            />
          </Grid>
        </Grid>
      </Container>
    </Application>
  );
}
