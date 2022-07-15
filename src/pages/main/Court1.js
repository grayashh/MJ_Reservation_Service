import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { display } from "@mui/system";

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia component="img" height="550" image="/images/court.png" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          농구장1
        </Typography>
        <Typography variant="body2" color="text.secondary">
          학교 본관을 등졌을 때 왼편에 위치한 농구장
        </Typography>
      </CardContent>
      <Box display="flex" sx={{ justifyContent: "flex-end" }}>
        <CardActions>
          <Button size="large">예약하기</Button>
        </CardActions>
      </Box>
    </Card>
  );
}
