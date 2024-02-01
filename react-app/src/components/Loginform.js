import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";
import GoogleSignin from "./Signingoogle";

const Loginform = () => {
  const navigate = useNavigate();

  function formClose() {
    const home = document.querySelector("#home");
    home.classList.remove("show");
  }

  function SignupClick() {
    const formContainer = document.querySelector(".form_container");
    formContainer.classList.add("active1");
  }

  const [data, setData] = useState({
    uname: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "error",
    text: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.login(data);
      if (res?.check !== " ") {
        navigate("/logged");
      } else {
        navigate("/upprofile");
      }
      setMessage({ type: "success", text: "Success" });
    } catch (error) {
      setMessage({ type: "danger", text: error?.response?.data?.msg });
      console.log(error);
    }
  };

  const HandleForgot = () => {
    const fc = document.querySelector(".mainpage");
    fc.classList.add("active1");
  };

  return (
    <div className="form login_form">
      <form className="login_form" onSubmit={handleSubmit}>
        <div
          className="login_x"
          style={{
            display: "flex",
            paddingTop: "80px",
          }}
        >
          <h2
            style={{
              paddingLeft: "135px",
              paddingRight: "120px",
              color: "black",
            }}
          >
            Login
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
            type="text"
            placeholder="Enter your username"
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
            placeholder="Enter your password"
            required
            value={data?.password}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <div className="option_field">
          <a className="forgot_pw" href="#" onClick={HandleForgot}>
            Forgot password
          </a>
        </div>

        <button className="login_button" id="123">
          Login Now
        </button>

        <div className="login_signup">
          Don't have an account?
          <a
            id="signup"
            onClick={SignupClick}
            style={{ color: "blue" }}
            href="#"
          >
            Signup
          </a>
        </div>

        <div className="line">
          <hr />
          <div className="or">or</div>
          <hr />
        </div>

        <GoogleSignin />
      </form>
    </div>
  );
};

export default Loginform;
