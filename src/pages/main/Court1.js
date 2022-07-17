import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 400, ml: 6 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ maxHeight: { xs: 300, md: 400, lg: 500 } }}
          image="/images/court.png"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: { xs: 20, md: 25, lg: 30 } }}
          >
            농구장1
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: 10, md: 13, lg: 15 } }}
          >
            학교 본관을 등졌을 때 왼편에 위치한 농구장
          </Typography>
        </CardContent>
        <Box display="flex" sx={{ justifyContent: "flex-end" }}></Box>
      </CardActionArea>
    </Card>
  );
}
