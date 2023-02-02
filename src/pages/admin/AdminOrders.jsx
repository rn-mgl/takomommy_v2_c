import React from "react";
import axios from "axios";
import tupper from "../../images/single-tupper.png";
import OrderFilter from "../../components/admin/OrderFilter";
import tako from "../../images/takoyaki.png";

import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineRight } from "react-icons/ai";

const AdminOrders = () => {
  const [orders, setOrders] = React.useState([]);
  const [filter, setFilter] = React.useState("All");

  const { url } = useGlobalContext();
  const token = localStorage.getItem("tm_adm_token");

  const handleFilter = (value) => {
    setFilter(value);
  };

  const getOrders = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin/rcvd_orders`, {
        params: { filter },
        headers: { Authorization: token },
      });
      if (data) {
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token, url, filter]);

  React.useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div
      className="p-5 pb-20 cstm-flex-col gap-5
                t:py-20 t:pb-5"
    >
      <p className="font-head text-2xl">All Orders</p>

      <OrderFilter filter={filter} handleFilter={handleFilter} />

      <div
        className="w-full cstm-flex-col bg-wht p-2 rounded-md gap-3
                  l-s:w-10/12"
      >
        {orders.map((order) => {
          return (
            <React.Fragment key={order._id}>
              <div className="cstm-flex-row justify-start gap-2 w-full t:justify-between">
                <div className="cstm-flex-row mr-auto t:mr-0 gap-2">
                  <img className="h-20 l-s:h-28" src={tupper} alt="tupper" />
                  <div className="font-body text-xs cstm-flex-col items-start  l-s:text-sm">
                    <p className="font-head text-base l-s:text-lg">{order.variety}</p>
                    <div className="cstm-flex-row gap-1">
                      <p>{order.pieces} Pieces</p>
                      <GoPrimitiveDot />
                      <p>
                        {order.sets} {order.sets > 1 ? "Boxes" : "Box"}
                      </p>
                    </div>
                    <p>{order.status}...</p>
                  </div>
                </div>

                <p className="m-s:hidden t:flex font-body text-xs l-s:text-sm ">
                  {order.buyerData?.name} {order.buyerData?.surname}
                </p>

                <div className="font-body text-xs gap-2  m-s:hidden t:cstm-flex-row  l-s:text-sm">
                  <p>P{order.price}</p>
                  <GoPrimitiveDot />
                  <p>{order.paymentType}</p>
                </div>

                <div className="font-body text-xs gap-2  m-s:hidden t:cstm-flex-row  l-s:text-sm">
                  <p>{order.deliveryDate}</p>
                  <GoPrimitiveDot />
                  <p>{order.deliveryTime}</p>
                </div>

                <Link
                  to={`/tm/a/orders/${order._id}`}
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
              <div className="w-full h-[0.5px] last-of-type:hidden bg-blk-mn opacity-10" />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOrders;
