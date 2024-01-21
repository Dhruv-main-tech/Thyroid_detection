import React from "react";

import Header from "../components/Header";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Loginform from "../components/Loginform";
import Signupform from "../components/Signupform";

const HomeSection = () => {
  return (
    <section className="home" id="home">
      <div className="form_container">
        <Loginform />
        <Signupform />
      </div>
    </section>
  );
};

const Homepage = () => {
  return (
    <>
      <Header />
      <HomeSection />
      <Services />
      <Contact />
    </>
  );
};

export default Homepage;
