import Header from "./Header";
import Court1 from "./Court1";
import Court2 from "./Court2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";

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
      <Container sx={{ mt: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Court1 />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Court2 />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Main;
