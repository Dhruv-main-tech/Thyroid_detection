import React, { useState, useEffect } from "react";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";

const Learn = () => {
  const navigate = useNavigate();

  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [udata, setUdata] = useState({
    uname: "",
    email: "",
    height: "",
    age: "",
    weight: "",
    gender: "",
    condition: "",
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
      console.log("fetching")
      const user = await details();
      console.log(user)
      setUdata(user);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetching = async () => {
      try {
        console.log(`filename:${fileName}`);
        if (fileName !== "") {
          const file = await authApi.learn(fileName);
          setFileContent(file?.content);
        }
      } catch (error) {
        console.error("Error fetching file content:", error);
        setFileContent("");
      }
    };
    if (udata.condition !== "" && udata?.condition !== "NEGATIVE") {
      setFileName({ fileName: udata?.condition });
      fetching();
    }
  }, [udata]);

  return (
    <div className="home" style={{ padding: "50px" }}>
      <div className="form_container2" style={{ maxWidth: "520px" }}>
        <div className="details_form"></div>
        <div>
          <pre style={{ color: "black" }}>{fileContent}</pre>
        </div>
      </div>
    </div>
  );
};

export default Learn;
