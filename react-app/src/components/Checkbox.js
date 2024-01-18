import { React, useState } from "react";

const Checkbox = ({ label }) => {
  const [isChecked, setChecked] = useState(false);

  
  return (
    <div>
      <label style={{ marginLeft: "10px" }}> {label}</label>
      <input
        type="checkbox"
        checked={isChecked}
        style={{ marginLeft: "10px" }}
      ></input>
    </div>
  );
};

export default Checkbox;
