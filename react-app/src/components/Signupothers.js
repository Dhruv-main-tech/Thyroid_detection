import React, { useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/Firebaseconfig";
import authApi from "../apis/authApi";

const GoogleSignup = () => {
  const [userData, setuserData] = useState({
    displayName: "",
    email: "",
    uid: "",
  });

  function LoginClick() {
    const formContainer = document.querySelector(".form_container");
    formContainer.classList.remove("active1");
  }

  const GoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        var { displayName, email, uid } = result.user;
        if (displayName == null) displayName = "NA";
        if (email == null) email = "NA@";
        console.log(displayName, email, uid);
        setuserData({ displayName, email, uid });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const FacebookClick = async () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        var { displayName, email, uid } = result.user;
        if (displayName == null) displayName = "NA";
        if (email == null) email = "NA@";
        console.log(displayName, email, uid);
        setuserData({ displayName, email, uid });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const TwitterClick = async () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        var { displayName, email, uid } = result.user;
        if (displayName == null) displayName = "NA";
        if (email == null) email = "NA@";
        console.log(displayName, email, uid);
        setuserData({ displayName, email, uid });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const GitClick = async () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        var { displayName, email, uid } = result.user;
        if (displayName == null) displayName = "NA";
        if (email == null) email = "NA@";
        console.log(displayName, email, uid);
        setuserData({ displayName, email, uid });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const signin = async () => {
      const res = await authApi.googlesignup(userData);
      LoginClick();
    };
    if (userData?.displayName !== "" || userData?.email !== "") signin();
  }, [userData]);

  return (
    <div>
      <button onClick={GoogleClick} className="google">
        Continue with google
      </button>
      <button onClick={FacebookClick} className="google">
        Continue with Facebook
      </button>
      <button onClick={TwitterClick} className="google">
        Continue with Twitter
      </button>
      <button onClick={GitClick} className="google">
        Continue with Git
      </button>
    </div>
  );
};

export default GoogleSignup;
