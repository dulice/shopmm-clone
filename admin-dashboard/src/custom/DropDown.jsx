import React from "react";
import { Link, useLocation } from "react-router-dom";
const DropDown = ({ route }) => {
  const location = useLocation();
  return (
    <>
      {route.children.map((child) => (
        <Link key={child.name} to={`${route.path}/${child.path}`}>
          <div
            className={`py-2 px-10 hover ${
              location.pathname === `${route.path}/${child.path}`
                ? "active"
                : ""
            }`}
          >
            {child.name}
          </div>
        </Link>
      ))}
    </>
  );
};

export default DropDown;
