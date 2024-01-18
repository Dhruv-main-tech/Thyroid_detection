import React from "react";

function openForm() {
  const home = document.querySelector("#home");
  home.classList.add("show");
}

const Services = () => {
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
                  <a href="#home" className="main-btn mt-4" onClick={openForm}>
                    Let's go
                  </a>
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
                  <a href="#home" className="main-btn mt-4" onClick={openForm}>
                    Let's go
                  </a>
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
                  <a href="#home" className="main-btn mt-4" onClick={openForm}>
                    Let's go
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  );
};

export default Services;
