import React from "react";
import Radio from "../input/Radio";

const OrderFilter = (props) => {
  return (
    <div
      className="w-full cstm-flex-row gap-3 overflow-x-auto justify-start
                l-s:w-10/12"
    >
      <Radio
        label="All Orders"
        checked={props.filter === "All"}
        name="All"
        value="All"
        onChange={() => props.handleFilter("All")}
      />
      <Radio
        label="Requests"
        checked={props.filter === "Requests"}
        name="Requests"
        value="Requests"
        onChange={() => props.handleFilter("Requests")}
      />
      <Radio
        label="Prepare"
        checked={props.filter === "Prepare"}
        name="Prepare"
        value="Prepare"
        onChange={() => props.handleFilter("Prepare")}
      />
      <Radio
        label="Delivery"
        checked={props.filter === "Delivery"}
        name="Delivery"
        value="Delivery"
        onChange={() => props.handleFilter("Delivery")}
      />
      <Radio
        label="Successful"
        checked={props.filter === "Successful"}
        name="Successful"
        value="Successful"
        onChange={() => props.handleFilter("Successful")}
      />
      <Radio
        label="Cancel"
        checked={props.filter === "Cancel"}
        name="Cancel"
        value="Cancel"
        onChange={() => props.handleFilter("Cancel")}
      />
    </div>
  );
};

export default OrderFilter;
