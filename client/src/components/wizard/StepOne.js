import {
  CardContent,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Card,
  TextField,
} from "@mui/material";

const StepOne = ({ user, userInfo, setUserInfo, countryNames }) => {

  const handleChange = (name) => (event) => {
    setUserInfo({ ...userInfo, [name]: event.target.value });
  };
  const handleChangeCountry = (e) => {
    setUserInfo({ ...userInfo, country: e.target.value });
  };

  return (
    <Card
      sx={{
        marginTop: "2em",
        maxWidth: "600px",
        textAlign: "center",
        backgroundColor: "#204e59",
        padding: "2.5em",
      }}
    >
      <CardContent>
        <TextField
          required
          id="firstName"
          label="First Name"
          value={userInfo.firstName}
          onChange={handleChange("firstName")}
          sx={{ margin: "1rem", width: "300px" }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <br />
        <TextField
          required
          id="lastName"
          label="Last Name"
          value={userInfo.lastName}
          onChange={handleChange("lastName")}
          sx={{ margin: "1rem", width: "300px" }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <br />
        <TextField
          disabled
          value={user.email}
          sx={{ margin: "1rem", width: "300px" }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <br />
        <Box sx={{ minWidth: 200 }}>
          <div className="custom">
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="select-country">Country</InputLabel>
              <Select
                labelId="select-country"
                required
                defaultValue={""}
                value={userInfo.country ? userInfo.country : ""}
                label="Country"
                onChange={handleChangeCountry}
              >
                {countryNames.map((ctry, index) => {
                  return (
                    <MenuItem key={index} value={ctry}>
                      {ctry}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </Box>

        {userInfo.userInformationError && (
          <Typography component="p" color="error" sx={{marginTop:"1em"}}>
            {userInfo.userInformationError}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StepOne;
