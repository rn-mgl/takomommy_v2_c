import React from "react";
import { takoPrice } from "../../data/takoPrice";
import Button from "../../components/input/Button";
import flavor from "../../images/flavors.png";
import OrderForm from "../../components/client/OrderForm";
import { Link } from "react-router-dom";

const SingleFlavor = () => {
  const [canOrder, setCanOrder] = React.useState(false);

  const path = window.location.pathname.split("/");

  const currFlavor =
    path[4] === "hc"
      ? "HAM & CHEESE"
      : path[4] === "sc"
      ? "SPAM & CHEESE"
      : path[4] === "cc"
      ? "CRAB & CORN"
      : path[4] === "ob"
      ? "OCTOBITS"
      : undefined;

  const toggleCanOrder = () => {
    setCanOrder((prev) => !prev);
  };

  return (
    <div
      className="w-full min-h-screen cstm-grdbg-blk-sc-mn cstm-flex-col justify-start p-5 pb-20 gap-2 overflow-hidden
                t:py-20"
    >
      {canOrder && <OrderForm toggleCanOrder={toggleCanOrder} />}
      <p
        className="font-head text-wht text-2xl 
                  t:text-3xl
                  l-s:text-4xl
                  l-l:text-5xl"
      >
        {currFlavor}
      </p>

      <p className="font-body italic text-wht text-base">PRICE PER SET</p>
      <div
        className="t:cstm-flex-row mt-auto bg-wht p-2 rounded-md
                  t:w-10/12
                  l-s:w-7/12
                  l-l:w-6/12"
      >
        <img
          className="w-full cstm-grdbg-ylw-orng rounded-t-md shadow-md
                  t:w-3/6 t:mr-auto t:rounded-tr-none t:rounded-l-md"
          src={flavor}
          alt="flavor"
        />
        <div
          className="cstm-flex-col w-full gap-3 cstm-grdbg-red-mn-sc rounded-b-md p-3 font-medium 
                    t:p-5 t:w-3/6 t:rounded-r-md t:rounded-bl-none t:self-stretch t:text-lg"
        >
          <div className="cstm-flex-row text-wht font-body w-full">
            <p className="mr-auto">8 PIECES</p>
            <p>P {takoPrice[currFlavor][8]}</p>
          </div>
          <div className="cstm-flex-row text-wht font-body w-full">
            <p className="mr-auto">10 PIECES</p>
            <p>P {takoPrice[currFlavor][10]}</p>
          </div>
          <div className="cstm-flex-row text-wht font-body w-full">
            <p className="mr-auto">15 PIECES</p>
            <p>P {takoPrice[currFlavor][15]}</p>
          </div>
          <div className="cstm-flex-row text-wht font-body w-full">
            <p className="mr-auto">20 PIECES</p>
            <p>P {takoPrice[currFlavor][20]}</p>
          </div>
        </div>
      </div>
      <div
        className="w-full cstm-flex-col mt-5 gap-3 mb-auto 
                  t:cstm-flex-row"
      >
        <Link
          className="rounded-md text-center p-2 font-head w-full hover:shadow-md transition-all cursor-pointer
                text-wht border-2 text-base
                  t:w-44 
                  l-s:w-52 l-s:text-xl l-s:p-3"
          to="/tm/c/menu"
        >
          All Flavors
        </Link>
        <Button
          css="text-wht bg-red-mn text-base 
            t:w-44 
            l-s:w-52"
          label="Create Order"
          onClick={toggleCanOrder}
        />
      </div>
    </div>
  );
};

export default SingleFlavor;
