import React from "react";
import tako from "../../images/takoyaki.png";
import { AiOutlineClose } from "react-icons/ai";

const FilePreview = (props) => {
  const type = props.selectedFile?.fileType;
  const file = props.selectedFile?.fileUrl;

  const removeSelectedFile = () => {
    props.setSelectedFile({ fileUrl: undefined, fileType: "" });
    props.setMessageData((prev) => {
      return {
        ...prev,
        file: undefined,
      };
    });
  };

  return (
    <div className="cstm-flex-col mr-auto p-2 bg-blk-sc rounded-md relative gap-2">
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

      <AiOutlineClose
        onClick={removeSelectedFile}
        className="absolute text-white bottom-2 right-2 scale-75 cursor-pointer"
      />
    </div>
  );
};

export default FilePreview;
