import React, { useContext, useState, useEffect } from "react";
import authApi from "../apis/authApi";
import { AuthContext } from "../contexts/AuthContext";
import LoadingSpinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const Logged = () => {
  //Token
  const { auth, setAuth } = useContext(AuthContext);

  //Navigation utility
  const navigate = useNavigate();

  //Navigation states
  const [home, sethome] = useState(true);
  const [test, settest] = useState(false);
  const [workout, setworkout] = useState(false);
  const [diet, setdiet] = useState(false);
  const [learn, setlearn] = useState(false);
  const [profile, setprofile] = useState(false);
  const [edit, setedit] = useState(false);
  const [testn, settestn] = useState(false);
  const [ana, setana] = useState(false);

  //Navigation buttons
  const HomeClick = () => {
    settest(false);
    setdiet(false);
    setworkout(false);
    setprofile(false);
    setedit(false);
    sethome(true);
  };
  const TestClick = () => {
    sethome(false);
    settest(true);
  };
  const DietClick = () => {
    sethome(false);
    setdiet(true);
    settest(false);
  };
  const WorkoutClick = () => {
    sethome(false);
    setworkout(true);
    settest(false);
  };
  const LearnClick = () => {
    settest(false);
    setlearn(true);
  };
  const ProfileClick = () => {
    sethome(false);
    setprofile(true);
  };
  const EditClick = () => {
    setprofile(false);
    setedit(true);
  };
  const TestnClick = () => {
    settest(false);
    settestn(true);
  };
  const AnalyzeClick = () => {
    settestn(false);
    setana(true);
  };
  const LogoutClick = () => {
    setAuth({
      accessToken: "",
      age: "",
      weight: "",
      height: "",
      gender: "",
      email: "",
      condition: "",
      uname: "",
    });
    navigate("/");
  };

  //Utility constants
  const [feed, setfeed] = useState({
    feedback: "",
    uname: auth?.uname,
  });
  const [dietdata, setDietdata] = useState("");
  const [workoutdata, setWorkoutdata] = useState("");
  const [textToRead, setTextToRead] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mdata, setmdata] = useState({
    uname: auth?.uname,
    age: auth?.age,
    gender: auth?.gender === "M" ? 1 : 0,
    "on thyroxine": 0,
    "on antithyroid medication": 0,
    sick: 0,
    pregnant: 0,
    "thyroid surgery": 0,
    "I131 treatment": 0,
    lithium: 0,
    goitre: 0,
    tumor: 0,
    hypopituitary: 0,
    psych: 0,
    TSH: 2.875,
    T3: 1.25,
    TT4: 105,
    FTI: 97.5,
  });
  const [pdata, setpdata] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [data, setData] = useState({
    age: auth?.age,
    weight: auth?.weight,
    height: auth?.height,
    uname: auth?.uname,
    email: auth?.email,
  });
  const [ntest, setntest] = useState({
    age: auth?.age,
    weight: auth?.weight,
    height: auth?.height,
    gender: auth?.gender,
  });
  const [anadata, setanadata] = useState("");
  let utterance;

  //Utility functions
  const handleCheckboxChange = (checkboxName) => {
    setmdata((prev) => ({
      ...prev,
      [checkboxName]: prev[checkboxName] ? 0 : 1,
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

  //Api functions
  const generateDiet = async () => {
    if (auth?.condition !== "") {
      setLoading(true);

      const gender =
        auth.gender === "M" ? "male" : auth.gender === "F" ? "female" : "other";
      const condition =
        auth.condition === "NEGATIVE" ? "normal" : auth.condition;
      const user_prompt = `Generate a diet plan for a ${auth?.age} year old of gender ${gender} of height ${auth?.height} cm, weight ${auth?.weight} kgs of ${condition} condition within 1700 characters or less start with here is a diet plan for`;

      try {
        const uname = auth?.uname;
        const res = await authApi.gpt({ user_prompt, uname });
        setDietdata(res.data);
        setTextToRead(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const generateWorkout = async () => {
    if (auth?.condition !== "") {
      setLoading(true);

      const gender =
        auth.gender === "M" ? "male" : auth.gender === "F" ? "female" : "other";
      const condition =
        auth.condition === "NEGATIVE" ? "normal" : auth.condition;
      const user_prompt = `Generate a workout plan for a ${auth?.age} year old of gender ${gender} of height ${auth?.height} cm, weight ${auth?.weight} kgs of ${condition} condition within 1800 characters or less start with here is a workout plan for`;

      try {
        const res = await authApi.gpt({ user_prompt });
        setWorkoutdata(res.data);
        setTextToRead(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const TestSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://thyroid-lab-prediction.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mdata),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setpdata(result?.condition);
      setAuth({
        accessToken: auth?.accessToken,
        age: auth?.age,
        weight: auth?.weight,
        height: auth?.height,
        gender: auth?.gender,
        email: auth?.email,
        condition: result?.condition,
        uname: auth?.uname,
      });

      if (result?.condition === "NEGATIVE") {
        negative();
      } else {
        Non_negative();
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    setLoading(false);
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
  const Feedback = async () => {
    authApi.feedback(feed);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await authApi.update(data);
      setAuth({
        accessToken: auth?.accessToken,
        age: data?.age,
        weight: data?.weight,
        height: data?.height,
        gender: auth?.gender,
        email: auth?.email,
        condition: auth?.condition,
        uname: data?.uname,
      });
      HomeClick();
    } catch (error) {
      console.log(error);
    }
  };
  const nTestSubmit = async () => {
    setLoading(true);
    const user_prompt = `give me an analysis on the chances of a thyroid disorder of a ${ntest?.age} year old ${ntest?.gender} of height ${ntest?.height}cm and weight ${ntest?.weight}kgs avoid showing the calculations`;
    try {
      const uname = auth?.uname;
      const res = await authApi.gpt({ user_prompt, uname });
      setanadata(res.data);
      setTextToRead(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      AnalyzeClick();
    }
  };

  //Use Effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pdata && pdata !== "NEGATIVE") {
          console.log(`Fetching file content for pdata: ${pdata}`);
          const file = await authApi.learn(pdata);
          setFileContent(file?.content || "");
        } else {
          setFileContent("");
        }
      } catch (error) {
        console.error("Error fetching file content:", error);
        setFileContent("");
      }
    };

    fetchData();
  }, [pdata]);

  //Returns
  return (
    <>
      {/* Home */}
      {home && (
        <div>
          <header className="header">
            {
              <nav className="nav">
                <a href="/" className="nav_logo"></a>
                <ul className="nav_items">
                  <li className="nav_item">
                    <a href="#services" className="nav_link">
                      Services
                    </a>
                    <a href="#contact" className="nav_link">
                      Contact
                    </a>
                  </li>
                </ul>
                <div>
                  <a className="login_text" style={{ paddingRight: "5px" }}>
                    <button
                      className="main_button"
                      style={{ color: "white" }}
                      onClick={ProfileClick}
                    >
                      Profile
                    </button>
                  </a>
                  <a
                    href="/"
                    className="login_text"
                    style={{ paddingLeft: "5px" }}
                  >
                    <button
                      className="main_button"
                      style={{ color: "white" }}
                      onClick={LogoutClick}
                    >
                      Logout
                    </button>
                  </a>
                </div>
              </nav>
            }
          </header>
          <section id="services" className="services_wrapper wrapper">
            {
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 text-center mb-5">
                    <h3>Our Services</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card">
                      <div className="icon-box"></div>
                      <div>
                        <h4>Report analysis</h4>
                        <p>
                          Analyze your reports using Artificial Intelligence for
                          fast and accurate diagnosis of thyroid
                        </p>
                        <button className="main-btn mt-4" onClick={TestClick}>
                          Let's go
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card">
                      <div className="icon-box"></div>
                      <div>
                        <h4>Diet modifier</h4>
                        <p>
                          Generate a personalized diet plan for your condition
                          using Artificial Intelligence
                        </p>
                        <button className="main-btn mt-4" onClick={DietClick}>
                          Let's go
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card">
                      <div className="icon-box"></div>
                      <div>
                        <h4>Exercise routine</h4>
                        <p>
                          Generate a personalized fitness plan for your
                          condition using Artificial Intelligence
                        </p>
                        <button
                          className="main-btn mt-4"
                          onClick={WorkoutClick}
                        >
                          Let's go
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </section>
          <section id="contact" className="footer_wrapper wrapper">
            {
              <div className="container pb-3">
                <div className="row">
                  <div className="col-lg-3 col-md-6 mb-4">
                    <h5>Contact</h5>
                    <div className="contact-info">
                      <ul className="list-unstyled p-0">
                        <li>
                          <a href="/">
                            <i className="fa fa-phone me-3"></i>+1 222 3333
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <i className="fa fa-envelope me-3"></i>
                            info@example.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-4">
                    <h5>Feedback</h5>
                    <div className="form-group mb-4">
                      <input
                        className="form-control bg-transparent"
                        placeholder="Type Here"
                        value={feed?.feedback}
                        onChange={(e) =>
                          setfeed((prev) => ({
                            ...prev,
                            feedback: e.target.value,
                          }))
                        }
                      />
                      <button
                        type="submit"
                        className="main-btn rounded-2 mt-3 border-white text-white"
                        onClick={Feedback}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </section>
        </div>
      )}
      {/* Test */}
      {test && (
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
                  href=""
                  style={{
                    color: "black",
                    textDecoration: "none",
                    paddingLeft: "60px",
                  }}
                  onClick={HomeClick}
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
                      checked={mdata?.["on thyroxine"] === 1}
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
                      checked={mdata?.["on antithyroid medication"] === 1}
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
                      checked={mdata?.["sick"] === 1}
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
                      checked={mdata?.["pregnant"] === 1}
                      onChange={() => handleCheckboxChange("pregnant")}
                      style={{ marginLeft: "10px" }}
                    ></input>
                  </div>
                  <div>
                    <label style={{ marginLeft: "10px" }}>
                      {" "}
                      thyroid surgery?
                    </label>
                    <input
                      type="checkbox"
                      checked={mdata?.["thyroid surgery"] === 1}
                      onChange={() => handleCheckboxChange("thyroid surgery")}
                      style={{ marginLeft: "10px" }}
                    ></input>
                  </div>
                  <div>
                    <label style={{ marginLeft: "10px" }}>
                      {" "}
                      I131 treatment?
                    </label>
                    <input
                      type="checkbox"
                      checked={mdata?.["I131 treatment"] === 1}
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
                      checked={mdata?.["lithium"] === 1}
                      onChange={() => handleCheckboxChange("lithium")}
                      style={{ marginLeft: "10px" }}
                    ></input>
                  </div>
                  <div>
                    <label style={{ marginLeft: "10px" }}> goitre?</label>
                    <input
                      type="checkbox"
                      checked={mdata?.["goitre"] === 1}
                      onChange={() => handleCheckboxChange("goitre")}
                      style={{ marginLeft: "10px" }}
                    ></input>
                  </div>
                  <div>
                    <label style={{ marginLeft: "10px" }}> tumor?</label>
                    <input
                      type="checkbox"
                      checked={mdata?.["tumor"] === 1}
                      onChange={() => handleCheckboxChange("tumor")}
                      style={{ marginLeft: "10px" }}
                    ></input>
                  </div>
                  <div>
                    <label style={{ marginLeft: "10px" }}> psych?</label>
                    <input
                      type="checkbox"
                      checked={mdata?.["psych"] === 1}
                      onChange={() => handleCheckboxChange("psych")}
                      style={{ marginLeft: "10px" }}
                    ></input>
                  </div>
                  <div>
                    <label style={{ marginLeft: "10px" }}>
                      {" "}
                      hypopituitary?
                    </label>
                    <input
                      type="checkbox"
                      checked={mdata?.["hypopituitary"] === 1}
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
              <LoadingSpinner loading={loading} color="#005599" />
              <button
                className="pro_sub_btn"
                onClick={TestSubmit}
                style={{ marginTop: "0px", padding: "8px" }}
              >
                Submit
              </button>
              <p style={{ marginBottom: "2px" }}>Don't have medical data?</p>
              <button
                className="pro_sub_btn"
                style={{ marginTop: "0px", padding: "8px" }}
                onClick={TestnClick}
              >
                Click here
              </button>
            </div>
            <div
              className="report_form1"
              style={{ color: "black", marginTop: "10px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ paddingLeft: "120px", textAlign: "center" }}>
                  {pdata}
                </div>

                <button
                  style={{
                    color: "black",
                    textDecoration: "none",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    paddingBottom: "20px",
                  }}
                  onClick={HomeClick}
                >
                  x
                </button>
              </div>

              <button className="pro_sub_btn" onClick={LearnClick}>
                Learn More
              </button>
              <button className="pro_sub_btn" onClick={WorkoutClick}>
                Generate Workout Plan
              </button>
              <button className="pro_sub_btn" onClick={DietClick}>
                Generate Diet Plan
              </button>
            </div>
            <div
              className="report_form2"
              style={{ color: "black", marginTop: "10px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ paddingLeft: "195px", textAlign: "center" }}>
                  {pdata}
                </div>

                <button
                  style={{
                    color: "black",
                    textDecoration: "none",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    paddingBottom: "20px",
                  }}
                  onClick={HomeClick}
                >
                  x
                </button>
              </div>
              <button className="pro_sub_btn" onClick={WorkoutClick}>
                Generate Workout Plan
              </button>
              <button className="pro_sub_btn" onClick={DietClick}>
                Generate Diet Plan
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Diet */}
      {diet && (
        <div className="home">
          <div
            className="form_container2"
            style={{ height: "auto", maxWidth: "800px" }}
          >
            <button
              style={{
                color: "black",
                textDecoration: "none",
                paddingLeft: "700px",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onClick={HomeClick}
            >
              x
            </button>

            <div className="form profile_form">
              <div className="chatgpt">
                <div style={{ display: "flex" }}>
                  <button className="pro_sub_btn" onClick={HomeClick}>
                    Home
                  </button>
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
                  onClick={generateDiet}
                  style={{ marginTop: "0px" }}
                >
                  Generate Diet Plan
                </button>
                <LoadingSpinner loading={loading} color="#005599" />
                <h6>{dietdata}</h6>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Workout */}
      {workout && (
        <div className="home">
          <div
            className="form_container2"
            style={{ height: "auto", maxWidth: "800px" }}
          >
            <button
              style={{
                color: "black",
                textDecoration: "none",
                paddingLeft: "700px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              onClick={HomeClick}
            >
              x
            </button>

            <div className="form profile_form">
              <div className="chatgpt">
                <div style={{ display: "flex" }}>
                  <button className="pro_sub_btn" onClick={HomeClick}>
                    Home
                  </button>
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
                  onClick={generateWorkout}
                  style={{ marginTop: "0px" }}
                >
                  Generate Workout Plan
                </button>
                <LoadingSpinner loading={loading} color="#005599" />
                <h6>{workoutdata}</h6>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* LearnMore */}
      {learn && (
        <div className="home" style={{ padding: "50px" }}>
          <div className="form_container2" style={{ maxWidth: "520px" }}>
            <div className="details_form"></div>
            <div>
              <pre style={{ color: "black" }}>{fileContent}</pre>
            </div>
          </div>
        </div>
      )}
      {/* Profile */}
      {profile && (
        <div className="home" style={{ padding: "50px" }}>
          <div className="form_container2" style={{ maxHeight: "460px" }}>
            <div className="form profile_form">
              <div className="profile_form">
                <div style={{ display: "flex" }}>
                  <h4
                    style={{
                      paddingLeft: "135px",
                      paddingRight: "120px",
                      color: "black",
                    }}
                  >
                    Profile
                  </h4>
                  <button
                    style={{
                      color: "black",
                      textDecoration: "none",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                    onClick={HomeClick}
                  >
                    x
                  </button>
                </div>
                <div style={{ display: "flex", paddingTop: "20px" }}>
                  <label>Username:</label>
                  <label style={{ paddingLeft: "20px" }}>{auth?.uname}</label>
                </div>
                <div style={{ display: "flex", paddingTop: "20px" }}>
                  <label>Email:</label>
                  <label style={{ paddingLeft: "20px" }}>{auth?.email}</label>
                </div>
                <div style={{ display: "flex", paddingTop: "20px" }}>
                  <label>Age:</label>
                  <label style={{ paddingLeft: "20px" }}>{auth?.age}</label>
                </div>
                <div style={{ display: "flex", paddingTop: "20px" }}>
                  <label>Gender:</label>
                  <label style={{ paddingLeft: "20px" }}>{auth?.gender}</label>
                </div>
                <div style={{ display: "flex", paddingTop: "20px" }}>
                  <label>Height:</label>
                  <label style={{ paddingLeft: "20px" }}>{auth?.height}</label>
                </div>
                <div style={{ display: "flex", paddingTop: "20px" }}>
                  <label>Weight:</label>
                  <label style={{ paddingLeft: "20px" }}>{auth?.weight}</label>
                </div>
                <div style={{ display: "flex", paddingTop: "20px" }}>
                  <label>Condition:</label>
                  <label style={{ paddingLeft: "20px" }}>
                    {auth?.condition}
                  </label>
                </div>
                <button className="pro_sub_btn" onClick={EditClick}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* EditProfile */}
      {edit && (
        <div className="home" style={{ padding: "50px" }}>
          <div className="form_container2" style={{ height: "530px" }}>
            <div className="form profile_form">
              <form className="profile_form" onSubmit={handleUpdate}>
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
                      placeholder={auth?.uname}
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
                      placeholder={auth?.age}
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
                      placeholder={auth?.weight}
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
                      placeholder={auth?.height}
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
      )}
      {/* Test without medical data */}
      {testn && (
        <div className="home">
          <div
            className="form_container2"
            style={{ height: "auto", maxWidth: "300px" }}
          >
            <div className="details_form">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4 style={{ paddingLeft: "10px", textAlign: "center" }}>
                  Enter below details
                </h4>

                <button
                  style={{
                    color: "black",
                    textDecoration: "none",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    paddingBottom: "20px",
                  }}
                  onClick={HomeClick}
                >
                  x
                </button>
              </div>

              <div>
                <label
                  style={{
                    display: "flex",
                    paddingLeft: "20px",
                    paddingTop: "10px",
                  }}
                >
                  Age
                </label>
              </div>
              <div
                className="input_box"
                style={{ display: "flex" }}
                value={ntest?.age}
                onChange={(e) =>
                  setntest((prev) => ({ ...prev, age: e.target.value }))
                }
              >
                <input type="number" placeholder="Enter age" />
              </div>
              <div>
                <label
                  style={{
                    display: "flex",
                    paddingLeft: "20px",
                    paddingTop: "10px",
                  }}
                >
                  Height in cms
                </label>
              </div>
              <div
                className="input_box"
                style={{ display: "flex" }}
                value={ntest?.height}
                onChange={(e) =>
                  setntest((prev) => ({ ...prev, height: e.target.value }))
                }
              >
                <input type="number" placeholder="Enter height" />
              </div>
              <div>
                <label
                  style={{
                    display: "flex",
                    paddingLeft: "20px",
                    paddingTop: "10px",
                  }}
                >
                  Weight in kgs
                </label>
              </div>
              <div
                className="input_box"
                style={{ display: "flex" }}
                value={ntest?.weight}
                onChange={(e) =>
                  setntest((prev) => ({ ...prev, weight: e.target.value }))
                }
              >
                <input type="number" placeholder="Enter weight" />
              </div>
              <div className="gender">
                <div>
                  <label
                    style={{
                      display: "flex",
                      paddingLeft: "20px",
                      paddingBottom: "12px",
                      paddingTop: "10px",
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
                      value={"male"}
                      name="gender"
                      onChange={(e) =>
                        setntest((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                    ></input>
                    <label htmlFor="male" style={{ paddingRight: "20px" }}>
                      Male
                    </label>
                  </div>
                  <div
                    className="gender-option"
                    style={{ marginBottom: "20px" }}
                  >
                    <input
                      type="radio"
                      id="femle"
                      value={"female"}
                      name="gender"
                      onChange={(e) =>
                        setntest((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                    ></input>
                    <label htmlFor="female" style={{ paddingRight: "20px" }}>
                      Female
                    </label>
                  </div>
                  <div
                    className="gender-option"
                    style={{ marginBottom: "20px" }}
                  >
                    <input
                      type="radio"
                      id="other"
                      value={"others"}
                      name="gender"
                      onChange={(e) =>
                        setntest((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                    ></input>
                    <label htmlFor="other" style={{ paddingRight: "20px" }}>
                      Other
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <LoadingSpinner loading={loading} color="#005599" />
                <button
                  className="pro_sub_btn"
                  onClick={nTestSubmit}
                  style={{ marginTop: "0px", padding: "8px" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {ana && (
        <div className="home">
          <div
            className="form_container2"
            style={{ height: "auto", maxWidth: "800px" }}
          >
            <button
              style={{
                color: "black",
                textDecoration: "none",
                paddingLeft: "700px",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onClick={HomeClick}
            >
              x
            </button>

            <div className="form profile_form">
              <div className="chatgpt">
                <div style={{ display: "flex" }}>
                  <button className="pro_sub_btn" onClick={HomeClick}>
                    Home
                  </button>
                  <button className="pro_sub_btn" onClick={handleRead}>
                    Read
                  </button>
                  <button className="pro_sub_btn" onClick={handleStop}>
                    Stop
                  </button>
                </div>
              </div>
              <div className="generate">
                <h6>{anadata}</h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logged;
