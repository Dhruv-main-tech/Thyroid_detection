import React, { useState, useEffect } from "react";
import authApi from "../apis/authApi";
import Home from "../components/Home";
import LoadingSpinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const Workout = () => {
  const navigate = useNavigate();

  const [udata, setUdata] = useState({
    uname: "",
    email: "",
    height: "",
    age: "",
    weight: "",
    gender: "",
    condition: "",
  });

  const details = async () => {
    try {
      const res = await authApi.disp("");
      const user = {
        uname: res?.user?.uname,
        email: res?.user?.email,
        height: res?.user?.height,
        age: res?.user?.age,
        weight: res?.user?.weight,
        condition: res?.user?.condition,
        gender: res?.user?.gender,
      };
      return user;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return {};
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await details();
      setUdata(user);
    };

    fetchData();
  }, []);

  const [userdata, setUserdata] = useState("");

  const [textToRead, setTextToRead] = useState("");

  const [isSpeaking, setIsSpeaking] = useState(false);

  const [loading, setLoading] = useState(false);

  let utterance;

  const handleClick = async () => {
    if (udata?.condition !== "") {
      setLoading(true);

      const gender =
        udata.gender === "M"
          ? "male"
          : udata.gender === "F"
          ? "female"
          : "other";
      const condition =
        udata.condition === "NEGATIVE" ? "normal" : udata.condition;
      const user_prompt = `Generate a workout plan for a ${udata?.age} year old of gender ${gender} of height ${udata?.height} cm, weight ${udata?.weight} kgs of ${condition} condition within 1800 characters or less start with here is a workout plan for`;

      try {
        const res = await authApi.gpt({ user_prompt });
        setUserdata(res.data);
        setTextToRead(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRead = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const ReturnHome = () => {
    navigate("/logged");
  };

  return (
    <div className="home">
      <div
        className="form_container2"
        style={{ height: "540px", maxWidth: "800px" }}
      >
        <a
          href=""
          style={{
            color: "black",
            textDecoration: "none",
            paddingLeft: "700px",
          }}
          onClick={ReturnHome}
        >
          x
        </a>
        <div className="form profile_form">
          <div className="chatgpt">
            <div style={{ display: "flex" }}>
              <Home />
              <button className="pro_sub_btn" onClick={handleRead}>
                Read
              </button>
              <button className="pro_sub_btn" onClick={handleStop}>
                Stop
              </button>
            </div>
          </div>
          <div className="generate">
            <button
              className="pro_sub_btn"
              onClick={handleClick}
              style={{ marginTop: "0px" }}
            >
              Generate Workout Plan
            </button>
            <LoadingSpinner loading={loading} color={"#005599"} />
            <h6>{userdata}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;
