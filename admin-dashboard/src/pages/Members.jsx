import React from "react";
import { motion } from "framer-motion";
import { slideAnimation } from "../config/motion";
import Table from "../components/table/Table";
import { columns } from "../data/table/column";
import { useUsersQuery } from "../api/summaryApi";
import { Loading } from "../components";
const userTHead = ['No', 'Username', 'Email', 'Is_Admin', 'Register_Date'];

const Members = ({ itemPerpage = 10 }) => {
  const { data: users, isLoading } = useUsersQuery();
  if (isLoading) return <Loading />;
  return (
    <motion.div {...slideAnimation("up")}>
      <div className="card m-4">
        <Table
          data={users.map((user, index) => {
            return {
              No: index + 1,
              Username: user.username,
              Email: user.email,
              Is_Admin: user.isAdmin ? <p>Admin</p> : <p>User</p>,
              Register_Date: user.createdAt.substring(0, 10),
            };
          })}
          columns={columns(userTHead)}
          itemPerpage={itemPerpage}
        />
      </div>
    </motion.div>
  );
};

export default Members;
