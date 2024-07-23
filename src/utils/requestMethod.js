import axios from "axios";
import { BASE_URL } from "./config";

let authToken = JSON.parse(sessionStorage.getItem("authToken"));

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const adminRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${authToken}` },
});

export const updateAuthToken = () => {
  authToken = JSON.parse(sessionStorage.getItem("authToken"));
  adminRequest.defaults.headers["Authorization"] = `Bearer ${authToken}`;
};

updateAuthToken();
