import React from "react";
import axios from "axios";

import * as dateFns from "../../functions/dateFns";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { GoPrimitiveDot } from "react-icons/go";

import Notif from "../../components/global/Notif";
import Button from "../../components/input/Button";
import ReputationForm from "../../components/admin/ReputationForm";

const SingleUser = () => {
  const [userData, setUserData] = React.useState({});
  const [canUpdateReputation, setCanUpdateReputation] = React.useState(false);
  const [notif, setNotif] = React.useState({ msg: "", active: false });

  const { url } = useGlobalContext();
  const token = localStorage.getItem("tm_adm_token");
  const { buyerId } = useParams();

  const toggleUpdateReputation = () => [setCanUpdateReputation((prev) => !prev)];

  const getUser = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin/users/${buyerId}`, {
        headers: { Authorization: token },
      });
      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
      setNotif({ msg: error.response.data.msg, active: true });
    }
  }, [url, token, buyerId]);

  React.useEffect(() => {
    getUser();
  }, [getUser]);

  console.log(userData);

  return (
    <div className="p-5 pb-20 cstm-flex-col gap-2 t:pt-20 t:pb-5 h-screen">
      {notif && <Notif notif={notif} setNotif={setNotif} />}
      {canUpdateReputation && (
        <ReputationForm
          toggleUpdateReputation={toggleUpdateReputation}
          getUser={getUser}
          reputation={userData?.reputation}
        />
      )}
      <p className="font-head text-2xl">Buyer Details</p>
      <div className="cstm-flex-col gap-2 w-full t:w-8/12 my-auto l-s:w-6/12">
        <div className=" w-full cstm-grdbg-blk-sc-mn p-2 rounded-md text-wht cstm-flex-col font-body">
          <p className="font-head capitalize l-s:text-lg">
            {userData.name} {userData.surname}
          </p>
          <p className="text-xs l-s:text-sm">{userData.email}</p>
        </div>
        <div className=" w-full bg-wht p-2 rounded-md text-blk-mn cstm-flex-col font-body text-sm gap-2 l-s:text-sm">
          <div className="text-center cstm-flex-row w-full">
            <p className="font-semibold mr-auto bg-blk-mn text-wht p-1 rounded-md">Phone Number</p>
            <p className="text-xs l-s:text-sm">{userData.number}</p>
          </div>
          <div className="text-center cstm-flex-row w-full">
            <p className="font-semibold mr-auto bg-blk-mn text-wht p-1 rounded-md">Joined On</p>
            <div className="text-xs cstm-flex-row gap-2  l-s:text-sm">
              <p>{dateFns.localDate(userData.createdAt)}</p> <GoPrimitiveDot />{" "}
              <p>{dateFns.localTime(userData.createdAt)}</p>
            </div>
          </div>
          <div className="text-center cstm-flex-row w-full">
            <p className="font-semibold mr-auto bg-blk-mn text-wht p-1 rounded-md">Reputation</p>
            <p className="text-xs l-s:text-sm">{userData.reputation}</p>
          </div>
          <div className="text-center cstm-flex-row w-full">
            <p className="font-semibold mr-auto bg-blk-mn text-wht p-1 rounded-md">Verified</p>
            <p className="text-xs l-s:text-sm">{userData.isVerified ? "Yes" : "No"}</p>
          </div>
        </div>
        <div className="cstm-flex-col w-full gap-2">
          <Link
            to="/tm/a/buyers"
            className="rounded-md text-center border-blk-mn border-2 p-2 font-head w-full hover:shadow-md transition-all cursor-pointer l-s:text-xl"
          >
            All Buyers
          </Link>
          <Button
            onClick={toggleUpdateReputation}
            css="bg-blk-mn text-wht"
            label="Update Reputation"
          />
          <Link
            to={`/tm/a/messages/${userData._id}`}
            className="border-red-mn text-red-mn border-2 rounded-md text-center p-2 font-head w-full hover:shadow-md transition-all cursor-pointer l-s:text-xl"
          >
            Message
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
