import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const pages = [
  { label: "내 예약 확인", value: "/check" },
  { label: "문의사항", value: "/contact" },
];

const Header = () => {
  //  Menu Opne, close state
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar color="header" elevation="false">
      <Container maxWidth="x">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* 메뉴 버튼 for mobile */}
          <Box
            sx={{
              display: {
                xs: "flex",
                sm: "none",
                justifyContent: "flex-start",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="icon"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              {pages.map((page) => (
                <a
                  key={page.label}
                  href={page.value}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                </a>
              ))}
            </Menu>
          </Box>

          {/* 로고 */}
          <IconButton href="/">
            <Box
              component="img"
              sx={{
                width: 50,
              }}
              src="/images/Logo.gif"
            />
          </IconButton>

          {/* 메뉴 버튼 for desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "flex",
                justifyContent: "flex-end",
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mr: 1, color: "white", display: "block" }}
                href={page.value}
              >
                <Typography variant="h7">{page.label}</Typography>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
