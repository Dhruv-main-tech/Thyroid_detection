import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";

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
          <span className="checkbox">
            <input type="checkbox" id="check" />
            <label htmlFor="check">Remember me</label>
          </span>
          <a className="forgot_pw">Forgot password</a>
        </div>

        <button className="login_button" id="123">
          Login Now
        </button>

        <div className="login_signup">
          Don't have an account?{" "}
          <a href="#" id="signup" onClick={SignupClick}>
            Signup
          </a>
        </div>

        <div className="line">
          <hr />
          <div className="or">or</div>
          <hr />
        </div>

        <button
          className="google"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              height: "30px",
              width: "30px",
              backgroundSize: "cover",
              marginRight: "10px",
            }}
            alt="Google Logo"
          />
          <span className="google_text">Continue with Google</span>
        </button>
      </form>
    </div>
  );
};

export default Loginform;
