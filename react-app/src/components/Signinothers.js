import React, { useState, useContext, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/Firebaseconfig";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const GoogleSignin = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [userData, setuserData] = useState({
    displayName: "",
    email: "",
  });

  const GoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        var { displayName, email } = result.user;
        if (displayName == null) displayName = "NA";
        if (email == null) email = "NA@";
        setuserData({ displayName, email });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const FacebookClick = async () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const TwitterClick = async () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        var { displayName, email } = result.user;
        if (displayName == null) displayName = "NA";
        if (email == null) email = "NA@";
        setuserData({ displayName, email });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GitClick = async () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        var { displayName, email } = result.user;
        if (displayName == null) displayName = "NA";
        if (email == null) email = "NA@";
        setuserData({ displayName, email });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const signin = async () => {
      const res = await authApi.googlesignin(userData);
      const { user, accessToken } = res?.data;
      setAuth({
        accessToken: accessToken,
        age: user?.age,
        weight: user?.weight,
        height: user?.height,
        gender: user?.gender,
        email: user?.email,
        condition: user?.condition,
        uname: user?.uname,
      });
      if (res?.data?.user?.gender === " ") {
        navigate("/upprofile");
      } else navigate("/logged");
    };
    if (userData?.displayName !== "") signin();
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

export default GoogleSignin;
