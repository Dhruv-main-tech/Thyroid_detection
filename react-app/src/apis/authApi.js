import axiosClient from "./axiosClient";
const authApi = {
  register: (data_s) => {
    return axiosClient.post("api/v1/auth/register", data_s);
  },
  verify: () => {
    return axiosClient.get("api/v1/auth/verify");
  },
  login: (data_l) => {
    return axiosClient.post("api/v1/auth/login", data_l);
  },
  update: (data_u) => {
    return axiosClient.post("api/v1/auth/update", data_u);
  },
  gpt: (data_g) => {
    return axiosClient.post("api/v1/auth/gpt", data_g);
  },
  learn: (data_f) => {
    return axiosClient.post("api/v1/auth/learn", data_f);
  },
  otp: () => {
    return axiosClient.post("api/v1/auth/otp");
  },
  reset: (data) => {
    return axiosClient.post("api/v1/auth/reset", data);
  },
  feedback: (data) => {
    return axiosClient.post("api/v1/auth/feedback", data);
  },
  googlesignup: (data) => {
    return axiosClient.post("api/v1/auth/googlesignup", data);
  },
  googlesignin: (data) => {
    return axiosClient.post("api/v1/auth/googlesignin", data);
  },
  forgot: (data) => {
    return axiosClient.post("api/v1/auth/forgot", data);
  },
  gotp: () => {
    return axiosClient.get("api/v1/auth/gotp");
  },
  profile: (data_p) => {
    return axiosClient.post("api/v1/auth/profile", data_p);
  },
};
export default authApi;
