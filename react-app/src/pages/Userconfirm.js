import React, { useState } from "react";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Confirm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ user: "" });

  const [Message, setMessage] = useState({
    text: "",
    type: "",
  });

  const HandleClick = async () => {
    const res = await authApi.forgot(data);
    if (res?.success === true) {
      handleSubmit();
    } else {
      setMessage({
        text: res?.msg,
        type: "danger",
      });
    }
  };

  const handleSubmit = () => {
    const fc = document.querySelector(".mainpage");
    fc.classList.remove("active1");
    fc.classList.add("active2");
  };

  const ReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="home" style={{ padding: "50px" }}>
      <div className="form_container2" style={{ maxHeight: "280px" }}>
        <div className="form profile_form">
          <div className="profile_form">
            <div style={{ display: "flex" }}>
              <h4
                style={{
                  paddingLeft: "140px",
                  paddingRight: "130px",
                  color: "black",
                }}
              >
                Reset
              </h4>
              <a
                href=""
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
                onClick={ReturnHome}
              >
                x
              </a>
            </div>
            {Message && Message?.text && (
              <Alert variant={Message?.type}>{Message?.text}</Alert>
            )}
            <div className="pro_input_box">
              <input
                id="age"
                placeholder="Enter username"
                required
                value={data?.user}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, user: e.target.value }))
                }
              />
            </div>
            <button className="pro_sub_btn" onClick={HandleClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
