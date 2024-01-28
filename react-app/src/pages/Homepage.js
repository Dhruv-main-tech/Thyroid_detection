import React from "react";

import Header from "../components/Header";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Loginform from "../components/Loginform";
import SignupVerifyform from "../components/Signup&Verifyform"

const HomeSection = () => {
  return (
    <section className="home" id="home">
      <div className="form_container">
        <Loginform />
        <SignupVerifyform />
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
