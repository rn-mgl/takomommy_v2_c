import axios from "axios";
import React from "react";
import Input from "../../components/input/Input";
import Button from "../input/Button";
import { useGlobalContext } from "../../context";
import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const ReputationForm = (props) => {
  const [reputation, setReputation] = React.useState(props.reputation);
  const [loading, setLoading] = React.useState(false);

  const { url } = useGlobalContext();
  const token = localStorage.getItem("tm_adm_token");
  const { buyerId } = useParams();

  const handleReputationValue = ({ value }) => {
    setReputation(value);
  };

  const updateReputation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${url}/admin/users/${buyerId}`,
        { reputation: reputation > 100 ? 100 : reputation },
        { headers: { Authorization: token } }
      );

      if (data) {
        props.toggleUpdateReputation();
        props.getUser();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="absolute w-full h-screen backdrop-blur-sm z-10 cstm-flex-col p-5">
      <form
        onSubmit={(e) => updateReputation(e)}
        className={`${
          loading && "bg-wht"
        } bg-white rounded-md w-full p-2 shadow-md cstm-flex-col gap-2`}
      >
        <AiOutlineClose className="ml-auto" onClick={props.toggleUpdateReputation} />
        <p className="font-head text-2xl">Reputation Form</p>
        <Input
          onChange={(e) => handleReputationValue(e.target)}
          css="border-none"
          type="number"
          placeholder="reputation value"
          disabled={loading}
        />
        <Button type="submit" css="bg-blk-mn text-wht" label="Update" />
      </form>
    </div>
  );
};

export default ReputationForm;
