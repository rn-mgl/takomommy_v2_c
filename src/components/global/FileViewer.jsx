import React from "react";
import { BsArrowRight } from "react-icons/bs";

const FileViewer = (props) => {
  const fileSplit = props.file?.split("/");
  const type = fileSplit[4];
  const isAudio = type === "video" && props.file?.endsWith(".mp3");

  return (
    <div className="cstm-flex-col">
      {type === "image" ? (
        <img className="max-h-20" src={props.file} alt="file" />
      ) : type === "video" && !isAudio ? (
        <video className="max-h-20" src={props.file} alt="file" controls />
      ) : type === "raw" ? (
        <iframe
          className="h-60 w-full overscroll-auto"
          src={props.file}
          alt="file"
          title={props.file}
        />
      ) : isAudio ? (
        <audio className="w-56 h-10" controls src={props.file} alt="file" />
      ) : null}
      <a
        href={props.file}
        target="_blank"
        rel="noopener noreferrer"
        className="cstm-flex-row gap-2 p-2"
      >
        see file <BsArrowRight />
      </a>
    </div>
  );
};

export default FileViewer;
