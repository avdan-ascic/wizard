import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  withCredentials: true,
  credentials: "include",
};

export const create = async (data) => {
  try {
    const response = await axios
      .post(`${baseUrl.server}/api/userInfo/create`, data, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const read = async () => {
  try {
    const response = await axios
      .get(`${baseUrl.server}/api/userInfo/read`, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const update = async (data) => {
  try {
    const response = await axios
      .put(`${baseUrl.server}/api/userInfo/update`, data, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const remove = async (data) => {
  try {
    const response = await axios
      .post(`${baseUrl.server}/api/userInfo/remove`, data, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const readCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all", {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
