import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase/Firebaseconfig";
import authApi from "../apis/authApi";

const GoogleSignup = () => {
  const [userData, setuserData] = useState({
    displayName: "",
    email: "",
    uid: "",
  });

  const HandleClick = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, uid } = result.user;
        setuserData({ displayName, email, uid });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const signin = async () => {
      const res = await authApi.googlesignup(userData);
      console.log(res?.success);
    };
    if (userData?.displayName !== "") signin();
  }, [userData]);

  return <button onClick={HandleClick} className="google">Continue with google</button>;
};

export default GoogleSignup;
