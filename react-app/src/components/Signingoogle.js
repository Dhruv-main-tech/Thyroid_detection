import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase/Firebaseconfig";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";

const GoogleSignin = () => {
  const navigate = useNavigate();

  const [userData, setuserData] = useState({
    displayName: "",
    email: "",
  });

  const HandleClick = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;
        setuserData({ displayName, email });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const signin = async () => {
      const res = await authApi.googlesignin(userData);
      if (res?.data?.accessToken !== "") {
        if (res?.data?.user?.gender === " ") {
          navigate("/upprofile");
        } else navigate("/logged");
      } else navigate("/denied");
    };
    if (userData?.displayName !== "") signin();
  }, [userData]);

  return (
    <button onClick={HandleClick} className="google">
      Continue with google
    </button>
  );
};

export default GoogleSignin;
