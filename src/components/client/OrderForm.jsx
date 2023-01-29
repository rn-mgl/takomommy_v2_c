import React from "react";

import { AiOutlineClose } from "react-icons/ai";

import Radio from "../input/Radio";
import Input from "../input/Input";
import Button from "../input/Button";

import axios from "axios";
import { useGlobalContext } from "../../context";

const OrderForm = (props) => {
  const [orderData, setOrderData] = React.useState({
    variety: "HAM & CHEESE",
    quantity: 8,
    price: 0,
    paymentType: "",
    receivingType: "",
    receiverName: "",
    deliveryDate: "",
    deliveryTime: "",
    deliveryAddress: "",
  });

  const { url } = useGlobalContext();
  const token = localStorage.getItem("tm_token");

  const clearForm = () => {
    setOrderData({
      variety: "HAM & CHEESE",
      quantity: 8,
      price: 0,
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
        [name]: name === "quantity" ? parseInt(value) : value,
      };
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    orderData.deliveryDate = new Date(orderData.deliveryDate).toLocaleDateString(); // fix UTC

    orderData.deliveryTime = new Date(
      "1970-01-01T" + orderData.deliveryTime + ":00Z"
    ).toLocaleTimeString(); // 24hr format to 12hr

    try {
      const { data } = await axios.post(
        `${url}/orders`,
        { orderData },
        { headers: { Authorization: token } }
      );
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed  w-full h-full backdrop-blur-sm z-10 cstm-flex-col justify-start top-2/4 -translate-y-2/4 overscroll-contain
                t:p-5 t:top-14 t:translate-y-0"
    >
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
            className="w-full rounded-md font-body font-medium text-sm p-3 bg-wht text-blk border-[1px] border-blk-mn"
            id="flavor"
            onChange={(e) => handleOrderData(e.target)}
            required={true}
            name="variety"
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
            className="w-full rounded-md font-body font-medium text-sm p-3 bg-wht text-blk border-[1px] border-blk-mn"
            id="pieces"
            onChange={(e) => handleOrderData(e.target)}
            required={true}
            name="quantity"
          >
            <option value={8}>8 PIECES</option>
            <option value={10}>10 PIECES</option>
            <option value={15}>15 PIECES</option>
            <option value={20}>20 PIECES</option>
          </select>
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
          <div className="cstm-flex-row gap-5 w-full">
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
        </div>

        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="payment">
            Delivery Time
          </label>
          <div className="cstm-flex-row gap-5 w-full">
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
        </div>

        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="payment">
            Delivery Address
          </label>
          <div className="cstm-flex-row gap-5 w-full">
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
        </div>

        <div className="cstm-flex-col gap-3 w-full">
          <label className="font-body text-sm w-full text-left" htmlFor="payment">
            Receiver Name
          </label>
          <div className="cstm-flex-row gap-5 w-full">
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
        </div>

        <div
          className="w-full cstm-flex-col gap-5
                    t:cstm-flex-row"
        >
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
