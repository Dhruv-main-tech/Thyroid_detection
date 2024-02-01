import React, { useState } from "react";
import LoggedHeader from "../components/L_Header";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";

const ServicesSection = () => {
  const navigate = useNavigate();
  const TestClick = () => {
    navigate("/test");
  };
  const DietClick = () => {
    navigate("/diet");
  };
  const WorkoutClick = () => {
    navigate("/workout");
  };

  return (
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
                    Analyze your reports using Artificial Intelligence for fast
                    and accurate diagnosis of thyroid
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
                    Generate a personalized diet plan for your condition using
                    Artificial Intelligence
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
                    Generate a personalized fitness plan for your condition
                    using Artificial Intelligence
                  </p>
                  <button className="main-btn mt-4" onClick={WorkoutClick}>
                    Let's go
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  );
};

const ContactSection = () => {
  const [feed, setfeed] = useState({
    feedback: "",
  });

  const Feedback = async () => {
    console.log(feed);
    authApi.feedback(feed);
  };

  return (
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
                      <i className="fa fa-envelope me-3"></i>info@example.com
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
                    setfeed((prev) => ({ ...prev, feedback: e.target.value }))
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
  );
};

const Loggedin = () => {
  return (
    <>
      <LoggedHeader />
      <ServicesSection />
      <ContactSection />
    </>
  );
};

export default Loggedin;
