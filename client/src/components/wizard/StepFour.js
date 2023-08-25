import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CardContent,
  Card,
} from "@mui/material";

const StepFour = ({ userInfo, setUserInfo }) => {
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, ack: e.target.checked });
  };

  return (
    <Card
      style={{
        backgroundColor: "#204e59",
        color: "#fff",
        marginTop: "5em",
        maxWidth: 700,
        padding: "3em",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" style={{ marginBottom: "1em" }}>
          Privacy Policy
        </Typography>
        <Typography
          component="div"
          sx={{
            width: "300px",
            height: "100px",
            borderRadius: ".4rem",
            p: 1,
            fontSize: "1rem",
            marginBottom: "3em",
          }}
        >
          We are responsible for maintaining and protecting the Personal
          Information under our control. We have designated an individual or
          individuals who is/are responsible for compliance with our privacy
          policy.
        </Typography>
        <br />
        <FormGroup>
          <FormControlLabel
            required
            control={
              <Checkbox checked={userInfo.ack} onChange={handleChange} />
            }
            label="I Agree"
          />
        </FormGroup>

        {userInfo.userInformationError && (
          <Typography component="p" color="error" sx={{ mt: 2 }}>
            {userInfo.userInformationError}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StepFour;
