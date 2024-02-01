import React, { useState, useEffect } from "react";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";

const Update = () => {
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

  const [data, setData] = useState({
    age: "",
    weight: "",
    height: "",
    uname: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.update(data);
      navigate("/logged");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home" style={{ padding: "50px" }}>
      <div className="form_container2" style={{ height: "530px" }}>
        <div className="form profile_form">
          <form className="profile_form" onSubmit={handleSubmit}>
            <div>
              <h4
                style={{
                  justifyContent: "center",
                  color: "black",
                }}
              >
                Update Profile
              </h4>
            </div>
            <div>
              <label
                style={{
                  display: "flex",
                  paddingLeft: "20px",
                  paddingBottom: "12px",
                }}
              >
                Username
              </label>
              <div className="pro_input_box">
                <input
                  type="text"
                  id="age"
                  placeholder={udata?.uname}
                  required
                  value={data?.uname}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, uname: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "flex",
                  paddingLeft: "20px",
                  paddingBottom: "12px",
                }}
              >
                Age
              </label>
              <div className="pro_input_box">
                <input
                  type="number"
                  id="age"
                  placeholder={udata?.age}
                  required
                  value={data?.age}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, age: e.target.value }))
                  }
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  paddingLeft: "20px",
                  paddingBottom: "12px",
                }}
              >
                Weight
              </label>
              <div className="pro_input_box">
                <input
                  type="decimal"
                  id="weight"
                  placeholder={udata?.weight}
                  required
                  value={data?.weight}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, weight: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "flex",
                  paddingLeft: "20px",
                  paddingBottom: "12px",
                }}
              >
                Height
              </label>
              <div className="pro_input_box">
                <input
                  type="decimal"
                  id="height"
                  placeholder={udata?.height}
                  required
                  value={data?.height}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, height: e.target.value }))
                  }
                />
              </div>
            </div>

            <button className="pro_sub_btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Update;
