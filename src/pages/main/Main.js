import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import BackgroundVideo from "./Background";
import Article from "./Article";

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
        main: "transparent",
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
      <Container
        // 부드러움의 차이
        // fixed="true"
        disableGutters
        align="center"
        sx={{ mt: 4 }}
      >
        <Grid
          container
          spacing={4}
          alignContent="center"
          style={{
            height: "100vh",
          }}
        >
          {/* <Grid item sm={6} xs={6}>
            <Court1 />
          </Grid>
          <Grid item sm={6} xs={6}>
            <Court2 />
          </Grid> */}
          <Article />
        </Grid>
      </Container>
      {/* <Footer /> */}
      <BackgroundVideo />
    </ThemeProvider>
  );
}

export default Main;
