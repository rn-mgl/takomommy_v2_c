import React from "react";
import takoyaki from "../../images/takoyaki.png";

const LoggedLogo = () => {
  return (
    <a href="/">
      <img
        src={takoyaki}
        alt="logo"
        className="drop-shadow-md w-7 opacity-80
                    t:mr-auto"
      />
    </a>
  );
};

export default LoggedLogo;
