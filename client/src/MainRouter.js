import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/core/Home";
import Header from "./components/core/Header";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Wizard from "./components/wizard/Wizard";
import { read, readCountries } from "./api/userInformation-api";

const MainRouter = () => {
  const [isLoggedin, setIsLoggedin] = useState(() => {
    const storedIsLoggedin = sessionStorage.getItem("isLoggedIn");
    return storedIsLoggedin ? JSON.parse(storedIsLoggedin) : false;
  });
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { name: "", email: "" };
  });
  const [logoutMsg, setLogoutMsg] = useState("");
  const [wizardData, setWizardData] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryNames, setCountryNames] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedin));
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [isLoggedin, user]);

  useEffect(() => {
    if (isLoggedin) {
      read()
        .then((data) => {
          if (data.message === "User information was not found!") {
            setWizardData(null);
            return;
          }
          setWizardData(data);
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, [isLoggedin]);

  useEffect(() => {
    readCountries()
      .then((data) => setCountries(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      let tempArray = [];
      for (const country of countries) {
        tempArray.push(country.name.common);
      }
      tempArray.sort();
      setCountryNames(tempArray);
    }
  }, [countries]);

  return (
    <>
      <Header
        isLoggedin={isLoggedin}
        setIsLoggedin={setIsLoggedin}
        setLogoutMsg={setLogoutMsg}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoggedin={isLoggedin}
              setIsLoggedin={setIsLoggedin}
              logoutMsg={logoutMsg}
              user={user}
              wizardData={wizardData}
              setWizardData={setWizardData}
              setUpdateData={setUpdateData}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedin={setIsLoggedin} setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/wizard"
          element={
            <Wizard
              user={user}
              countries={countries}
              countryNames={countryNames}
              wizardData={wizardData}
              updateData={updateData}
              setWizardData={setWizardData}
              isLoggedin={isLoggedin}
            />
          }
        />
      </Routes>
    </>
  );
};

export default MainRouter;
