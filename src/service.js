import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export default service;
