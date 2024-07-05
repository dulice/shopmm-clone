import avatar from "../../assets/user.jpg";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { slideAnimation } from "../../config/motion";
import { useUsersQuery } from "../../api/summaryApi";
import Loading from "../../components/Loading";

const Chat = () => {
  const navigate = useNavigate();
  const loacation = useLocation();
  const { data: users, isLoading } = useUsersQuery();

  const handleClick = (id) => {
    navigate("/chat/" + id);
  };
  const { device } = useSelector((state) => state.toggle);
  const { user } = useSelector((state) => state.user);

  if (isLoading) return <Loading />;
  return (
    <>
      <motion.div
        {...slideAnimation("up")}
        className="lg:col-span-9 col-span-12 mx-2"
      >
        <Outlet />
      </motion.div>
    </>
  );
};

export default Chat;
