import Header from "./Header";
import Court1 from "./Court1";
import Court2 from "./Court2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import Footer from "./Footer";

function Main() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#005cb8",
      },
      secondary: {
        main: "#051c48",
      },
      header: {
        main: "#808080",
      },
      icon: {
        main: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "'Noto Sans KR', sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container sx={{ mt: 10 }} align="center">
        <Grid container spacing={2}>
          <Grid item sm={6} xs={13}>
            <Court1 />
          </Grid>
          <Grid item sm={6} xs={13}>
            <Court2 />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default Main;
