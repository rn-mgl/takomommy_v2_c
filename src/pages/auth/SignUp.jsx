import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

import axios from "axios";
import { useGlobalContext } from "../../context";
import * as textFns from "../../functions/textFns";

import Input from "../../components/input/Input";
import Button from "../../components/input/Button";
import Logo from "../../components/global/Logo";
import Notif from "../../components/global/Notif";

const SignUp = () => {
  const [signUpData, setSignUpData] = React.useState({
    name: "",
    surname: "",
    password: "",
    email: "",
    number: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [notif, setNotif] = React.useState({ msg: "", active: false });

  const { url } = useGlobalContext();

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, surname, email, number, password } = signUpData;
    if (
      textFns.isBothBW(name) ||
      textFns.isBothBW(surname) ||
      textFns.isBothBW(email) ||
      textFns.isBothBW(number) ||
      textFns.isBothBW(password)
    ) {
      setNotif({ msg: "Please enter appropriate values.", active: true });
      return;
    }
    try {
      const { data } = await axios.post(`${url}/auth/reg`, {
        name,
        surname,
        email,
        number,
        password,
      });

      if (data) {
        setSignUpData({
          name: "",
          surname: "",
          password: "",
          email: "",
          number: "",
        });
      }
    } catch (error) {
      console.log(error);
      setNotif({ msg: error.response.data.msg, active: true });
    }
    setLoading(false);
  };

  const handleSignData = ({ name, value }) => {
    setSignUpData((prev) => {
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
        className="h-3/6 w-full rounded-t-md bg-white cstm-flex-col
                  l-s:h-5/6 l-s:rounded-tr-none l-s:rounded-l-md"
      >
        <form
          onSubmit={(e) => signUp(e)}
          className=" cstm-flex-col justify-evenly p-5 h-full w-full 
                    t:w-8/12
                    l-s:justify-center l-s:gap-3"
        >
          <Input
            type="text"
            placeholder="name"
            name="name"
            value={signUpData.name}
            onChange={(e) => handleSignData(e.target)}
            required={true}
            css="focus:outline-ylw"
            disabled={loading}
          />
          <Input
            type="text"
            placeholder="surname"
            name="surname"
            value={signUpData.surname}
            onChange={(e) => handleSignData(e.target)}
            required={true}
            css="focus:outline-ylw"
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={signUpData.password}
            onChange={(e) => handleSignData(e.target)}
            required={true}
            css="focus:outline-ylw"
            disabled={loading}
          />
          <Input
            type="email"
            placeholder="email"
            name="email"
            value={signUpData.email}
            onChange={(e) => handleSignData(e.target)}
            required={true}
            css="focus:outline-ylw"
            disabled={loading}
          />
          <Input
            type="text"
            placeholder="number"
            name="number"
            value={signUpData.number}
            onChange={(e) => handleSignData(e.target)}
            required={true}
            css="focus:outline-ylw"
            disabled={loading}
          />
          <Button label="Sign Up" css="bg-blk-mn text-wht" disabled={loading} />
        </form>
      </div>
      <div
        className="h-2/6 w-full rounded-b-md cstm-grdbg-red-mn-sc cstm-flex-col shadow-md
                  l-s:h-5/6 l-s:rounded-l-none l-s:rounded-r-md"
      >
        <p
          className="text-wht font-head drop-shadow-md text-2xl
                    t:text-3xl
                    l-l:text-4xl"
        >
          Welcome!
        </p>
        <p
          className="text-wht font-body text-sm
                    t:text-base"
        >
          already have an account?
        </p>
        <Link
          to="/auth/login"
          className="font-body cstm-flex-row gap-3 text-wht border-wht border-2 w-60 rounded-full p-2 mt-3 hover:shadow-md"
        >
          <p
            className="text-sm 
                      t:text-base"
          >
            log in
          </p>
          <BsArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
