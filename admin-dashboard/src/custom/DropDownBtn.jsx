import React, { useState } from "react";
import DropDown from "./DropDown";
import { BiChevronDown } from "react-icons/bi";

const DropDownBtn = ({ route }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className={`select-none ${
          show
            ? "bg-light-300 dark:bg-dark-100"
            : "bg-light-200 dark:bg-dark-200"
        }`}
      >
        <div
          onClick={() => setShow(!show)}
          className="py-2 px-4 flex items-center justify-between hover"
        >
          <div className="flex items-center gap-3">
            <route.icon size={20} />
            <span>{route.name}</span>
          </div>
          <BiChevronDown size={20} />
        </div>
        {show && <DropDown route={route} />}
      </div>
    </>
  );
};

export default DropDownBtn;
