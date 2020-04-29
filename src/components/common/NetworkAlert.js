import React from "react";

const NetworkAlert = ({network}) => {
  return (
    <>
      {network !== process.env.REACT_APP_NETWORK ? (
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "bold",
            backgroundColor: "#C66065",
            color: "white",
            textAlign: "center",
            padding: "10px 0px",
          }}
        >
          NETWORK ERROR: SWITCH METAMASK'S NETWORK TO {process.env.REACT_APP_NETWORK.toUpperCase()} NETWORK.
        </div>
      ) : null}
    </>
  );
};

export default NetworkAlert