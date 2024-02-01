import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import authApi from "../apis/authApi";
import GoogleSignup from "./Signupgoogle";

const SignupVerifyform = () => {
  const [data, setData] = useState({
    uname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");

  const [Vdata, setVData] = useState({
    input: "",
  });

  function LoginClick() {
    const formContainer = document.querySelector(".form_container");
    formContainer.classList.remove("active1");
  }

  function LoginClick2() {
    const formContainer = document.querySelector(".form_container");
    formContainer.classList.remove("active2");
  }

  function VerifyClick() {
    const formContainer = document.querySelector(".form_container");
    formContainer.classList.remove("active1");
    formContainer.classList.add("active2");
  }

  const receive_otp = async () => {
    try {
      const res = await authApi.verify();
      setOtp(res?.otp);
    } catch (error) {
      console.error("Error in receive_otp:", error);
    }
  };

  const [message, setMessage] = useState({
    type: "error",
    text: "",
  });

  const [Vmessage, setVMessage] = useState({
    type: "success",
    text: "Otp sent to your mail",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data?.password.length < 8) {
      setMessage({
        type: "danger",
        text: "password should have atleast 8 characters",
      });
      return;
    }
    if (data?.password.match(/\d+/g) < 3) {
      setMessage({
        type: "danger",
        text: "password should have atleast 3 numbers",
      });
      return;
    }
    if (data?.password !== data?.confirmPassword) {
      setMessage({
        type: "danger",
        text: "passwords do not match",
      });
      return;
    }

    try {
      await authApi.register(data);

      setMessage({
        type: "success",
        text: "Success, please check your mail",
      });
    } catch (error) {
      setMessage({
        type: "danger",
        text: error?.response?.data?.msg,
      });
    }
    receive_otp();
    VerifyClick();
  };

  function formClose() {
    const home = document.querySelector("#home");
    home.classList.remove("show");
  }

  const VhandleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Vdata?.input === otp) {
        setVMessage({ type: "success", text: "Email succesfully verified" });
        LoginClick2();
      } else {
        setVMessage({ type: "danger", text: "Invalid otp" });
      }
    } catch (error) {
      setVMessage({ type: "danger", text: error?.response?.data?.msg });
      console.log(error);
    }
  };

  return (
    <div>
      <div className="form signup_form">
        <form className="signup_form" onSubmit={handleSubmit}>
          <div
            className="login_x"
            style={{
              display: "flex",
            }}
          >
            <h2
              style={{
                paddingLeft: "135px",
                paddingRight: "120px",
                color: "black",
              }}
            >
              Signup
            </h2>
            <a
              href="#"
              onClick={formClose}
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              x
            </a>
          </div>
          {message && message?.text && (
            <Alert variant={message?.type}>{message?.text}</Alert>
          )}
          <div className="input_box">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={data?.email}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <i className="uil uil-envelope-alt email"></i>
          </div>
          <div className="input_box">
            <input
              type="text"
              placeholder="Create Username"
              required
              value={data?.uname}
              onChange={(e) =>
                setData((prev) => ({ ...prev, uname: e.target.value }))
              }
            />
          </div>
          <div className="input_box">
            <input
              type="password"
              placeholder="Create password"
              required
              value={data?.password}
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div className="input_box">
            <input
              type="password"
              placeholder="Confirm password"
              required
              value={data?.confirmPassword}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </div>

          <button className="signup_button">Signup Now</button>

          <div className="login_signup">
            Already have an account?{" "}
            <a
              id="login"
              onClick={LoginClick}
              style={{ color: "blue" }}
              href="#"
            >
              {" "}
              Login
            </a>
          </div>

          <div className="line">
            <hr />
            <div className="or">or</div>
            <hr />
          </div>

          <GoogleSignup />
        </form>
      </div>
      <div className="form verify_form">
        <form className="verify_form" onSubmit={VhandleSubmit}>
          <div
            className="login_x"
            style={{
              display: "flex",
              paddingTop: "150px",
            }}
          >
            <h2
              style={{
                paddingLeft: "135px",
                paddingRight: "120px",
                paddingBottom: "20px",
                color: "black",
              }}
            >
              Verify
            </h2>
            <a
              href="#"
              onClick={formClose}
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              x
            </a>
          </div>
          {Vmessage && Vmessage?.text && (
            <Alert variant={Vmessage?.type}>{Vmessage?.text}</Alert>
          )}
          <div className="input_box">
            <input
              type="text"
              placeholder="Enter otp"
              required
              value={Vdata?.input}
              onChange={(e) =>
                setVData((prev) => ({ ...prev, input: e.target.value }))
              }
            />
          </div>

          <button className="login_button">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default SignupVerifyform;
