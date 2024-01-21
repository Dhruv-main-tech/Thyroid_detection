import { React, useEffect, useState } from "react";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const navigate = useNavigate();

  const check = async () => {
    const res = await authApi.access();
    if (res?.accessToken === "") navigate("/denied");
  };
  check();

  const handleCheckboxChange = (checkboxName) => {
    setmdata((prev) => ({
      ...prev,
      [checkboxName]: !prev[checkboxName],
    }));
  };

  function Non_negative() {
    const formContainer = document.querySelector(".form_container2");
    formContainer.classList.add("active1");
  }

  function negative() {
    const formContainer = document.querySelector(".form_container2");
    formContainer.classList.remove("active1");
    formContainer.classList.add("active2");
  }

  const [pdata, setpdata] = useState("");

  const [udata, setUdata] = useState({
    uname: "",
    email: "",
    height: "",
    age: "",
    weight: "",
    gender: "",
    condition: "",
  });

  const [mdata, setmdata] = useState({
    age: udata?.age,
    gender: udata?.gender,
    "on thyroxine": false,
    "on antithyroid medication": false,
    sick: false,
    pregnant: false,
    "thyroid surgery": false,
    "I131 treatment": false,
    lithium: false,
    goitre: false,
    tumor: false,
    hypopituitary: false,
    psych: false,
    TSH: "2.875",
    T3: "1.25",
    TT4: "105",
    FTI: "97.5",
  });

  const details = async () => {
    try {
      const { user } = await authApi.disp("");
      return user || {};
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

  useEffect(() => {
    setmdata((prev) => ({
      ...prev,
      age: udata?.age,
      gender: udata?.gender,
    }));
  }, [udata]);

  const handleSubmit = async () => {
    try {
      const patient_condition = await authApi.report(mdata);
      setpdata(patient_condition?.data?.condition?.condition);
      if (patient_condition?.data?.condition?.condition === "NEGATIVE") {
        negative();
      } else {
        Non_negative();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home" style={{ padding: "50px" }}>
      <div
        className="form_container2"
        style={{ maxWidth: "520px", height: "auto" }}
      >
        <div className="details_form">
          <div style={{ display: "flex" }}>
            <h4
              style={{
                color: "black",
                paddingLeft: "110px",
                paddingRight: "50px",
              }}
            >
              Enter patient details
            </h4>
            <a
              href="/logged"
              style={{
                color: "black",
                textDecoration: "none",
                paddingLeft: "60px",
              }}
            >
              x
            </a>
          </div>
          <div style={{ display: "block", justifyItems: "center" }}>
            <div style={{ display: "flex" }}>
              <div>
                <label style={{ marginLeft: "10px" }}> on thyroxine?</label>
                <input
                  type="checkbox"
                  checked={mdata?.["on thyroxine"]}
                  onChange={() => handleCheckboxChange("on thyroxine")}
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
              <div>
                <label style={{ marginLeft: "10px" }}>
                  {" "}
                  on antithyroid medication?
                </label>
                <input
                  type="checkbox"
                  checked={mdata?.["on antithyroid medication"]}
                  onChange={() =>
                    handleCheckboxChange("on antithyroid medication")
                  }
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
              <div>
                <label style={{ marginLeft: "10px" }}> sick?</label>
                <input
                  type="checkbox"
                  checked={mdata?.["sick"]}
                  onChange={() => handleCheckboxChange("sick")}
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div>
                <label style={{ marginLeft: "10px" }}> pregnant?</label>
                <input
                  type="checkbox"
                  checked={mdata?.["pregnant"]}
                  onChange={() => handleCheckboxChange("pregnant")}
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
              <div>
                <label style={{ marginLeft: "10px" }}> thyroid surgery?</label>
                <input
                  type="checkbox"
                  checked={mdata?.["thyroid surgery"]}
                  onChange={() => handleCheckboxChange("thyroid surgery")}
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
              <div>
                <label style={{ marginLeft: "10px" }}> I131 treatment?</label>
                <input
                  type="checkbox"
                  checked={mdata?.["I131 treatment"]}
                  onChange={() => handleCheckboxChange("I131 treatment")}
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div>
                <label style={{ marginLeft: "10px" }}> lithium?</label>
                <input
                  type="checkbox"
                  checked={mdata?.["lithium"]}
                  onChange={() => handleCheckboxChange("lithium")}
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
              <div>
                <label style={{ marginLeft: "10px" }}> goitre?</label>
                <input
                  type="checkbox"
                  checked={mdata?.["goitre"]}
                  onChange={() => handleCheckboxChange("goitre")}
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
              <div>
                <label style={{ marginLeft: "10px" }}> tumor?</label>
                <input
                  type="checkbox"
                  checked={mdata?.["tumor"]}
                  onChange={() => handleCheckboxChange("tumor")}
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
              <div>
                <label style={{ marginLeft: "10px" }}> psych?</label>
                <input
                  type="checkbox"
                  checked={mdata?.["psych"]}
                  onChange={() => handleCheckboxChange("psych")}
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
              <div>
                <label style={{ marginLeft: "10px" }}> hypopituitary?</label>
                <input
                  type="checkbox"
                  checked={mdata?.["hypopituitary"]}
                  onChange={() => handleCheckboxChange("hypopituitary")}
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
            </div>
          </div>
          <div style={{ margin: "20px" }}>
            <div
              className="input_box"
              style={{ display: "flex" }}
              value={mdata?.TSH}
              onChange={(e) =>
                setmdata((prev) => ({ ...prev, TSH: e.target.value }))
              }
            >
              <input type="number" placeholder="Enter TSH levels" />
            </div>
            <div
              className="input_box"
              style={{ display: "flex" }}
              value={mdata?.T3}
              onChange={(e) =>
                setmdata((prev) => ({ ...prev, T3: e.target.value }))
              }
            >
              <input type="number" placeholder="Enter T3 levels" />
            </div>
            <div
              className="input_box"
              style={{ display: "flex" }}
              value={mdata?.TT4}
              onChange={(e) =>
                setmdata((prev) => ({ ...prev, TT4: e.target.value }))
              }
            >
              <input type="number" placeholder="Enter TT4 levels" />
            </div>
            <div
              className="input_box"
              style={{ display: "flex" }}
              value={mdata?.FTI}
              onChange={(e) =>
                setmdata((prev) => ({ ...prev, FTI: e.target.value }))
              }
            >
              <input type="number" placeholder="Enter FTI levels" />
            </div>
          </div>

          <button className="pro_sub_btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div
          className="report_form1"
          style={{ color: "black", marginTop: "10px" }}
        >
          <div> {pdata} </div>
          <a href="/learn">
            <button className="pro_sub_btn">Learn More</button>
          </a>
          <a href="/workout">
            <button className="pro_sub_btn">Generate Workout Plan</button>
          </a>
          <a href="/diet">
            <button className="pro_sub_btn">Generate Diet Plan</button>
          </a>
        </div>
        <div
          className="report_form2"
          style={{ color: "black", marginTop: "10px" }}
        >
          <div> {pdata} </div>
          <a href="/workout">
            <button className="pro_sub_btn">Generate Workout Plan</button>
          </a>
          <a href="/diet">
            <button className="pro_sub_btn">Generate Diet Plan</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Test;
