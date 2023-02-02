import React from "react";
import axios from "axios";
import flavors from "../../images/flavors.png";
import Button from "../../components/input/Button";

import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import CancelOrderForm from "../../components/client/CancelOrderForm";

const SinglePreparation = () => {
  const [canCancelOrder, setCanCancelOrder] = React.useState(false);
  const [prepData, setPrepData] = React.useState({});
  const { preparationId } = useParams();

  const { url, socket } = useGlobalContext();
  const token = localStorage.getItem("tm_token");

  const toggleCanCancelOrder = () => {
    setCanCancelOrder((prev) => !prev);
  };

  const getPrepData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/orders/${preparationId}`, {
        headers: { Authorization: token },
      });
      if (data) {
        setPrepData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, token, preparationId]);

  const socketOrderUpdateReflect = React.useCallback(() => {
    socket.on("reflect-update-order", () => {
      getPrepData();
    });
  }, [getPrepData, socket]);

  React.useEffect(() => {
    getPrepData();
  }, [getPrepData]);

  React.useEffect(() => {
    socketOrderUpdateReflect();
  }, [socketOrderUpdateReflect]);

  return (
    <div
      className="p-5 cstm-flex-col bg-white pb-20  gap-5
                t:pt-20 t:pb-5"
    >
      {canCancelOrder && (
        <CancelOrderForm toggleCanCancelOrder={toggleCanCancelOrder} getPrepData={getPrepData} />
      )}
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
            {prepData.variety}
          </p>
        </div>

        <div className="cstm-flex-col w-full gap-2 rounded-md t:gap-5">
          <div className="cstm-flex-col w-full bg-wht p-2 gap-2 rounded-md">
            <p className="font-body font-semibold text-sm l-s:text-base">Order Details</p>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Pieces
              </p>
              <p>{prepData.pieces}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Boxes
              </p>
              <p>{prepData.sets}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Payment Type
              </p>
              <p>{prepData.paymentType}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Receiving Mode
              </p>
              <p>{prepData.receivingType}</p>
            </div>
          </div>

          <div className="cstm-flex-col w-full bg-wht p-2 gap-2 rounded-md">
            <p className="font-body font-semibold text-sm l-s:text-base">Delivery Details</p>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">Receiver</p>
              <p className="whitespace-pre-wrap">{prepData.receiverName}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">Address</p>
              <p className="whitespace-pre-wrap">{prepData.deliveryAddress}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Date <span className="font-normal italic">eta</span>
              </p>
              <p className="whitespace-pre-wrap cstm-flex-row gap-1">{prepData.deliveryDate}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Time <span className="font-normal italic">eta</span>
              </p>
              <p className="whitespace-pre-wrap cstm-flex-row gap-1">{prepData.deliveryTime}</p>
            </div>
          </div>

          <div className="cstm-flex-col w-full font-body text-sm bg-wht p-2 gap-2 rounded-md">
            <p className="font-body font-semibold text-sm l-s:text-base">Status</p>
            <p className="font-medium w-full text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
              {prepData.status}
            </p>
            <p className="whitespace-pre-wrap text-center">{prepData.statusMessage}</p>
          </div>

          <div
            className="cstm-flex-col w-full gap-2
                      t:cstm-flex-row"
          >
            <Link
              to="/tm/c/preparing"
              className="rounded-md text-center border-blk-mn border-2 p-2 font-head w-full hover:shadow-md transition-all cursor-pointer l-s:text-xl"
            >
              All Orders
            </Link>
            {prepData?.status !== "Requesting Cancellation" &&
            prepData?.status !== "Cancellation Confirmed" ? (
              <Button
                onClick={toggleCanCancelOrder}
                css="bg-red-mn text-white"
                label="Cancel Order"
              />
            ) : null}
          </div>

          <p className="text-xs font-body text-justify indent-10">
            <b>Note:</b> You can't cancel order if <b>2 hours</b> has already passed. Send a message{" "}
            <a
              href={`http://192.168.1.121:3000/tm/c/message`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-red-mn underline"
            >
              here
            </a>{" "}
            or in the{" "}
            <a
              href={`http://192.168.1.121:3000/tm/c/message`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-red-mn underline"
            >
              facebook page
            </a>{" "}
            for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePreparation;
