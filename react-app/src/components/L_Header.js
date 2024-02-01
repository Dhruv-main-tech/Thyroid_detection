import React from "react";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";

const LoggedHeader = () => {
  const navigate = useNavigate();

  const ProfileClick = () => {
    navigate("/profile");
  };
  const HandleClick = async () => {
    const status = await authApi.logout("");
    console.log(status);
  };

  return (
    <header className="header">
      {
        <nav className="nav">
          <a href="/" className="nav_logo"></a>
          <ul className="nav_items">
            <li className="nav_item">
              <a href="#services" className="nav_link">
                Services
              </a>
              <a href="#contact" className="nav_link">
                Contact
              </a>
            </li>
          </ul>
          <div>
            <a className="login_text" style={{ paddingRight: "5px" }}>
              <button
                className="main_button"
                style={{ color: "white" }}
                onClick={ProfileClick}
              >
                Profile
              </button>
            </a>
            <a href="/" className="login_text" style={{ paddingLeft: "5px" }}>
              <button
                className="main_button"
                style={{ color: "white" }}
                onClick={HandleClick}
              >
                Logout
              </button>
            </a>
          </div>
        </nav>
      }
    </header>
  );
};

export default LoggedHeader;
