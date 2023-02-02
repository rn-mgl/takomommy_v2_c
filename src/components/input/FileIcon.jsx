import React from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";

const FileIcon = (props) => {
  return (
    <label htmlFor={props.name}>
      <AiOutlineFolderOpen className="scale-125 peer cursor-pointer" />
      <input
        type="file"
        name={props.name}
        defaultValue={props.value}
        onChange={props.onChange}
        id={props.name}
        className="hidden peer"
      />
    </label>
  );
};

export default FileIcon;
