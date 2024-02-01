import React, { useState } from "react";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authApi.profile(data);
      navigate("/logged");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home" style={{ padding: "50px" }}>
      <div className="form_container2">
        <div className="form profile_form">
          <form className="profile_form" onSubmit={handleSubmit}>
            <div>
              <h4
                style={{
                  justifyContent: "center",
                  color: "black",
                }}
              >
                Finish Updating Profile
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
                Age
              </label>
              <div className="pro_input_box">
                <input
                  type="number"
                  id="age"
                  placeholder="Enter age"
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
                Gender
              </label>
            </div>
            <div
              className="gender-selection"
              style={{
                alignItems: "center",
                display: "flex",
              }}
              required
            >
              <div
                className="gender-option"
                style={{ paddingLeft: "20px", marginBottom: "20px" }}
              >
                <input
                  type="radio"
                  id="male"
                  value={"M"}
                  name="gender"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                ></input>
                <label htmlFor="male" style={{ paddingRight: "20px" }}>
                  Male
                </label>
              </div>
              <div className="gender-option" style={{ marginBottom: "20px" }}>
                <input
                  type="radio"
                  id="femle"
                  value={"F"}
                  name="gender"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                ></input>
                <label htmlFor="female" style={{ paddingRight: "20px" }}>
                  Female
                </label>
              </div>
              <div className="gender-option" style={{ marginBottom: "20px" }}>
                <input
                  type="radio"
                  id="other"
                  value={"O"}
                  name="gender"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                ></input>
                <label htmlFor="other" style={{ paddingRight: "20px" }}>
                  Other
                </label>
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
                  placeholder="Enter weight"
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
                  placeholder="Enter height"
                  required
                  value={data?.height}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, height: e.target.value }))
                  }
                />
              </div>
            </div>

            <button className="pro_sub_btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
