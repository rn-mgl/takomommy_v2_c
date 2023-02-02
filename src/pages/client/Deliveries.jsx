import React from "react";

import tupper from "../../images/single-tupper.png";
import axios from "axios";
import Notif from "../../components/global/Notif";

import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineRight } from "react-icons/ai";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

const Deliveries = () => {
  const [deliveries, setDeliveries] = React.useState([]);
  const [notif, setNotif] = React.useState({ msg: "", active: false });

  const token = localStorage.getItem("tm_token");
  const { url, socket } = useGlobalContext();

  const getDeliveries = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/orders`, {
        params: { type: "d" }, // delivery
        headers: { Authorization: token },
      });
      if (data) {
        setDeliveries(data);
      }
    } catch (error) {
      console.log(error);
      setNotif({ msg: error.response.data.msg, active: true });
    }
  }, [url, token]);

  const socketOrderUpdateReflect = React.useCallback(() => {
    socket.on("reflect-update-order", () => {
      getDeliveries();
    });
  }, [getDeliveries, socket]);

  React.useEffect(() => {
    getDeliveries();
  }, [getDeliveries]);

  React.useEffect(() => {
    socketOrderUpdateReflect();
  }, [socketOrderUpdateReflect]);

  return (
    <div className=" w-full min-h-screen cstm-flex-col gap-5 justify-start p-5 t:pt-20 ">
      {notif && <Notif notif={notif} setNotif={setNotif} />}
      <p
        className="font-head text-3xl drop-shadow-md
              l-s:text-5xl"
      >
        ON DELIVERY
      </p>
      <div
        className="cstm-flex-col gap-5 w-full
              t:w-8/12
              l-l:w-6/12"
      >
        {deliveries.map((delivery) => {
          return (
            <div
              className="w-full rounded-md p-3 cstm-flex-row bg-wht justify-around"
              key={delivery._id}
            >
              <div className="cstm-flex-row mr-auto gap-3 ">
                <img className="h-20 l-s:h-24" src={tupper} alt="tupper" />
                <div
                  className="font-body text-xs
                        l-s:text-sm"
                >
                  <p
                    className="font-head text-lg
                          l-s:text-xl"
                  >
                    {delivery.variety}
                  </p>
                  <div className="cstm-flex-row w-full">
                    <p className="mr-auto">{delivery.pieces} Pieces</p>
                    <GoPrimitiveDot />
                    <p className="ml-auto">
                      {delivery.sets} {delivery?.sets > 1 ? "Boxes" : "Box"}
                    </p>
                  </div>
                  <p>{delivery.status}...</p>
                </div>
              </div>
              <div
                className="font-body text-xs cstm-flex-col items-start gap-1
                        m-s:hidden
                        t:flex t:mr-auto
                        l-s:text-sm"
              >
                <p>
                  <span className="font-medium">receive on:</span> {delivery.deliveryDate}
                </p>
                <p>
                  <span className="font-medium">around:</span> {delivery.deliveryTime}
                </p>
                <p>
                  <span className="font-medium">price:</span> P {delivery.price}.00
                </p>
              </div>
              <Link
                to={`/tm/c/deliveries/${delivery._id}`}
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

export default Deliveries;
