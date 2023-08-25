import { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  Button,
  Typography,
  StepLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { create, update } from "../../api/userInformation-api";

const steps = [
  "User Information",
  "Additional User Information",
  "Car Information",
  "Privacy Information",
];

const Wizard = ({
  user,
  countries,
  countryNames,
  wizardData,
  setWizardData,
  updateData,
  isLoggedin,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phoneNumber: "",
    dateOfBirth: null,
    addInfo: "",
    ack: false,
    userInformationError: "",
  });
  const [carInfo, setCarInfo] = useState({
    make: "",
    model: "",
    year: "",
    regPlate: "",
    carError: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedin) return navigate("/");
    // eslint-disable-next-line
  }, [isLoggedin]);

  useEffect(() => {
    if (wizardData) {
      setUserInfo({
        firstName: wizardData.userInfo.firstName,
        lastName: wizardData.userInfo.lastName,
        country: wizardData.userInfo.country,
        phoneNumber: wizardData.userInfo.phoneNumber,
        gender: wizardData.userInfo.gender,
        dateOfBirth: dayjs(wizardData.userInfo.dateOfBirth),
        addInfo: wizardData.userInfo.addInfo,
        ack: wizardData.userInfo.ack,
        id: wizardData.userInfo._id,
      });
      setCarInfo({
        make: wizardData.car.make,
        model: wizardData.car.model,
        year: wizardData.car.year,
        regPlate: wizardData.car.regPlate,
        id: wizardData.car._id,
      });
    }
  }, [wizardData]);

  const handleNext = () => {
    let alphabetRegex = /^[A-Za-z ]+$/;
    if (activeStep === 0) {
      let error = "";
      if (!userInfo.firstName) error += "Insert First Name. ";
      if (!alphabetRegex.test(userInfo.firstName))
        error += "Only letters allowed.";
      if (!userInfo.lastName) error += " Insert Last Name. ";
      if (!alphabetRegex.test(userInfo.lastName))
        error += "Only letters allowed ";
      if (!userInfo.country) error += "Pick a Country. ";

      if (error)
        return setUserInfo({ ...userInfo, userInformationError: error });
      else setUserInfo({ ...userInfo, userInformationError: "" });
    } else if (activeStep === 1) {
      let error = "";
      if (userInfo.phoneNumber.length < 5) error += "Insert Phone Number. ";
      if (alphabetRegex.test(userInfo.phoneNumber))
        error += "Only letters allowed. ";
      if (!userInfo.gender) error += "Pick a Gender. ";
      if (!userInfo.dateOfBirth) error += "Insert Date of Birth. ";

      if (error)
        return setUserInfo({ ...userInfo, userInformationError: error });
      else setUserInfo({ ...userInfo, userInformationError: "" });
    } else if (activeStep === 2) {
      let error = "";
      if (!carInfo.make) error += "Pick a Make. ";
      if (!carInfo.model) error += "Insert Model. ";
      if (!carInfo.year) error += " Insert a Year. ";
      if (carInfo.year.length > 4) error += " Only four numbers allowed ";
      if (!carInfo.regPlate) error += "Insert Registration Plate. ";
      if (carInfo.regPlate > 10) error += "Max 10 characters. ";

      if (error) return setCarInfo({ ...carInfo, carError: error });
      else setCarInfo({ ...carInfo, carError: "" });
    } else if (activeStep === 3) {
      if (!userInfo.ack)
        return setUserInfo({
          ...userInfo,
          userInformationError: "Privacy policy agreement required. ",
        });
      else setUserInfo({ ...userInfo, userInformationError: "" });
    }

    if (activeStep !== 3) setActiveStep(activeStep + 1);
    else {
      setUserInfo({ ...userInfo, email: user.email });
      if (updateData) {
        update({ userInfo: userInfo, car: carInfo })
          .then((data) => {
            if (data?.response?.data?.error)
              setUserInfo({
                ...userInfo,
                userInformationError: data.response.data.error,
              });
            else {
              setUserInfo({ ...userInfo, userInformationError: "" });
              setWizardData({ userInfo: userInfo, car: carInfo });
              navigate("/");
            }
          })
          .catch((err) => console.log(err));
      } else {
        create({ userInfo: userInfo, car: carInfo })
          .then((data) => {
            if (data?.response?.data?.error)
              setUserInfo({
                ...userInfo,
                userInformationError: data.response.data.error,
              });
            else {
              setUserInfo({
                ...userInfo,
                userInformationError: "",
                id: data.userInfo._id,
              });
              setCarInfo({ ...carInfo, id: data.car._id });
              setWizardData(data);
              navigate("/");
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>
                  <Typography
                    variant="body2"
                    style={{ color: "#204e59", fontSize: "1.25em" }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === 0 && (
          <StepOne
            user={user}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            countryNames={countryNames}
          />
        )}
        {activeStep === 1 && (
          <StepTwo
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            countries={countries}
          />
        )}
        {activeStep === 2 && (
          <StepThree carInfo={carInfo} setCarInfo={setCarInfo} />
        )}
        {activeStep === 3 && (
          <StepFour userInfo={userInfo} setUserInfo={setUserInfo} />
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 2,
            marginTop: "1em",
          }}
        >
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{
              mr: 6,
              "&:disabled": { color: "#788bad" },
              backgroundColor: "#204e59",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#204e59",
                borderColor: "#204e59",
              },
            }}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
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
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Wizard;
