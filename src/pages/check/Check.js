import { Grid, Container } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Button, Input } from "react-rainbow-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Check() {
  // 예약 비밀번호 확인 state
  const [value, setValue] = useState("");

  // 비밀번호 입력 handle
  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const navigate = useNavigate();

  // post Data
  const onhandlePost = async (data) => {
    const { value } = data;

    const postData = {
      value,
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
      value,
    };
    onhandlePost(Data);
  };

  return (
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
            label="예약 확인용 비밀번호를 입력하세요"
            type="password"
            onChange={handleOnChange}
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
  );
}
