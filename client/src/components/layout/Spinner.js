import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <Fragment>
      <img
        src={spinner}
        sytle={{
          with: "50px",
          heigt: "50px",
          margin: " auto",
          display: "block",
        }}
        alt='Loading...'
      />
    </Fragment>
  );
}
