import React from "react";

const NetworkAlert = ({network}) => {
  return (
    <>
      {network !== "main" ? (
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
          NETWORK ERROR: SWITCH METAMASK'S NETWORK TO MAINNET.
        </div>
      ) : null}
    </>
  );
};

export default NetworkAlert