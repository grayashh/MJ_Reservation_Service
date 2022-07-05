import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function NotFound() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#005cb8",
      },
      secondary: {
        main: "#051c48",
      },
    },
    typography: {
      fontFamily: "'Noto Sans KR', sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h1" align="center">
            404
          </Typography>
          <Typography component="h1" variant="h5" align="center">
            Not Found
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large"
            href="/main"
          >
            홈으로 돌아가기
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default NotFound;
