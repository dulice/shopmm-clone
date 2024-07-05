import React, { useEffect } from "react";
import { Drawer, Navbar } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDevice, toggleDrawer } from "./app/toggleSlice";
import { AnimatePresence, motion } from "framer-motion";
import { slideAnimation } from "./config/motion";
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const { isOpen, isdark, device } = useSelector((state) => state.toggle);
  const handleWindowSize = () => {
    if (window.innerWidth <= 480) {
      dispatch(toggleDevice("mobile"));
    } else if (window.innerWidth <= 768) {
      dispatch(toggleDevice("tablet"));
    } else {
      dispatch(toggleDevice("laptop"));
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSize);
    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  useEffect(() => {
    if (device === "mobile" || device === "tablet") {
      dispatch(toggleDrawer(false));
    }else {
      dispatch(toggleDrawer(true));
    }
  }, [device]);
  useEffect(() => {
    if(!user) {
      navigate('/signin');
    }
  },[])
  return (
    <AnimatePresence>
      <div className={`${isdark ? "dark" : ""} `}>
        <Toaster position="top-center" toastOptions={{duration: 2000}}/>
        {user ? (
          <div className="grid lg:grid-cols-12 grid-cols-8 bg-light-200 dark:bg-dark-300 min-h-screen">
            {isOpen && (
              <motion.div
                {...slideAnimation("left")}
                className="lg:col-span-2 md:col-span-2 col-span-3 relative"
              >
                <Drawer />
              </motion.div>
            )}
            <div
              className={`${
                isOpen
                  ? "lg:col-span-10 md:col-span-6 col-span-5"
                  : "lg:col-span-12 col-span-8"
              } transition-all duration-300 dark:bg-dark-300`}
            >
              <Navbar />
              <Outlet />
            </div>
          </div>
        ) : (
          <div className="dark:bg-dark-100 min-h-screen">
            <Outlet />
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Layout;
