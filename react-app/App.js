import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./src/pages/Homepage";
import Loggedin from "./src/pages/L_hpage";
import Diet from "./src/pages/Diet";
import Workout from "./src/pages/Workout";
import Test from "./src/pages/Test";
import Profile from "./src/pages/upProfile";
import UserProfile from "./src/pages/Profile";
import Update from "./src/pages/Update";
import Learn from "./src/pages/Learn";
import Forgot from "./src/pages/Forgot";
import Checking from "./src/pages/Checking";
import Confirm from "./src/pages/Userconfirm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/logged" element={<Loggedin />}></Route>
        <Route path="/diet" element={<Diet />}></Route>
        <Route path="/workout" element={<Workout />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/upprofile" element={<Profile />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/update" element={<Update />}></Route>
        <Route path="/learn" element={<Learn />}></Route>
        <Route path="/forget" element={<Forgot />}></Route>
        <Route path="/check" element={<Checking />}></Route>
        <Route path="/confirm" element={<Confirm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
