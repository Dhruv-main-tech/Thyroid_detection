import React from "react";

const L_Header = () => {
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
          <a href="/profile" className="login_text">
            <button className="main_button" style={{ color: "white" }}>
              Profile
            </button>
          </a>
        </nav>
      }
    </header>
  );
};

export default L_Header;
