import React, { useState } from "react";
import {
  BiBell,
  BiDotsVerticalRounded,
  BiEnvelope,
  BiMenu,
  BiPowerOff,
} from "react-icons/bi";
import { CustomButton } from "../custom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer, toggleMode } from "../app/toggleSlice";
import { IoInvertMode } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/userSlice";

const Navbar = () => {
  const { isOpen } = useSelector((state) => state.toggle);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawer = () => {
    dispatch(toggleDrawer(!isOpen));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
    setShow(false);
  };

  const handleMode = () => {
    dispatch(toggleMode());
    setShow(false);
  }

  return (
    <nav className="sticky top-0 w-full bg-light-200 dark:bg-dark-200 text-black dark:text-white z-20 transition-all duration-300">
      <div className="flex justify-between items-baseline p-4">
        <div className="flex align-baseline">
          <CustomButton
            onClick={handleDrawer}
            title={<BiMenu size={25} />}
            variant="btn-primary"
          />
          <input
            className="input ml-4"
            type="text"
            placeholder="Search for something..."
          />
        </div>
        <div className="flex md:flex-row flex-col relative">
          <CustomButton
            title={<BiDotsVerticalRounded size={25} />}
            variant="btn"
            onClick={() => setShow(!show)}
            customStyle="md:hidden block"
          />
          <div className={`md:block ${show ? 'block card absolute top-10 right-4' : 'hidden'}`}>
            <CustomButton
              title={<IoInvertMode size={25} />}
              variant="btn"
              onClick={handleMode}
            />
            <CustomButton title={<BiEnvelope size={25} />} variant="btn" />
            <CustomButton title={<BiBell size={25} />} variant="btn" />
            <CustomButton
              title={<BiPowerOff size={25} />}
              variant="btn"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
