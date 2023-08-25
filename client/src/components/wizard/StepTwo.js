import { useEffect } from "react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const StepTwo = ({ userInfo, setUserInfo, countries }) => {
  useEffect(() => {
    if (userInfo.phoneNumber.length > 5) return;
    for (let country of countries) {
      if (country.name.common === userInfo.country) {
        setUserInfo({
          ...userInfo,
          phoneNumber: country.idd.root[1] + country.idd.suffixes[0],
        });
      }
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (event) => {
    setUserInfo({ ...userInfo, [name]: event.target.value });
  };
  const handleChangeGender = (e) => {
    setUserInfo({ ...userInfo, gender: e.target.value });
  };

  const maxDate = dayjs().set("year", 2015);

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
          id="phoneNumber"
          label="Phone Number"
          type="number"
          value={userInfo.phoneNumber}
          onChange={handleChange("phoneNumber")}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            style: { color: "white" },
          }}
          sx={{ width: 300 }}
        />
        <br />
        <Box sx={{ minWidth: 200, marginTop: "1.35em" }}>
          <div className="custom">
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="select-gender">Gender</InputLabel>
              <Select
                labelId="select-gender"
                defaultValue={""}
                value={userInfo.gender ? userInfo.gender : ""}
                label="Gender"
                onChange={handleChangeGender}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="custom">
            <DatePicker
              label="Date of Birth"
              value={userInfo.dateOfBirth}
              onChange={(newValue) =>
                setUserInfo({
                  ...userInfo,
                  dateOfBirth: newValue,
                })
              }
              maxDate={maxDate}
              sx={{ width: 300 }}
            />
          </div>
        </LocalizationProvider>
        <br />
        <TextField
          id="addInfo"
          label="Additional information"
          value={userInfo.addInfo}
          onChange={handleChange("addInfo")}
          multiline
          rows={4}
          sx={{ margin: "1rem", width: "300px" }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <br />

        {userInfo.userInformationError && (
          <Typography component="p" color="error" sx={{ mt: 2 }}>
            {userInfo.userInformationError}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StepTwo;
