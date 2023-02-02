import React from "react";

import { AiOutlineClose } from "react-icons/ai";
import { takoPrice } from "../../data/takoPrice";
import { useGlobalContext } from "../../context";

import Radio from "../input/Radio";
import Input from "../input/Input";
import Button from "../input/Button";
import axios from "axios";

import * as textFns from "../../functions/textFns";
import Notif from "../global/Notif";

const OrderForm = (props) => {
  const [notif, setNotif] = React.useState({ msg: "", active: false });
  const [orderData, setOrderData] = React.useState({
    variety: "HAM & CHEESE",
    pieces: 8,
    sets: 1,
    price: takoPrice["HAM & CHEESE"][8],
    paymentType: "",
    receivingType: "",
    receiverName: "",
    deliveryDate: "",
    deliveryTime: "",
    deliveryAddress: "",
  });

  const { url, socket } = useGlobalContext();
  const token = localStorage.getItem("tm_token");
  const id = localStorage.getItem("tm_id");

  const socketPlaceOrder = () => {
    socket.emit("place-order", { room: id });
  };

  const clearForm = () => {
    setOrderData({
      variety: "HAM & CHEESE",
      pieces: 8,
      sets: 1,
      price: takoPrice["HAM & CHEESE"][8],
      paymentType: "",
      receivingType: "",
      receiverName: "",
      deliveryDate: "",
      deliveryTime: "",
      deliveryAddress: "",
    });
  };

  const handleOrderData = ({ name, value }) => {
    setOrderData((prev) => {
      return {
        ...prev,
        //change price if variety, pieces, or sets are changed,
        //did not use reducer because only dependent on few values and requires form for data
        price:
          name === "pieces"
            ? takoPrice[prev.variety][value] * prev.sets
            : name === "variety"
            ? takoPrice[value][prev.pieces] * prev.sets
            : name === "sets"
            ? takoPrice[prev.variety][prev.pieces] * parseInt(value)
            : prev.price,
        [name]: name === "pieces" ? parseInt(value) : value,
      };
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    orderData.deliveryDate = new Date(orderData.deliveryDate).toLocaleDateString(); // fix UTC

    orderData.deliveryTime = new Date(
      "1970-01-01T" + orderData.deliveryTime + ":00Z"
    ).toLocaleTimeString(); // 24hr format to 12hr

    const { deliveryAddress, receiverName } = orderData;

    if (textFns.isBothBW(deliveryAddress) || textFns.isBothBW(receiverName)) {
      setNotif({ msg: "Please enter appropriate values.", active: true });
      return;
    }

    try {
      const { data } = await axios.post(
        `${url}/orders`,
        { orderData },
        { headers: { Authorization: token } }
      );
      if (data) {
        setOrderData((prev) => {
          return {
            ...prev,
            variety: "HAM & CHEESE",
            pieces: 8,
            sets: 1,
            price: takoPrice["HAM & CHEESE"][8],
            paymentType: "",
            receivingType: "",
            deliveryDate: "",
            deliveryTime: "",
          };
        });
        socketPlaceOrder();
      }
    } catch (error) {
      console.log(error);
      setNotif({ msg: error.response.data.msg, active: true });
    }
  };

  return (
    <div
      className="fixed  w-full h-full backdrop-blur-sm z-10 cstm-flex-col justify-start top-2/4 -translate-y-2/4 overscroll-contain
                t:p-5 t:top-14 t:translate-y-0"
    >
      {notif && <Notif notif={notif} setNotif={setNotif} />}
      <form
        onSubmit={(e) => placeOrder(e)}
        className="w-11/12 h-[92%] bg-white rounded-md p-5 overflow-y-auto cstm-flex-col justify-start gap-5 shadow-md overscroll-contain
                  l-s:w-7/12"
      >
        <div className="ml-auto cursor-pointer">
          <AiOutlineClose onClick={props.toggleCanOrder} />
        </div>

        <p className="font-head text-blk-mn cstm-flex-col text-xl">Order Form</p>
        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="flavor">
            Flavor
          </label>
          <select
            className="w-full rounded-md font-body text-sm p-3 bg-wht text-blk border-[1px] border-blk-mn"
            id="flavor"
            onChange={(e) => handleOrderData(e.target)}
            required={true}
            name="variety"
            value={orderData.variety}
          >
            <option value="HAM & CHEESE">HAM & CHEESE</option>
            <option value="SPAM & CHEESE">SPAM & CHEESE</option>
            <option value="CRAB & CORN">CRAB & CORN</option>
            <option value="OCTOBITS">OCTOBITS</option>
          </select>
        </div>

        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="pieces">
            Pieces
          </label>
          <select
            className="w-full rounded-md font-body text-sm p-3 bg-wht text-blk border-[1px] border-blk-mn"
            id="pieces"
            onChange={(e) => handleOrderData(e.target)}
            required={true}
            name="pieces"
            value={orderData.pieces}
          >
            <option value={8}>8 PIECES</option>
            <option value={10}>10 PIECES</option>
            <option value={15}>15 PIECES</option>
            <option value={20}>20 PIECES</option>
          </select>
        </div>

        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="pieces">
            Number of Boxes
          </label>
          <Input
            onChange={(e) => handleOrderData(e.target)}
            type="number"
            placeholder="Number of Boxes"
            value={orderData.sets}
            required={true}
            css="cursor-pointer p-3"
            name="sets"
          />
        </div>

        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="paymentType">
            Payment Type
          </label>
          <div className="cstm-flex-row gap-5 w-full">
            <Radio
              onChange={(e) => handleOrderData(e.target)}
              value="GCash"
              name="paymentType"
              label="GCash"
              checked={orderData.paymentType === "GCash"}
            />
            <Radio
              onChange={(e) => handleOrderData(e.target)}
              value="Cash on Delivery"
              name="paymentType"
              label="COD"
              checked={orderData.paymentType === "Cash on Delivery"}
            />
          </div>
        </div>

        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="receivingType">
            Receiving Mode
          </label>
          <div className="cstm-flex-row gap-5 w-full">
            <Radio
              onChange={(e) => handleOrderData(e.target)}
              value="Pick Up"
              name="receivingType"
              label="Pick Up"
              checked={orderData.receivingType === "Pick Up"}
            />
            <Radio
              onChange={(e) => handleOrderData(e.target)}
              value="Delivery"
              name="receivingType"
              label="Delivery"
              checked={orderData.receivingType === "Delivery"}
            />
          </div>
        </div>

        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="payment">
            Delivery Date
          </label>
          <Input
            onChange={(e) => handleOrderData(e.target)}
            type="date"
            placeholder="date"
            value={orderData.deliveryDate}
            required={true}
            css="cursor-pointer p-3"
            name="deliveryDate"
          />
        </div>

        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="payment">
            Delivery Time
          </label>
          <Input
            onChange={(e) => handleOrderData(e.target)}
            type="time"
            placeholder="time"
            value={orderData.deliveryTime}
            required={true}
            css="cursor-pointer p-3"
            name="deliveryTime"
          />
        </div>

        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="payment">
            Delivery Address
          </label>
          <Input
            onChange={(e) => handleOrderData(e.target)}
            type="text"
            placeholder="Address"
            value={orderData.deliveryAddress}
            required={true}
            name="deliveryAddress"
            css="p-3"
          />
        </div>

        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="payment">
            Receiver Name
          </label>
          <Input
            onChange={(e) => handleOrderData(e.target)}
            type="text"
            placeholder="Receiver"
            value={orderData.receiverName}
            required={true}
            name="receiverName"
            css="p-3"
          />
        </div>

        <div
          className="w-full cstm-flex-col gap-5
                    t:cstm-flex-row"
        >
          <p className="mr-auto font-body font-medium">Price: {orderData.price}.00</p>
          <Button
            css="border-2 border-blk-mn p-3 
                t:w-48"
            label="Clear Form"
            type="button"
            onClick={clearForm}
          />

          <Button
            css="bg-red-mn text-wht p-3
              t:w-48"
            type="submit"
            label="Place Order"
          />
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
