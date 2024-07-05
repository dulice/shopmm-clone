import React from "react";
import notfound from "../assets/404.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center">
      <Link to={"/"}>
        <img src={notfound} alt="" className="h-screen object-contain" />
      </Link>
    </div>
  );
};

export default NotFound;
