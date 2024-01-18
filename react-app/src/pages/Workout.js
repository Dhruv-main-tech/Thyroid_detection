import React, { useState, useEffect } from "react";
import authApi from "../apis/authApi";

const Workout = () => {
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

  const handleClick = async () => {
    if (udata?.condition !== "") {
      const gender =
        udata.gender === "M"
          ? "male"
          : udata.gender === "F"
          ? "female"
          : "other";
      const condition =
        udata.condition === "NEGATIVE" ? "normal" : udata.condition;
      const user_prompt = `Generate a workout plan for a ${udata?.age} year old of gender ${gender} of height ${udata?.height} cm, weight ${udata?.weight} kgs of ${condition} condition within 3000 characters or less`;

      try {
        console.log(user_prompt);
        const res = await authApi.gpt({ user_prompt });
        setUserdata(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="home">
      <div
        className="form_container2"
        style={{ height: "540px", maxWidth: "800px" }}
      >
        <div className="form profile_form">
          <div className="profile_form">
            <button
              className="pro_sub_btn"
              onClick={handleClick}
              style={{ marginTop: "0px" }}
            >
              Generate Workout Plan
            </button>
            <div>
              <h6>{userdata}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;
