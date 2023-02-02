import React from "react";

import takoyaki from "../../images/takoyaki.png";
import tupper from "../../images/takoyaki-tupper.png";
import axios from "axios";
import Notif from "../../components/global/Notif";

import { useGlobalContext } from "../../context";
import { Link, useParams } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const Verify = () => {
  const [notif, setNotif] = React.useState({ msg: "", active: false });
  const { token } = useParams();
  const { url } = useGlobalContext();
  const verifyUser = React.useCallback(async () => {
    try {
      const { data } = await axios.patch(`${url}/auth/ver/${token}`, { verified: 1 });

      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      setNotif({ msg: error.response.data.msg, active: true });
    }
  }, [token, url]);

  React.useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <div className="bg-wht h-screen max-h-screen cstm-flex-col overflow-hidden">
      {notif && <Notif notif={notif} setNotif={setNotif} />}
      <img
        src={takoyaki}
        alt="takoyaki"
        className="animate-bounce w-14 drop-shadow-md
                  l-s:w-16"
      />
      <p
        className="font-head text-2xl text-blk-mn drop-shadow-md
                  t:text-3xl
                  l-s:text-4xl
                  l-l:text-5xl"
      >
        You are now verified
      </p>
      <Link to="/auth/login" className="cstm-flex-row gap-3 text-blk-mn hover:underline">
        <p
          className="font-body
                     t:text-lg
                     l-s:text-xl
                     l-l:text-2xl"
        >
          proceed to log in
        </p>
        <BsArrowRight />
      </Link>
      <img
        src={tupper}
        alt="tupper"
        className="absolute rotate-90 bottom-0 translate-y-20 w-full 
                  m-m:translate-y-28
                  m-l:translate-y-36
                  t:w-8/12 t:left-0 t:top-2/4 t:-translate-y-2/4 t:-translate-x-60
                  l-s:-translate-x-72 l-s:w-7/12
                  l-l:w-5/12"
      />
    </div>
  );
};

export default Verify;
