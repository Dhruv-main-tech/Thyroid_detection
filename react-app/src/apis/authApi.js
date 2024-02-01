import axiosClient from "./axiosClient";
const authApi = {
  register: (data_s) => {
    return axiosClient.post("api/v1/auth/register", data_s);
  },
  verify:()=>{
    return axiosClient.get("api/v1/auth/verify");
  },
  login: (data_l) => {
    return axiosClient.post("api/v1/auth/login", data_l);
  },
  profile: (data_p) => {
    return axiosClient.post("api/v1/auth/profile", data_p);
  },
  disp: (d) => {
    return axiosClient.get("api/v1/auth/disp", d);
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
  logout: (data_o) => {
    return axiosClient.get("api/v1/auth/logout", data_o);
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
  access: () => {
    return axiosClient.get("api/v1/auth/access");
  },
  forgot: (data) => {
    return axiosClient.post("api/v1/auth/forgot", data);
  },
  gotp:()=>{
    return axiosClient.get("api/v1/auth/gotp");
  },
  
};
export default authApi;
