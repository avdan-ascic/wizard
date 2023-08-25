import { useState, useEffect } from "react";
import {
  CardContent,
  Typography,
  Card,
  CardActions,
  Button,
  TextField,
} from "@material-ui/core";
import {  useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../api/user-api";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),

    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

const Login = ({ setIsLoggedin, setUser }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirect: false,
  });
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.email === "") {
      return setValues({ ...values, error: "Insert email !" });
    }
    if (values.password === "") {
      return setValues({ ...values, error: "Insert password !" });
    }
    const user = {
      email: values.email,
      password: values.password,
    };

    login(user)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            redirect: false,
            error: data.error,
          });
          setIsLoggedin(false);
        } else {
          setIsLoggedin(true);
          setUser({ name: data.user.name, email: data.user.email });
          setValues({ ...values, redirect: true, error: "" });
        }
      })
      .catch((err) => console.log(err));
  };

  // Redirect
  useEffect(() => {
    if (values.redirect) return navigate("/");
    // eslint-disable-next-line
  }, [values]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              {values.error}
            </Typography>
          )}
          <CardActions>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              className={classes.submit}
              style={{
                backgroundColor: "#204e59",
                color: "#fff",
              }}
            >
              Submit
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
