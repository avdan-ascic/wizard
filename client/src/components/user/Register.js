import { useState, useEffect } from "react";
import {
  CardContent,
  Typography,
  Card,
  TextField,
  CardActions,
  Button,
  Icon,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { create } from "../../api/user-api";
import { makeStyles } from "@material-ui/core";

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

const Register = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    redirect: false,
  });
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    create(user)
      .then((data) => {
        if (data.errors && data.errors.length > 0) {
          const errorMessage = data.errors.map((error) => error.msg).join(", ");
          setValues({ ...values, error: errorMessage });
        } else {
          setValues({ ...values, redirect: true });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (values.redirect) navigate("/login");
    // eslint-disable-next-line
  }, [values.redirect]);

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Register
          </Typography>

          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />

          <br />
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
          <TextField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            margin="normal"
          />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                {values.error}
              </Icon>
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Register;
