import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [userinp, setuserinp] = useState("");

  useEffect(() => {
    const receive_otp = async () => {
      try {
        const res = await authApi.otp();
        setOtp(res?.otp);
      } catch (error) {
        console.error("Error in receive_otp:", error);
      }
    };
    receive_otp();
  }, []);

  const handleverify = () => {
    if (userinp === otp) {
      setMessage({
        text: "",
        type: "success",
      });
      const formContainer = document.querySelector(".form_container3");
      formContainer.classList.add("active1");
    } else {
      setMessage({
        text: "Invalid otp",
        type: "danger",
      });
    }
  };

  const handleSubmit = async () => {
    if (pass?.password !== pass?.confirm_password) {
      setMessage({
        text: "Passwords do not match",
        type: "danger",
      });
      return;
    }
    if (pass?.password.length < 8) {
      setMessage({
        text: "Password should have atleast 8 characters",
        type: "danger",
      });
      return;
    }
    if (pass?.password.match(/\d+/g) < 3) {
      setMessage({
        text: "Password should have atleast 3 digits",
        type: "danger",
      });
      return;
    }
    try {
      authApi.reset(pass);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [Message, setMessage] = useState({
    text: "Please check your mail",
    type: "success",
  });

  const [pass, setpass] = useState({
    password: "",
    confirm_password: "",
  });

  return (
    <div className="home" style={{ padding: "50px" }}>
      <div
        className="form_container3"
        style={{ maxWidth: "520px", height: "auto" }}
      >
        <div className="otp_form">
          {Message && Message?.text && (
            <Alert variant={Message?.type}>{Message?.text}</Alert>
          )}
          <div className="input_box">
            <input
              type="text"
              placeholder="Enter otp"
              required
              value={userinp}
              onChange={(e) => setuserinp(e.target.value)}
            ></input>
          </div>
          <button className="pro_sub_btn" onClick={handleverify}>
            Verify
          </button>
        </div>
        <div
          className="reset_form"
          style={{ color: "black", marginTop: "10px" }}
        >
          <h3 style={{ color: "black", paddingTop: "10px" }}>Reset password</h3>
          {Message && Message?.text && (
            <Alert variant={Message?.type}>{Message?.text}</Alert>
          )}

          <div className="input_box">
            <input
              type="password"
              placeholder="Enter new password"
              required
              value={pass?.password}
              onChange={(e) =>
                setpass((prev) => ({ ...prev, password: e.target.value }))
              }
            ></input>
          </div>
          <div className="input_box">
            <input
              type="password"
              placeholder="Confirm password"
              required
              value={pass?.confirm_password}
              onChange={(e) =>
                setpass((prev) => ({
                  ...prev,
                  confirm_password: e.target.value,
                }))
              }
            ></input>
          </div>
          <button className="pro_sub_btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
