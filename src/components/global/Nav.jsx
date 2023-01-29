import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MdOutlineMoreVert } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import AdminNav from "../nav/AdminNav";
import ClientNav from "../nav/ClientNav";

const Nav = () => {
  const [visibleActions, setVisibleActions] = React.useState(false);

  const isHandler = localStorage.getItem("tm_handler") === "true";
  const navigate = useNavigate();

  const handleVisibleActions = () => {
    setVisibleActions((prev) => !prev);
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div
        className="cstm-flex-row cstm-grdbg-blk-sc-mn fixed z-10 bottom-0 p-2.5 w-full 
                  t:top-0 t:bottom-auto  t:p-4 t:backdrop-blur-sm transition-all"
      >
        {isHandler ? (
          <AdminNav handleVisibleActions={handleVisibleActions} />
        ) : (
          <ClientNav handleVisibleActions={handleVisibleActions} />
        )}

        {visibleActions ? (
          <div
            className="absolute right-0 -translate-y-12 bg-blk-sc p-2 rounded-md font-body text-wht text-sm
                      t:hidden"
          >
            <p
              className="hover:bg-neutral-700 p-1 rounded-md cursor-pointer
                        l-l:text-base"
              onClick={logOut}
            >
              Log Out
            </p>
          </div>
        ) : null}
        <MdOutlineMoreVert
          className="bg-none hover:bg-red-mn hover:bg-opacity-30 cursor-pointer rounded-sm text-wht 
                  t:hidden t:scale-125"
          onClick={handleVisibleActions}
        />
        <div className="group relative">
          <p
            className="absolute hidden font-body text-xs p-1 shadow-md -translate-y-10 transition-all left-2/4 -translate-x-2/4 whitespace-nowrap
                    bg-wht text-blk-mn font-medium rounded-sm group-hover:flex
                      t:translate-y-7
                      l-l:text-sm"
          >
            Log Out
          </p>
          <BiLogOut
            className="m-s:hidden bg-none hover:bg-red-mn hover:bg-opacity-30 cursor-pointer rounded-sm 
                    t:flex text-wht t:scale-125"
            onClick={logOut}
          />
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Nav;
