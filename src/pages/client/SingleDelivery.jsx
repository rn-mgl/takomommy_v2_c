import React from "react";
import axios from "axios";
import flavors from "../../images/flavors.png";
import Notif from "../../components/global/Notif";

import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const SingleDelivery = () => {
  const [deliveryData, setDeliveryData] = React.useState({});
  const [notif, setNotif] = React.useState({ msg: "", active: false });

  const { url } = useGlobalContext();
  const token = localStorage.getItem("tm_token");
  const { deliveryId } = useParams();

  const getDeliveryData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/delivery/${deliveryId}`, {
        headers: { Authorization: token },
      });

      if (data) {
        setDeliveryData(data);
      }
    } catch (error) {
      console.log(error);
      setNotif({ msg: error.response.data.msg, active: true });
    }
  }, [url, token, deliveryId]);

  React.useEffect(() => {
    getDeliveryData();
  }, [getDeliveryData]);

  return (
    <div
      className="p-5 cstm-flex-col bg-white pb-20  gap-5
            t:pt-20 t:pb-5"
    >
      {notif && <Notif notif={notif} setNotif={setNotif} />}
      <p
        className="font-head text-3xl drop-shadow-md
              l-s:text-5xl"
      >
        ORDER DETAILS
      </p>
      <div
        className="cstm-flex-col gap-2
                t:w-7/12 
                l-s:w-9/12 l-s:grid l-s:grid-cols-2 l-s:items-start l-s:gap-5
                l-l:w-7/12"
      >
        <div className="w-full cstm-flex-col ">
          <img className=" p-2 bg-wht rounded-t-md w-full " src={flavors} alt="tupper" />
          <p className="font-head p-2 text-2xl rounded-b-md shadow-md w-full text-center">
            {deliveryData.variety}
          </p>
        </div>

        <div className="cstm-flex-col w-full gap-2 rounded-md t:gap-5">
          <div className="cstm-flex-col w-full bg-wht p-2 gap-2 rounded-md">
            <p className="font-body font-semibold text-sm l-s:text-base">Order Details</p>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Pieces
              </p>
              <p>{deliveryData.pieces}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Boxes
              </p>
              <p>{deliveryData.sets}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Payment Type
              </p>
              <p>{deliveryData.paymentType}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Receiving Mode
              </p>
              <p>{deliveryData.receivingType}</p>
            </div>
          </div>

          <div className="cstm-flex-col w-full bg-wht p-2 gap-2 rounded-md">
            <p className="font-body font-semibold text-sm l-s:text-base">Delivery Details</p>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">Receiver</p>
              <p className="whitespace-pre-wrap">{deliveryData.receiverName}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">Address</p>
              <p className="whitespace-pre-wrap">{deliveryData.deliveryAddress}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Date <span className="font-normal italic">eta</span>
              </p>
              <p className="whitespace-pre-wrap cstm-flex-row gap-1">{deliveryData.deliveryDate}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Time <span className="font-normal italic">eta</span>
              </p>
              <p className="whitespace-pre-wrap cstm-flex-row gap-1">{deliveryData.deliveryTime}</p>
            </div>
          </div>

          <div className="cstm-flex-col w-full font-body text-sm bg-wht p-2 gap-2 rounded-md">
            <p className="font-body font-semibold text-sm l-s:text-base">Status</p>
            <p className="font-medium w-full text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
              {deliveryData.status}
            </p>
            <p className="whitespace-pre-wrap text-center">
              Current Location: {deliveryData.statusMessage}
            </p>
          </div>

          <div
            className="cstm-flex-col w-full gap-2
                  t:cstm-flex-row"
          >
            <Link
              to="/tm/c/deliveries"
              className="rounded-md text-center border-blk-mn border-2 p-2 font-head w-full hover:shadow-md transition-all cursor-pointer l-s:text-xl"
            >
              All Deliveries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDelivery;
