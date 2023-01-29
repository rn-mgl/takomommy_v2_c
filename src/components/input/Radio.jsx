import React from "react";

const Radio = (props) => {
  return (
    <label
      className={`${props.checked} w-full border-[1px] border-blk-sc focus:border-none focus:outline-1 text-body font-head text-center
                text-sm rounded-md cursor-pointer 
              bg-wht 
              hover:bg-wht
                l-s:text-base`}
      htmlFor={props.label}
    >
      <input
        type="radio"
        checked={props.checked}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        id={props.label}
        className="hidden peer"
      />
      <p className="peer-checked:bg-red-mn peer-checked:text-wht w-full rounded-md p-2">
        {props.label}
      </p>
    </label>
  );
};

export default Radio;
