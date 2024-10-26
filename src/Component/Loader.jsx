import React from "react";
import {
  BallTriangle,
  InfinitySpin,
  RotatingLines,
} from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RotatingLines
            visible={true}
            height="25"
            width="25"
            color="red"
            strokeColor="#5d69e9"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          &nbsp; Please wait...
        </div>
      </>
    </>
  );
}
