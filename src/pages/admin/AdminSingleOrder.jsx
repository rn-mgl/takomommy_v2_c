import React from "react";

import axios from "axios";
import flavors from "../../images/flavors.png";
import Button from "../../components/input/Button";

import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";

const AdminSingleOrder = () => {
  const [orderData, setOrderData] = React.useState({});

  const { orderId } = useParams();
  const { url } = useGlobalContext();
  const token = localStorage.getItem("tm_adm_token");
  const navigate = useNavigate();

  const buttonLabelPos =
    orderData.status === "Requesting"
      ? "Prepare"
      : orderData.status === "Requesting Cancellation"
      ? "Confirm Cancellation"
      : orderData.status === "Preparing"
      ? "Deliver"
      : orderData.status === "On Delivery"
      ? "Successful"
      : orderData.status === "Delivery Failed"
      ? "Message Us"
      : "Message Us";

  const buttonLabelNeg =
    orderData.status === "Requesting"
      ? "Deny"
      : orderData.status === "Requesting Cancellation"
      ? "Reject Cancellation"
      : orderData.status === "Preparing"
      ? "Delay"
      : orderData.status === "On Delivery"
      ? "Delivery Failed"
      : orderData.status === "Delivery Failed"
      ? "Cancel"
      : "Cancel";

  const finishedProcess =
    orderData.status === "Successful" ||
    orderData.status === "Cancellation Confirmed" ||
    orderData.status === "Order Rejected" ||
    orderData.status === "Cancelled";

  const getOrderData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin/rcvd_orders/${orderId}`, {
        headers: { Authorization: token },
      });
      if (data) {
        setOrderData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, token, orderId]);

  const respondToOrder = async (status) => {
    try {
      const { data } = await axios.patch(
        `${url}/admin/rcvd_orders/${orderId}`,
        { status },
        { headers: { Authorization: token } }
      );
      if (data) {
        navigate("/tm/a/orders");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getOrderData();
  }, [getOrderData]);

  return (
    <div
      className="p-5 cstm-flex-col bg-white pb-20  gap-5
            t:pt-20 t:pb-5"
    >
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
            {orderData.variety}
          </p>
        </div>

        <div className="cstm-flex-col w-full gap-2 rounded-md t:gap-5">
          <div className="cstm-flex-col w-full bg-wht p-2 gap-2 rounded-md">
            <p className="font-body font-semibold text-sm l-s:text-base">Order Details</p>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Pieces
              </p>
              <p>{orderData.pieces}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Boxes
              </p>
              <p>{orderData.sets}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Payment Type
              </p>
              <p>{orderData.paymentType}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Receiving Mode
              </p>
              <p>{orderData.receivingType}</p>
            </div>
          </div>

          <div className="cstm-flex-col w-full bg-wht p-2 gap-2 rounded-md">
            <p className="font-body font-semibold text-sm l-s:text-base">Delivery Details</p>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">Receiver</p>
              <p className="whitespace-pre-wrap">{orderData.receiverName}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">Address</p>
              <p className="whitespace-pre-wrap">{orderData.deliveryAddress}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Date <span className="font-normal italic">eta</span>
              </p>
              <p className="whitespace-pre-wrap cstm-flex-row gap-1">{orderData.deliveryDate}</p>
            </div>
            <div className="cstm-flex-row w-full font-body text-sm">
              <p className="font-medium mr-auto bg-ylw p-1 px-2 rounded-md text-blk-mn">
                Time <span className="font-normal italic">eta</span>
              </p>
              <p className="whitespace-pre-wrap cstm-flex-row gap-1">{orderData.deliveryTime}</p>
            </div>
          </div>

          <div className="cstm-flex-col w-full font-body text-sm bg-wht p-2 gap-2 rounded-md">
            <p className="font-body font-semibold text-sm l-s:text-base">Status</p>
            <p className="font-medium w-full text-center bg-ylw p-1 px-2 rounded-md text-blk-mn">
              {orderData.status}
            </p>
            <p className="whitespace-pre-wrap text-center">{orderData.statusMessage}</p>
          </div>

          <div className="cstm-flex-col w-full gap-2">
            <Link
              to="/tm/a/orders"
              className="rounded-md text-center border-blk-mn border-2 p-2 font-head w-full hover:shadow-md transition-all cursor-pointer l-s:text-xl"
            >
              All Orders
            </Link>
            {/* no more process if successful, cancellation is confirmed, or order is rejected */}
            {!finishedProcess ? (
              <>
                <Button
                  css="bg-red-mn text-white"
                  label={buttonLabelPos}
                  onClick={() => respondToOrder(buttonLabelPos)}
                />
                <Button
                  css="border-red-mn text-red-mn border-2"
                  label={buttonLabelNeg}
                  onClick={() => respondToOrder(buttonLabelNeg)}
                />
              </>
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

export default AdminSingleOrder;
