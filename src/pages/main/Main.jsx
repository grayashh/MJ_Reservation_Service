import Header from "../../components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import BackgroundVideo from "../../components/Background";
import Article from "../../components/Article";
import FadeIn from "react-fade-in/lib/FadeIn";

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
      <FadeIn>
        <Container disableGutters align="center">
          <Grid
            container
            spacing={2}
            alignContent="center"
            sx={{
              height: "100vh",
            }}
          >
            <Article />
          </Grid>
        </Container>
      </FadeIn>
      <BackgroundVideo />
    </ThemeProvider>
  );
}

export default Main;
