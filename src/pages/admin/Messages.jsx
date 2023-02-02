import React from "react";
import axios from "axios";
import Notif from "../../components/global/Notif";
import { useGlobalContext } from "../../context";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Messages = () => {
  const [users, setUsers] = React.useState([]);
  const [notif, setNotif] = React.useState({ msg: "", active: false });

  const { url, socket } = useGlobalContext();
  const token = localStorage.getItem("tm_adm_token");

  const socketJoinRoom = React.useCallback(
    (id) => {
      socket.emit("join-room", { room: id });
    },
    [socket]
  );

  const getUsers = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin/users/`, {
        headers: { Authorization: token },
      });
      if (data) {
        setUsers(data);
        data.map((user) => socketJoinRoom(user._id));
      }
    } catch (error) {
      console.log(error);
      setNotif({ msg: error.response.data.msg, active: true });
    }
  }, [url, token, socketJoinRoom]);

  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="p-5 pb-20 cstm-flex-col gap-5 t:py-20 t:pb-5">
      {notif && <Notif notif={notif} setNotif={setNotif} />}
      <p className="font-head text-2xl">Messages</p>
      <div className="cstm-flex-col gap-2 w-full t:w-10/12 t:items-start l-s:w-8/12">
        {users.map((user) => {
          return (
            <div
              className="bg-blk-mn rounded-md p-3 cstm-flex-row gap-2 w-full text-wht
                        t:w-fit "
              key={user._id}
            >
              <div className="p-2">
                <FaUserCircle className="scale-[2] l-s:scale-[2.25]" />
              </div>
              <div className="font-body text-sm mr-auto l-s:text-base">
                <p className="font-medium ">
                  {user.name} {user.surname}
                </p>
                <p className="text-xs l-s:text-sm">{user.email}</p>
              </div>
              <Link
                to={`/tm/a/messages/${user._id}`}
                className="hover:bg-neutral-300 rounded-full p-1 transition-all relative group"
              >
                <p
                  className="absolute hidden whitespace-nowrap left-2/4 -translate-x-2/4 -translate-y-8 group-hover:flex
                            font-body bg-blk-mn text-wht text-xs p-1 rounded-md
                            l-s:text-sm l-s:-translate-y-9"
                >
                  more info
                </p>
                <AiOutlineRight />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
