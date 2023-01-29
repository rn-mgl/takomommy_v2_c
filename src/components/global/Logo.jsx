import React from "react";
import takoyaki from "../../images/takoyaki.png";

const Logo = () => {
  return (
    <a
      href="/"
      className="fixed top-3 drop-shadow-md z-20 left-3
                 t:left-3 t:top-[1.35rem] t:translate-x-0"
    >
      <img src={takoyaki} alt="logo" className="w-10 drop-shadow-md " />
    </a>
  );
};

export default Logo;
