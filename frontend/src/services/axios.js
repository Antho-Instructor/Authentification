import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
});

export const instanceAuth = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

export default instance;
