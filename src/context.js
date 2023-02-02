import React from "react";
import { io } from "socket.io-client";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const url = `https://takomommy-server.onrender.com`;
  const socket = io(url);
  const room = localStorage.getItem("tm_id");

  React.useEffect(() => {
    if (room) {
      socket.emit("join-room", { room });
    }
  }, [room, socket]);

  return <AppContext.Provider value={{ url, socket }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { AppContext, AppProvider };
