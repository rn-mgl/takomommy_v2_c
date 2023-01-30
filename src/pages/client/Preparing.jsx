import React from "react";

import tupper from "../../images/single-tupper.png";
import axios from "axios";

import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineRight } from "react-icons/ai";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

const Preparing = () => {
  const [orders, setOrders] = React.useState([]);

  const { url } = useGlobalContext();
  const token = localStorage.getItem("tm_token");

  React.useEffect(() => {
    const getAllOrders = async () => {
      try {
        const { data } = await axios.get(`${url}/orders`, { headers: { Authorization: token } });
        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllOrders();
  }, [token, url]);

  return (
    <div className=" w-full min-h-screen cstm-flex-col gap-5 justify-start p-5 t:pt-20 ">
      <p
        className="font-head text-3xl drop-shadow-md
                  l-s:text-5xl"
      >
        YOUR ORDERS
      </p>
      <div
        className="cstm-flex-col gap-5 w-full
                  t:w-8/12
                  l-l:w-6/12"
      >
        {orders.map((order) => {
          return (
            <div
              className="w-full rounded-md p-3 cstm-flex-row bg-wht justify-around"
              key={order._id}
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
                    {order.variety}
                  </p>
                  <div className="cstm-flex-row w-full">
                    <p className="mr-auto">{order.pieces} Pieces</p>
                    <GoPrimitiveDot />
                    <p className="ml-auto">
                      {order.sets} {order?.sets > 1 ? "Boxes" : "Box"}
                    </p>
                  </div>
                  <p>{order.status}...</p>
                </div>
              </div>
              <div
                className="font-body text-xs cstm-flex-col items-start gap-1
                            m-s:hidden
                            t:flex t:mr-auto
                            l-s:text-sm"
              >
                <p>
                  <span className="font-medium">receive on:</span> {order.deliveryDate}
                </p>
                <p>
                  <span className="font-medium">around:</span> {order.deliveryTime}
                </p>
                <p>
                  <span className="font-medium">price:</span> P {order.price}.00
                </p>
              </div>
              <Link
                to={`/tm/c/preparing/${order._id}`}
                target="_blank"
                rel="noreferrer noopener"
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

export default Preparing;
