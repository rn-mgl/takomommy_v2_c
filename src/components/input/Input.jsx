import React from "react";

const Input = (props) => {
  return (
    <div className="w-full relative">
      {props.required ? (
        <div className="w-2 h-2 bg-red-mn rounded-full absolute right-0 -translate-y-[0.1rem] translate-x-[0.1rem] " />
      ) : null}

      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        id={props.name}
        required={props.required}
        className={`${props.css} disabled:bg-neutral-300 w-full border-[1px] bg-wht border-blk-sc p-2 focus:border-none focus:outline-1 text-body font-body
            text-sm rounded-md
            l-s:text-base`}
      />
    </div>
  );
};

export default Input;
