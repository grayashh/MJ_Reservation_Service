import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import styled from "styled-components";
import { DateTimePicker, CounterInput, Select } from "react-rainbow-components";

import Calendar from "./Calendar";

// bottom Helper Text Style
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

export default React.memo(function AddressForm(props) {
  // 장소 data
  const options = [
    { value: "RIGHT", label: "오른쪽 농구장" },
    { value: "LEFT", label: "왼쪽 농구장" },
  ];

  // 장소 handle setState
  const handleOnSelect = (event) => {
    props.setArea(event.target.value);
  };

  return (
    <React.Fragment>
      {/* 제목 헤더 */}
      <Typography variant="h6" gutterBottom>
        예약 정보
      </Typography>

      {/* 예약 캘린더 */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Calendar />
        </Grid>

        {/* 예약 시작시간 선택 폼 */}
        <Grid item xs={6}>
          <DateTimePicker
            label="예약 시작시간"
            value={props.startValue}
            onChange={(newValue) => {
              props.setStartValue(newValue);
            }}
            minDate={new Date()}
            required
          />
        </Grid>

        {/* 예약 종료시간 선택 폼 */}
        <Grid item xs={6}>
          <DateTimePicker
            label="예약 종료시간"
            value={props.endValue}
            onChange={(newValue) => {
              props.setEndValue(newValue);
            }}
            minDate={props.startValue}
            required
          />
        </Grid>

        {/* 예약 인원 폼 */}
        <Grid item xs={12}>
          <CounterInput
            required
            id="headcount"
            label="예약 인원"
            labelAlignment="center"
            value={props.headCounter}
            onChange={props.setCounter}
            placeholder="최소 6인 이상 예약가능 합니다."
            min={6}
            max={30}
          ></CounterInput>
        </Grid>

        {/* 장소 선택 폼 */}
        <Grid item xs={12}>
          <Select
            label="장소를 선택하세요"
            required
            value={props.area}
            options={options}
            onChange={handleOnSelect}
          ></Select>
        </Grid>

        {/* 이름 입력 폼 */}
        <Grid item xs={12}>
          <TextField
            autoComplete="given-name"
            variant="standard"
            name="name"
            required
            fullWidth
            id="name"
            label="이름"
            value={props.name}
            onChange={(event) => props.setName(event.target.value)}
            autoFocus
            error={props.nameError !== "" || false}
          />
        </Grid>
        <FormHelperTexts>{props.nameError}</FormHelperTexts>

        {/* 전화번호 입력 폼 */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            variant="standard"
            id="phone"
            value={props.phone}
            onChange={(event) => props.setPhone(event.target.value)}
            label="전화번호 (010-XXXX-XXXX)"
            name="phone"
            autoComplete="phone"
            error={props.phoneError !== "" || false}
          />
        </Grid>
        <FormHelperTexts>{props.phoneError}</FormHelperTexts>
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
            value={props.password}
            onChange={(event) => props.setPassword(event.target.value)}
            autoComplete="new-password"
            error={props.passwordState !== "" || false}
          />
        </Grid>
        <FormHelperTexts>{props.passwordState}</FormHelperTexts>

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
            value={props.rePassword}
            onChange={(event) => props.setRePassword(event.target.value)}
            autoComplete="new-password"
            error={props.passwordError !== "" || false}
          />
        </Grid>
        <FormHelperTexts>{props.passwordError}</FormHelperTexts>
      </Grid>
    </React.Fragment>
  );
});
