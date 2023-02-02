import React from "react";
import tako from "../../images/takoyaki.png";

const FilePreview = ({ selectedFile }) => {
  const type = selectedFile?.fileType;
  const file = selectedFile?.fileUrl;
  console.log(type);
  return (
    <div className="cstm-flex-col mr-auto relative p-2 bg-blk-sc rounded-md">
      {type === "image" ? (
        <img className="max-h-20" src={file} alt="file" />
      ) : type === "video" ? (
        <video className="max-h-20" src={file} alt="file" controls />
      ) : type === "application" ? (
        <img className="max-h-20 w-full overscroll-auto" src={tako} alt="file" />
      ) : type === "audio" ? (
        <audio className="w-56 h-10" controls src={file} alt="file" />
      ) : null}
      <p className="font-body text-xs text-wht">preview</p>
    </div>
  );
};

export default FilePreview;
