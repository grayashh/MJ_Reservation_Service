import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";

const Footer = () => (
  <Grid container>
    <AppBar
      position="static"
      elevation={0}
      component="footer"
      color="default"
      style={{
        width: "100%",
        position: "absolute",
        bottom: "0",
        left: "0",
      }}
    >
      <Toolbar style={{ justifyContent: "flex-end" }}>
        <Typography variant="caption">©2022 Copyright</Typography>
      </Toolbar>
    </AppBar>
  </Grid>
);

export default Footer;
