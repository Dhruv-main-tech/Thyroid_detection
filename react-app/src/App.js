import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Profile from "./pages/upProfile";
import Update from "./pages/Update";
import Forgot from "./pages/Forgot";
import Confirm from "./pages/Userconfirm";
import Logged from "./pages/Logged";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/upprofile" element={<Profile />}></Route>
        <Route path="/update" element={<Update />}></Route>
        <Route path="/confirm" element={<Confirm />}></Route>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/logged" element={<Logged />}></Route>
      </Routes>
    </div>
  );
}

export default App;
