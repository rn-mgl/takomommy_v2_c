import React from "react";
import Button from "../../components/input/Button";
import tupper from "../../images/takoyaki-tupper.png";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logo from "../../components/global/Logo";

const Hero = () => {
  return (
    <div className="h-screen cstm-grdbg-blk-sc-mn cstm-flex-col p-5 gap-10 relative overflow-hidden">
      <Logo />

      <div className="text-center mt-auto">
        <p
          className="font-head text-2xl text-red-mn drop-shadow-md
                    m-l:text-3xl
                    t:text-5xl
                    l-s:text-7xl
                    l-l:text-8xl"
        >
          A TASTE THAT YOU WILL
          <br />
          ALWAYS COME BACK TO
        </p>
        <p
          className="font-body text-sm text-wht
                    t:text-base
                    l-s:text-lg
                    l-l:text-xl"
        >
          takoyaki that you will always remember
        </p>
      </div>
      <div
        className=" cstm-flex-col w-full gap-3
                  t:cstm-flex-row t:w-6/12
                  l-l:w-4/12"
      >
        <Link to="/auth/signup" className="w-full ">
          <Button
            css="border-2 backdrop-blur-sm border-wht text-wht hover:text-blk-mn hover:bg-wht"
            label="Sign Up"
          />
        </Link>
        <Link to="/auth/login" className="w-full">
          <Button css="bg-red-mn text-wht hover:bg-red-sc border-red-mn border-2" label="Log In" />
        </Link>
      </div>
      <a
        href="https://seetakomommy.vercel.app/#prices"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body cstm-flex-row text-wht gap-3 hover:underline mb-auto cursor-pointer"
      >
        <p>see prices and info</p>
        <BsArrowRight />
      </a>
      <img
        src={tupper}
        alt=""
        className="w-full absolute rotate-45 bottom-0 translate-x-20 scale-125
                    t:scale-90 t:translate-x-44 t:translate-y-14
                    l-l:w-9/12 l-l:translate-x-80 l-l:translate-y-64"
      />
    </div>
  );
};

export default Hero;
