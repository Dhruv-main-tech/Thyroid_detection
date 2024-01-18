import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/logged");
  };

  return (
    <button className="pro_sub_btn" onClick={handleSubmit}>
      Home
    </button>
  );
};

export default Home;
