import React from "react";

import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { menu } from "../../data/takoMenu";

import flavors from "../../images/flavors.png";
import OrderForm from "../../components/client/OrderForm";
import Button from "../../components/input/Button";

const Menu = () => {
  const [canOrder, setCanOrder] = React.useState(false);

  const toggleCanOrder = () => {
    setCanOrder((prev) => !prev);
  };

  return (
    <div
      className="bg-wht min-h-screen h-auto p-5 pb-20 cstm-flex-col gap-5
                  t:p-20 t:gap-10"
    >
      {canOrder && <OrderForm toggleCanOrder={toggleCanOrder} />}
      <p
        className="font-head text-3xl drop-shadow-md
                  l-s:text-5xl"
      >
        TAKO MENU
      </p>
      {menu.map(({ variation }) => {
        const path = variation.startsWith("HAM")
          ? "hc"
          : variation.startsWith("SPAM")
          ? "sc"
          : variation.startsWith("CRAB")
          ? "cc"
          : variation.startsWith("OCT")
          ? "ob"
          : "";
        return (
          <React.Fragment key={variation}>
            <div
              className="cstm-flex-col text-center w-full gap-3
                  t:w-full t:gap-5
                  l-s:w-9/12"
            >
              <div
                className="cstm-flex-col w-full fil
                    t:cstm-flex-row"
              >
                <div
                  className={`${
                    /* alternate cards depending on path */
                    path === "sc" || path === "ob"
                      ? "t:order-2 t:rounded-r-md"
                      : "t:order-1 t:rounded-l-md"
                  } w-full bg-white font-head text-lg rounded-t-md p-2 cstm-flex-col self-stretch
                       m-l:text-2xl
                       t:w-6/12 t:rounded-t-none  t:shadow-md
                       l-s:text-3xl`}
                >
                  {variation}
                </div>
                <img
                  className={`${
                    path === "sc" || path === "ob"
                      ? "t:order-1 t:rounded-l-md t:rounded-br-none"
                      : "t:order-2 t:rounded-r-md t:rounded-b-none"
                  } w-full cstm-grdbg-ylw-orng p-2 rounded-b-md shadow-md
                      t:w-6/12 `}
                  src={flavors}
                  alt="flavors"
                />
              </div>
              <Link to={`/tm/c/menu/${path}`}>
                <p
                  className="cstm-flex-row gap-3 hover:underline font-body text-sm
                      m-l:text-base
                      t:text-lg
                      l-s:text-xl"
                >
                  see variations or order <BsArrowRight />
                </p>
              </Link>
            </div>
          </React.Fragment>
        );
      })}
      <div
        className="w-full cstm-flex-row
                  l-s:w-9/12"
      >
        <Button
          css="bg-red-mn text-wht
            t:w-48 t:ml-auto"
          onClick={toggleCanOrder}
          label="Create Order"
        />
      </div>
    </div>
  );
};

export default Menu;
