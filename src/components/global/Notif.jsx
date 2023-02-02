import React from "react";

const Notif = ({ notif, setNotif }) => {
  if (notif.active) {
    setTimeout(() => {
      setNotif({ msg: "", active: false });
    }, [5000]);
  }

  return (
    notif.active && (
      <div
        className={`${
          notif.active ? "translate-y-10" : "-translate-y-10"
        } fixed font-body font-medium bg-ylw text-blk-mn text-sm top-0 p-2 z-20 rounded-md w-fit transition-all`}
      >
        {notif.msg}
      </div>
    )
  );
};

export default Notif;
