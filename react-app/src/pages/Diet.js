import React, { useState, useEffect } from "react";
import authApi from "../apis/authApi";

const Diet = () => {
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
      const user_prompt = `Generate a diet plan for a ${udata?.age} year old of gender ${gender} of height ${udata?.height} cm, weight ${udata?.weight} kgs of ${condition} condition within 3000 characters or less`;

      try {
        const res = await authApi.gpt({ user_prompt });
        setUserdata(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>Generate diet</button>
        <h1 style={{ color: "black" }}>{userdata}</h1>
      </div>
    </div>
  );
};

export default Diet;
