import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";
import styled from "styled-components";
import { DateTimePicker, CounterInput } from "react-rainbow-components";

import Calendar from "./Calendar";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

export default function AddressForm(props) {
  const [onhandlePost, setOnHandlePost] = useState(false);

  const [startValue, setStartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());
  const [headCounter, setCounter] = useState();

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //form 전송
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const userData = {
      name: data.get("name"),
      phone: data.get("phone"),
      password: data.get("password"),
      rePassword: data.get("rePassword"),
    };
    const { name, phone, password, rePassword } = userData;
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

    // 비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordState("영문자+숫자 조합으로 8자리 이상 입력해주세요.");
    else setPasswordState("");

    // 비밀번호 같은지 체크
    if (password !== rePassword)
      setPasswordError("비밀번호가 일치하지 않습니다.");
    else setPasswordError("");

    // 모두 통과하면 post되는 코드 실행
    if (
      nameRegex.test(name) &&
      phoneRegex.test(phone) &&
      passwordRegex.test(password) &&
      password === rePassword
    ) {
      setOnHandlePost();
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        예약 정보
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Calendar />
        </Grid>
        <Grid item xs={6}>
          <DateTimePicker
            label="예약 시작시간"
            value={startValue}
            onChange={(newValue) => {
              setStartValue(newValue);
            }}
            minDate={new Date()}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <DateTimePicker
            label="예약 종료시간"
            value={endValue}
            onChange={(newValue) => {
              setEndValue(newValue);
            }}
            minDate={startValue}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CounterInput
            id="headcount"
            label="예약 인원"
            labelAlignment="center"
            value={headCounter}
            onChange={setCounter}
            placeholder="최소 10인 이상 예약가능 합니다."
            min={10}
            max={30}
          ></CounterInput>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="given-name"
            variant="standard"
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
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            variant="standard"
            id="phone"
            label="전화번호(010-XXXX-XXXX)"
            name="phone"
            autoComplete="phone"
            error={phoneError !== "" || false}
          />
        </Grid>
        <FormHelperTexts>{phoneError}</FormHelperTexts>
        {/* 비밀번호 입력 폼 */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            variant="standard"
            name="password"
            label="예약 확인용 비밀번호 (영문자+숫자 8자리 이상)"
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
            variant="standard"
            name="rePassword"
            label="비밀번호 재입력"
            type="password"
            id="rePassword"
            autoComplete="new-password"
            error={passwordError !== "" || false}
          />
        </Grid>
        <FormHelperTexts>{passwordError}</FormHelperTexts>
      </Grid>
    </React.Fragment>
  );
}
