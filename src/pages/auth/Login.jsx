import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import Input from "../../components/input/Input";
import Button from "../../components/input/Button";
import Logo from "../../components/global/Logo";
import * as textFns from "../../functions/textFns";
import Notif from "../../components/global/Notif";

import axios from "axios";
import { useGlobalContext } from "../../context";

const Login = () => {
  const [loginData, setLoginData] = React.useState({
    candidate_email: "",
    candidate_password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [notif, setNotif] = React.useState({ msg: "", active: false });

  const { url } = useGlobalContext();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { candidate_email, candidate_password } = loginData;
    if (textFns.isBothBW(candidate_email) || textFns.isBothBW(candidate_password)) {
      setNotif({ msg: "Please enter appropriate values.", active: true });
      return;
    }
    try {
      const { data } = await axios.post(`${url}/auth/log`, { candidate_email, candidate_password });
      if (data) {
        localStorage.setItem("tm_id", data.id);
        localStorage.setItem("tm_handler", data.handler);
        localStorage.setItem("tm_verified", data.verified);
        setLoginData({
          candidate_email: "",
          candidate_password: "",
        });
        if (data.handler) {
          localStorage.setItem("tm_adm_token", `Admin__Bearer__Token ${data.token}`);
          navigate("/tm/a/orders");
        } else {
          localStorage.setItem("tm_token", `Bearer ${data.token}`);
          navigate("/tm/c/menu");
        }
      }
    } catch (error) {
      console.log(error);
      setNotif({ msg: error.response.data.msg, active: true });
    }
    setLoading(false);
  };

  const handleLoginData = ({ name, value }) => {
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div
      className="h-screen min-h-screen bg-wht p-5 cstm-flex-col relative overflow-hidden
            l-s:cstm-flex-row"
    >
      {notif && <Notif notif={notif} setNotif={setNotif} />}
      <Logo />
      <div
        className="h-2/6 w-full rounded-t-md bg-white cstm-flex-col
              l-s:h-5/6 l-s:rounded-tl-none l-s:rounded-r-md l-s:order-2 l-s:shadow-md"
      >
        <form
          onSubmit={(e) => login(e)}
          className="cstm-flex-col justify-center p-5 h-full w-full gap-3
                t:w-8/12"
        >
          <Input
            type="text"
            placeholder="email"
            name="candidate_email"
            value={loginData.candidate_email}
            onChange={(e) => handleLoginData(e.target)}
            required={true}
            css="focus:outline-ylw"
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="password"
            name="candidate_password"
            value={loginData.candidate_password}
            onChange={(e) => handleLoginData(e.target)}
            required={true}
            css="focus:outline-ylw"
            disabled={loading}
          />
          <Button label="Log In" css="bg-blk-mn text-wht" disabled={loading} />
        </form>
      </div>
      <div
        className="h-2/6 w-full rounded-b-md cstm-grdbg-ylw-orng cstm-flex-col shadow-md
              l-s:h-5/6 l-s:rounded-r-none l-s:rounded-l-md l-s:order-1"
      >
        <p
          className="text-blk-mn font-head drop-shadow-md text-2xl
                t:text-3xl
                l-l:text-4xl"
        >
          Hello!
        </p>
        <p
          className="text-blk-mn font-body text-sm
                t:text-base"
        >
          don't have an account yet?
        </p>
        <Link
          to="/auth/signup"
          className="font-body cstm-flex-row gap-3 text-blk-mn border-blk-mn border-2 w-60 rounded-full p-2 mt-3 hover:shadow-md"
        >
          <p
            className="text-sm 
                  t:text-base"
          >
            sign up
          </p>
          <BsArrowLeft />
        </Link>
      </div>
    </div>
  );
};

export default Login;
