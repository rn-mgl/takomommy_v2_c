import React from "react";

const Button = (props) => {
  return (
    <button
      className={`${props.css} rounded-md text-center p-2 font-head w-full hover:shadow-md transition-all cursor-pointer 
                l-s:text-xl`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default Button;
