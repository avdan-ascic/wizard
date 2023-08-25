import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Box,
  CardActions,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import { remove } from "../../api/userInformation-api";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: "#204e59",
  },
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#3f4771",
    },
  },
  error: {
    verticalAlign: "middle",
    marginLeft: "1.5em",
  },
}));

const Home = ({
  isLoggedin,
  logoutMsg,
  user,
  wizardData,
  setWizardData,
  setUpdateData,
}) => {
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const classes = useStyles();

  const handleCloseDialog = () => {
    setShowModal(false);
  };

  const handleDeleteWizard = () => {
    remove({
      userInfoId: wizardData.userInfo._id,
      carId: wizardData.car._id,
    })
      .then(() => {
        setWizardData();
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (logoutMsg) {
      setShowLogoutMsg(true);
      const timeout = setTimeout(() => {
        setShowLogoutMsg(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [logoutMsg]);

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h3" className={classes.title}>
            Wizard
          </Typography>
          {showLogoutMsg && !isLoggedin && (
            <Typography component="p" color="error">
              {logoutMsg}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {!isLoggedin ? (
            <>
              <Link to="/register">
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#204e59",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#204e59",
                      borderColor: "#204e59",
                    },
                  }}
                >
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#204e59",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#204e59",
                      borderColor: "#204e59",
                    },
                    marginLeft: "3em",
                  }}
                >
                  Login
                </Button>
              </Link>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Welcome {user.name} </Typography>

              {wizardData ? (
                <Box sx={{ marginTop: "3em" }}>
                  <Link to="/wizard">
                    <Button
                      variant="outlined"
                      sx={{
                        mr: 2,
                        backgroundColor: "#204e59",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#fff",
                          color: "#204e59",
                          borderColor: "#204e59",
                        },
                      }}
                      onClick={() => setUpdateData(true)}
                    >
                      Edit Wizard
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    sx={{
                      mr: 2,
                      backgroundColor: "red",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#204e59",
                        borderColor: "#204e59",
                      },
                    }}
                    color="error"
                    onClick={() => setShowModal(true)}
                  >
                    Delete Wizard
                  </Button>
                </Box>
              ) : (
                <Link to="/wizard">
                  <Button
                    variant="outlined"
                    sx={{
                      marginTop: 3,
                      backgroundColor: "#204e59",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#204e59",
                        borderColor: "#204e59",
                      },
                    }}
                    onClick={() => setUpdateData(false)}
                  >
                    Start Wizard
                  </Button>
                </Link>
              )}
            </Box>
          )}
        </CardActions>
      </Card>
      <Dialog
        open={showModal}
        onClose={handleCloseDialog}
        aria-labelledby="delete-wizard-title"
        aria-describedby="delete-wizard-desc"
      >
        <DialogTitle id="delete-wizard-title">Delete Wizard Data</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-wizard-desc">
            Are you sure you want to delete your wizard data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button onClick={handleDeleteWizard} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
