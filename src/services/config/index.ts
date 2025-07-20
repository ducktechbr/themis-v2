import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://app.sistemathemis.com//api/ws.0.0.1.php",
  headers: { "Content-Type": "multipart/form-data" },
});
