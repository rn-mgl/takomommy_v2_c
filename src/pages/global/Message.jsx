import React from "react";

import { useGlobalContext } from "../../context";
import { AiOutlineSend } from "react-icons/ai";

import axios from "axios";
import TextArea from "../../components/input/TextArea";
import * as dateFns from "../../functions/dateFns";
import * as fileFns from "../../functions/fileFns";
import * as textFns from "../../functions/textFns";

import FileIcon from "../../components/input/FileIcon";
import FileViewer from "../../components/global/FileViewer";
import FilePreview from "../../components/global/FilePreview";
import Notif from "../../components/global/Notif";

const Message = () => {
  const [messages, setMessages] = React.useState([]);
  const [notif, setNotif] = React.useState({ msg: "", active: false });
  const [selectedMessage, setSelectedMessage] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState({ fileUrl: undefined, fileType: "" });
  const [messageData, setMessageData] = React.useState({
    type: window.location.pathname.split("/")[2],
    receiver: "",
    message: "",
    file: undefined,
  });

  const { url, socket } = useGlobalContext();
  const token = localStorage.getItem("tm_token");
  const user = localStorage.getItem("tm_id");

  const handleSelectedMessage = (id) => {
    setSelectedMessage((prev) => (id === prev ? "" : id));
  };

  const socketSendMessage = () => {
    socket.emit("send-message", { room: user });
  };

  const socketJoinRoom = React.useCallback(() => {
    socket.emit("join-room", { room: user });
  }, [socket, user]);

  const handleMessageData = ({ name, value }) => {
    setMessageData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getMessages = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/message`, {
        params: { type: messageData.type },
        headers: { Authorization: token },
      });

      if (data) {
        setMessages(data);
      }
    } catch (error) {
      console.log(error);
      setNotif({ msg: error.response.data.msg, active: true });
    }
  }, [url, token, messageData.type]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if ((!messageData.message && !messageData.file) || textFns.isBlank(messageData.file)) {
      setNotif({ msg: "Please enter appropriate values.", active: true });
      return;
    }

    let fileLink = undefined;

    if (messageData.file) {
      fileLink = await fileFns.sendFile(e, url, token);
      if (fileLink?.startsWith("Error")) {
        setNotif({ msg: fileLink, active: true });
        return;
      } else if (fileLink.startsWith("https")) {
        messageData.file = fileLink;
      } else if (!fileLink) {
        messageData.file = null;
      } else {
        return;
      }
    } else {
      messageData.file = null;
    }

    try {
      const { data } = await axios.post(
        `${url}/message`,
        { messageData },
        { headers: { Authorization: token } }
      );
      if (data) {
        socketSendMessage();
        getMessages();
        setMessageData((prev) => {
          return {
            ...prev,
            file: undefined,
            message: "",
          };
        });
        setSelectedFile({ fileUrl: undefined, fileType: "" });
      }
    } catch (error) {
      console.log(error);
      setNotif({ msg: error.response.data.msg, active: true });
    }
  };

  const socketReceiveMessage = React.useCallback(() => {
    socket.on("receive-message", (room) => {
      getMessages();
    });
  }, [getMessages, socket]);

  React.useEffect(() => {
    getMessages();
  }, [getMessages]);

  React.useEffect(() => {
    socketJoinRoom();
  }, [socketJoinRoom]);

  React.useEffect(() => {
    socketReceiveMessage();
  }, [socketReceiveMessage]);

  return (
    <div
      className="p-5 pb-14 min-h-screen bg-wht w-full cstm-flex-col gap-2 justify-start relative
                t:pt-20 t:pb-5"
    >
      {notif && <Notif notif={notif} setNotif={setNotif} />}
      <div
        className="absolute bg-white rounded-md w-11/12 h-[87%] p-3 cstm-flex-col gap-2
                  t:h-5/6 t:w-8/12"
      >
        <div className="w-full h-full max-h-full cstm-flex-col overflow-y-auto gap-2 justify-start p-2 flex-col-reverse">
          {selectedFile.fileUrl ? (
            <FilePreview
              setSelectedFile={setSelectedFile}
              setMessageData={setMessageData}
              selectedFile={selectedFile}
            />
          ) : null}
          {messages.map((msg) => {
            const isSender = msg.sender === user;
            const isSelected = selectedMessage === msg._id;
            return (
              <div className="w-full font-body" key={msg._id}>
                <div
                  onClick={() => handleSelectedMessage(msg._id)}
                  className={`${
                    isSender ? "ml-auto bg-blk-sc text-wht" : "mr-auto bg-wht text-blk-mn "
                  } py-1 px-2 rounded-md  text-sm w-fit`}
                >
                  {msg.message ? (
                    <p className="whitespace-pre-wrap break-words max-w-[10rem] t:max-w-xs">
                      {msg.message}
                    </p>
                  ) : null}
                  {msg?.file ? <FileViewer file={msg.file} /> : null}
                </div>
                {isSelected ? (
                  <p className={`${isSender ? "text-right" : "text-left"} text-xs opacity-50`}>
                    {dateFns.localDate(msg.createdAt)} | {dateFns.localTime(msg.createdAt)}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
        <form
          onSubmit={(e) => {
            sendMessage(e);
          }}
          className="w-full cstm-flex-row gap-3"
        >
          <FileIcon
            name="file"
            value={messageData.file}
            onChange={(e) => {
              fileFns.handleFilePreview(e, setSelectedFile);
              handleMessageData(e.target);
            }}
          />
          <TextArea
            css="mt-auto rounded-full w-10/12 px-4"
            placeholder="enter message..."
            name="message"
            value={messageData.message}
            onChange={(e) => handleMessageData(e.target)}
          />
          <button>
            <AiOutlineSend className="scale-125" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
