import React from "react";

const Checking = () => {
  const videoContainerStyle = {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  };

  const videoStyle = {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  };

  const contentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "#fff", // Set text color to be visible against the video
  };

  return (
    <div style={videoContainerStyle}>
      <video autoPlay muted loop style={videoStyle}>
        <source src="react-app\src\assets\background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={contentStyle}>
        <h1>Your React App Title</h1>
        <p>Welcome to your React app!</p>
      </div>
    </div>
  );
};

export default Checking;
