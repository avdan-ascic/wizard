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

import { carMakes } from "../../helpers/carMakes";

const StepThree = ({ carInfo, setCarInfo }) => {

  const handleChange = (name) => (event) => {
    setCarInfo({ ...carInfo, [name]: event.target.value });
  };
  const handleChangeMake = (e) => {
    setCarInfo({ ...carInfo, make: e.target.value });
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
        <Box sx={{ minWidth: 200 }}>
          <div className="custom">
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="select-car-make">Make</InputLabel>
              <Select
                labelId="select-car-make"
                defaultValue={""}
                value={carInfo.make ? carInfo.make : ""}
                label="Car Make"
                onChange={handleChangeMake}
              >
                {carMakes.map((make, index) => {
                  return (
                    <MenuItem key={index} value={make}>
                      {make}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </Box>
        <br />
        <TextField
          id="model"
          label="Model"
          value={carInfo.model}
          onChange={handleChange("model")}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            style: { color: "white" },
          }}
          sx={{ width: 300, marginBottom: "1.35em" }}
        />
        <br />
        <TextField
          id="year"
          label="Year"
          type="number"
          value={carInfo.year}
          onChange={handleChange("year")}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          sx={{ width: 300, marginBottom: "1.35em" }}
        />
        <br />
        <TextField
          id="regPlate"
          label="Registration plate"
          value={carInfo.regPlate}
          onChange={handleChange("regPlate")}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            style: { color: "white" },
          }}
          sx={{ width: 300 }}
        />
        <br />

        {carInfo.carError && (
          <Typography component="p" color="error" sx={{ mt: 2 }}>
            {carInfo.carError}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StepThree;
