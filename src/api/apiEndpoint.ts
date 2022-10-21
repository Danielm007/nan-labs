import axios from "axios";
// Created this file in case we need to call this api more times
export const apiEndpoint = axios.create({
  baseURL: "https://countriesnow.space/api/v0.1",
});
