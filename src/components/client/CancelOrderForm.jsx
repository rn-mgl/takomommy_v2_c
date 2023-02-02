import React from "react";

import Radio from "../../components/input/Radio";
import Input from "../../components/input/Input";
import Button from "../../components/input/Button";
import axios from "axios";
import Notif from "../global/Notif";
import * as textFns from "../../functions/textFns";

import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from "../../context";

const CancelOrderForm = (props) => {
  const [reason, setReason] = React.useState("");
  const [notif, setNotif] = React.useState({ msg: "", active: false });

  const handleReason = ({ value }) => {
    setReason(value);
  };

  const { url } = useGlobalContext();
  const { preparationId } = useParams();
  const token = localStorage.getItem("tm_token");

  const requestCancel = async (e) => {
    e.preventDefault();
    if (textFns.isBothBW(reason)) {
      setNotif({ msg: "Please enter appropriate values.", active: true });
      return;
    }
    try {
      const { data } = await axios.patch(
        `${url}/orders/${preparationId}`,
        { reason },
        { headers: { Authorization: token } }
      );
      if (data) {
        props.getPrepData();
        props.toggleCanCancelOrder();
      }
    } catch (error) {
      console.log(error);
      setNotif({ msg: error.response.data.msg, active: true });
    }
  };

  return (
    <div
      className="backdrop-blur-sm fixed w-full min-h-screen top-0 left-0 z-10 p-5 cstm-flex-col justify-start
                t:pt-20"
    >
      {notif && <Notif notif={notif} setNotif={setNotif} />}
      <div
        className="w-11/12 h-fit  bg-white border-blk-mn border-[1px] shadow-md absolute rounded-md p-5 cstm-flex-col justify-start
                  t:w-8/12
                  l-s:w-6/12"
      >
        <div className="ml-auto cursor-pointer">
          <AiOutlineClose onClick={props.toggleCanCancelOrder} className="ml-auto" />
        </div>

        <p className="font-head text-xl mb-5">Cancellation Reason</p>

        <form className="w-full cstm-flex-col gap-3" onSubmit={(e) => requestCancel(e)}>
          <Radio
            name="reason"
            checked={reason === "Wrong Variety"}
            value="Wrong Variety"
            label="Wrong Variety"
            onChange={(e) => handleReason(e.target)}
          />
          <Radio
            name="reason"
            checked={reason === "Wrong Pieces"}
            value="Wrong Pieces"
            label="Wrong Pieces"
            onChange={(e) => handleReason(e.target)}
          />
          <Radio
            name="reason"
            checked={reason === "Wrong Sets"}
            value="Wrong Sets"
            label="Wrong Sets"
            onChange={(e) => handleReason(e.target)}
          />
          <Radio
            name="reason"
            checked={reason === "Wrong Payment Type"}
            value="Wrong Payment Type"
            label="Wrong Payment Type"
            onChange={(e) => handleReason(e.target)}
          />
          <Radio
            name="reason"
            checked={reason === "Wrong Receiving Mode"}
            value="Wrong Receiving Mode"
            label="Wrong Receiving Mode"
            onChange={(e) => handleReason(e.target)}
          />
          <Radio
            name="reason"
            checked={reason === "Wrong Receiver"}
            value="Wrong Receiver"
            label="Wrong Receiver"
            onChange={(e) => handleReason(e.target)}
          />
          <Radio
            name="reason"
            checked={reason === "Wrong Schedule"}
            value="Wrong Schedule"
            label="Wrong Schedule"
            onChange={(e) => handleReason(e.target)}
          />
          <Radio
            name="reason"
            checked={reason === "Wrong Address"}
            value="Wrong Address"
            label="Wrong Address"
            onChange={(e) => handleReason(e.target)}
          />
          <Input
            type="text"
            placeholder="other reasons"
            name="reason"
            onChange={(e) => handleReason(e.target)}
          />
          <Button type="submit" label="Send Cancellation" css="bg-ylw text-blk-mn t:w-fit" />
        </form>
      </div>
    </div>
  );
};

export default CancelOrderForm;
