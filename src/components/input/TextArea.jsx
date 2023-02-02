import React from "react";

const TextArea = (props) => {
  return (
    <textarea
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      id={props.name}
      required={props.required}
      rows={1}
      className={`${props.css} w-full bg-wht p-2 focus:border-none focus:outline-none text-body font-body resize-none
      text-sm rounded-md
      l-s:text-base`}
    />
  );
};

export default TextArea;
