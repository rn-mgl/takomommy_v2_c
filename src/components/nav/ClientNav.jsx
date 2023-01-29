import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDeliveryDining, MdOutlineMessage } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { BiLoader } from "react-icons/bi";
import LoggedLogo from "../global/LoggedLogo";

const ClientNav = () => {
  return (
    <div
      className="cstm-flex-row justify-around w-full text-wht
                 t:w-9/12 "
    >
      <LoggedLogo />
      <div
        className="cstm-flex-row mx-auto justify-around w-10/12
                  t:w-8/12
                  l-s:w-6/12"
      >
        <NavLink
          to="/tm/c/menu"
          className={({ isActive }) =>
            `${
              isActive ? "bg-red-mn bg-opacity-30 p-1" : null
            } bg-none hover:bg-red-mn hover:bg-opacity-30 cursor-pointer rounded-sm group relative`
          }
        >
          <p
            className="absolute hidden font-body text-xs p-1 shadow-md left-2/4 -translate-x-2/4 -translate-y-10 transition-all
                    bg-wht text-blk-mn font-medium rounded-sm group-hover:flex
                      t:translate-y-7
                      l-l:text-sm"
          >
            Menu
          </p>
          <GoBook className="t:scale-125" />
        </NavLink>

        <NavLink
          to="/tm/c/preparing"
          className={({ isActive }) =>
            `${
              isActive ? "bg-red-mn bg-opacity-30 p-1" : null
            } bg-none hover:bg-red-mn hover:bg-opacity-30 cursor-pointer rounded-sm group relative`
          }
        >
          <p
            className="absolute hidden font-body text-xs p-1 shadow-md -translate-y-10 transition-all left-2/4 -translate-x-2/4
                    bg-wht text-blk-mn font-medium rounded-sm group-hover:flex
                      t:translate-y-7
                      l-l:text-sm"
          >
            Preparing
          </p>
          <BiLoader className="t:scale-125" />
        </NavLink>

        <NavLink
          to="/tm/c/deliveries"
          className={({ isActive }) =>
            `${
              isActive ? "bg-red-mn bg-opacity-30 p-1" : null
            } bg-none hover:bg-red-mn hover:bg-opacity-30 cursor-pointer rounded-sm relative group`
          }
        >
          <p
            className="absolute hidden font-body text-xs p-1 shadow-md -translate-y-10 transition-all left-2/4 -translate-x-2/4
                    bg-wht text-blk-mn font-medium rounded-sm group-hover:flex
                      t:translate-y-7
                      l-l:text-sm"
          >
            Delivery
          </p>
          <MdOutlineDeliveryDining className="t:scale-125" />
        </NavLink>

        <NavLink
          to="/tm/c/messages"
          className={({ isActive }) =>
            `${
              isActive ? "bg-red-mn bg-opacity-30 p-1" : null
            } bg-none hover:bg-red-mn hover:bg-opacity-30 cursor-pointer rounded-sm group relative`
          }
        >
          <p
            className="absolute hidden font-body text-xs p-1 shadow-md -translate-y-10 transition-all left-2/4 -translate-x-2/4
                    bg-wht text-blk-mn font-medium rounded-sm group-hover:flex
                      t:translate-y-7
                      l-l:text-sm"
          >
            Message
          </p>
          <MdOutlineMessage className="t:scale-125" />
        </NavLink>
      </div>
    </div>
  );
};

export default ClientNav;
