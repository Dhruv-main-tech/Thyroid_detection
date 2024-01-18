import React from "react";

function openForm() {
    const home = document.querySelector("#home");
    home.classList.add("show");
  }
  

const Header = () => {
  return (
    <header className="header">
      {
        <nav className="nav">
          <a href="/" className="nav_logo"></a>
          <ul className="nav_items">
            <li className="nav_item">
              <a href="#home" className="nav_link">
                Home
              </a>
              <a href="#services" className="nav_link">
                Services
              </a>
              <a href="#contact" className="nav_link">
                Contact
              </a>
            </li>
          </ul>
          <a href="#home" className="login_text">
            <button
              className="main_button"
              id="form-open"
              onClick={openForm}
              style={{ color: "white" }}
            >
              Login
            </button>
          </a>
        </nav>
      }
    </header>
  );
};

export default Header;
