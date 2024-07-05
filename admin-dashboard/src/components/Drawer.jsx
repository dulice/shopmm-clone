import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDownBtn from "../custom/DropDownBtn";
import { routes } from "../config/constant";
import avatar from "../assets/user.jpg";

const Drawer = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="sticky left-0 top-0 w-full overflow-y-auto bg-light-200 dark:bg-dark-200 text-black dark:text-white h-screen transition-all duration-300">
      <div className="my-8 px-4">
        <img src={user.avatar ? user.avatar : avatar} alt="" className="avatar-md" />
        <p className="font-bold">{user.username}</p>
        <p>{user.email}</p>
      </div>
      <div>
        <div className="border-t border-light-300 dark:border-dark-300">
          {routes[0].children.map((route) => (
            <div key={route.name}>
              {route.children?.length > 1 ? (
                <DropDownBtn route={route} />
              ) : (
                <div
                  className={`py-2 px-4 hover ${
                    location.pathname === route.path ? "active" : ""
                  }`}
                >
                  <Link to={route.path}>
                    <div className="flex items-center gap-3">
                      <route.icon size={20} />
                      <span>{route.name}</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
