import React from "react";

const Radio = (props) => {
  return (
    <label
      className={`${props.checked} w-full focus:border-none focus:outline-1 text-body font-body text-center
                text-sm rounded-md cursor-pointer bg-wht 
                disabled:bg-neutral-300
                l-s:text-base`}
      htmlFor={props.label}
    >
      <input
        type="radio"
        checked={props.checked}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        id={props.label}
        className="hidden peer"
      />
      <p className="peer-checked:bg-red-mn whitespace-nowrap peer-checked:text-wht w-full rounded-md p-2 bg-wht">
        {props.label}
      </p>
    </label>
  );
};

export default Radio;
