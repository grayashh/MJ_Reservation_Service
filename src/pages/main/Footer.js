import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";

const Footer = () => (
  <Grid container position="static" sx={{ mt: 10 }}>
    <AppBar position="static" elevation={0} component="footer" color="default">
      <Toolbar style={{ justifyContent: "flex-end" }}>
        <Typography variant="caption">©2022 Copyright</Typography>
      </Toolbar>
    </AppBar>
  </Grid>
);

export default Footer;
