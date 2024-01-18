// LoadingSpinner.js
import React from "react";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
`;

const LoadingSpinner = ({ loading, color }) => {
  return (
    <div>
      <BeatLoader color={color} loading={loading} css={override} size={15} />
    </div>
  );
};

export default LoadingSpinner;
