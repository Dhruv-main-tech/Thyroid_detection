import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage"
import Loggedin from "./pages/L_hpage";
import Diet from "./pages/Diet";
import Workout from "./pages/Workout";
import Test from "./pages/Test";
import Profile from "./pages/upProfile";
import UserProfile from "./pages/Profile";
import Update from "./pages/Update";
import Learn from "./pages/Learn";
import Forgot from "./pages/Forgot";
import Confirm from "./pages/Userconfirm";
import AccessDenied from "./pages/AccessDenied";

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
        <Route path="/confirm" element={<Confirm />}></Route>
        <Route path="/denied" element={<AccessDenied />}></Route>
      </Routes>
    </div>
  );
}

export default App;
