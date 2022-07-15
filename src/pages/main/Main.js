import Header from "./Header";
import Article from "./Article";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
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
      <Box sx={{ m: 20 }}>
        <Grid>
          <Article />
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Main;
