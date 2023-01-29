import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

import axios from "axios";
import { useGlobalContext } from "../../context";

import Input from "../../components/input/Input";
import Button from "../../components/input/Button";
import Logo from "../../components/global/Logo";

const SignUp = () => {
  const [signUpData, setSignUpData] = React.useState({
    name: "",
    surname: "",
    password: "",
    email: "",
    number: "",
  });

  const { url } = useGlobalContext();

  const signUp = async (e) => {
    e.preventDefault();
    const { name, surname, email, number, password } = signUpData;
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
    }
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
          />
          <Input
            type="text"
            placeholder="surname"
            name="surname"
            value={signUpData.surname}
            onChange={(e) => handleSignData(e.target)}
            required={true}
            css="focus:outline-ylw"
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={signUpData.password}
            onChange={(e) => handleSignData(e.target)}
            required={true}
            css="focus:outline-ylw"
          />
          <Input
            type="email"
            placeholder="email"
            name="email"
            value={signUpData.email}
            onChange={(e) => handleSignData(e.target)}
            required={true}
            css="focus:outline-ylw"
          />
          <Input
            type="text"
            placeholder="number"
            name="number"
            value={signUpData.number}
            onChange={(e) => handleSignData(e.target)}
            required={true}
            css="focus:outline-ylw"
          />
          <Button label="Sign Up" css="bg-blk-mn text-wht" />
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
