import React from "react";

const NetworkAlert = ({network}) => {
  return (
    <>
      {network !== "rinkeby" ? (
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
          NETWORK ERROR: SWITCH METAMASK'S NETWORK TO RINKEBY.
        </div>
      ) : null}
    </>
  );
};

export default NetworkAlert