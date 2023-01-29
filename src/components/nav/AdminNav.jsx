import React from "react";
import { NavLink } from "react-router-dom";
import { IoPeopleOutline, IoReceiptOutline } from "react-icons/io5";
import { MdOutlineDeliveryDining, MdOutlineMessage } from "react-icons/md";
import LoggedLogo from "../global/LoggedLogo";

const AdminNav = () => {
  return (
    <div
      className="cstm-flex-row justify-around w-full text-wht
                t:w-9/12"
    >
      <LoggedLogo />
      <div
        className="cstm-flex-row mx-auto justify-around w-10/12
                  t:w-8/12
                  l-s:w-6/12"
      >
        <NavLink
          to="/tm/a/orders"
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
            Orders
          </p>
          <IoReceiptOutline />
        </NavLink>

        <NavLink
          to="/tm/a/buyers"
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
            Buyers
          </p>
          <IoPeopleOutline />
        </NavLink>

        <NavLink
          to="/tm/a/deliveries"
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
            Delivery
          </p>
          <MdOutlineDeliveryDining />
        </NavLink>

        <NavLink
          to="/tm/a/messages"
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
            Messages
          </p>
          <MdOutlineMessage />
        </NavLink>
      </div>
    </div>
  );
};

export default AdminNav;
