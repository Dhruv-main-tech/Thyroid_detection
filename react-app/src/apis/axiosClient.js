import axios from "axios";

const instance = axios.create({
  //baseURL: "https://thyroid-lab.onrender.com", //deployment
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(function (response) {
  return response?.data;
});

export default instance;
