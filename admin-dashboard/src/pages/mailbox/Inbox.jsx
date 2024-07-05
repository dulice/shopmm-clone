import React, { useEffect, useState } from "react";
import { CustomButton } from "../../custom";
import { mails } from "../../data/mail/inbox";
import { BiSolidEditAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../config/motion";

const Inbox = () => {
  const [inbox, setInbox] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setInbox(mails);
  }, []);
  const handleFind = (e) => {
    const text = e.target.value;
    setSearch(text);
    const filter = inbox.filter((el) => el.name.toLowerCase().includes(text) || el.description.toLowerCase().includes(text));
    filter.length > 1 && setInbox(filter);
    if(text === "") {
        setInbox(mails)
    }
  };
  return (
    <motion.div {...fadeAnimation} className="card m-2">
      <div className="grid grid-cols-6 gap-4">
        <div className="md:col-span-3 col-span-6">
          <CustomButton
            variant="btn-secondary"
            title={
              <div className="flex items-center gap-2">
                <BiSolidEditAlt size={20} />
                <span>Compose</span>
              </div>
            }
          />
        </div>
        <form className="md:col-span-3 col-span-6">
          <input
            className="input w-full"
            type="text"
            placeholder="Search in emails"
            value={search}
            onChange={handleFind}
          />
        </form>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left">
          <tbody>
            {inbox.map((mail) => (
              <tr
                key={mail.email}
                className="hover:bg-light-300 hover:dark:bg-dark-300 dark:text-white cursor-pointer"
              >
                <td className="px-4 py-2">
                  <input type="checkbox" name="" />
                </td>
                <td className="py-2">{mail.name}</td>
                <td className="px-4 py-2">
                  {mail.description.substring(0, 60)}...
                </td>
                <td className="px-4 py-2">
                  {mail.created_at.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Inbox;
