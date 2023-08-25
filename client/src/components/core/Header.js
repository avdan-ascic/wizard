import { useEffect } from "react";

import { Typography, AppBar, Toolbar, Button } from "@mui/material";
import { logout } from "../../api/user-api";

const Header = ({ isLoggedin, setIsLoggedin, setLogoutMsg }) => {
  const handleLogout = () => {
    logout()
      .then((data) => {
        setLogoutMsg(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoggedin(false);
  };

  let sessionTimer;

  const startSessionTimer = () => {
    sessionTimer = setTimeout(handleLogout, 10 * 60 * 1000);
  };
  const resetSessionTimer = () => {
    clearTimeout(sessionTimer);
    startSessionTimer();
  };
  document.addEventListener("click", resetSessionTimer);
  document.addEventListener("keydown", resetSessionTimer);

  useEffect(() => {
    if (isLoggedin) {
      if (!sessionTimer) startSessionTimer();
      else resetSessionTimer();
    }
    // eslint-disable-next-line
  }, [isLoggedin]);
  return (
    <AppBar position="static" style={{ backgroundColor: "#204e59" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h4" color="white">
          Wizard
        </Typography>
        {isLoggedin && (
          <span>
            <Button
              variant="outlined"
              style={{ color: "#ffff", borderColor: "#ffff" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
