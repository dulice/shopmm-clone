import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../config/motion";
import { CustomButton } from "../../custom";
import { BiSend } from "react-icons/bi";

const Compose = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  return (
    <motion.div {...fadeAnimation} className="card m-2">
      <form>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="to">To:</label>
              </td>
              <td>
                <input
                  id="to"
                  type="text"
                  className="input"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="subject">Subject:</label>
              </td>
              <td>
                <input
                  id="subject"
                  type="text"
                  className="input my-4"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <ReactQuill
          value={description}
          onChange={setDescription}
          theme="snow"
        />
        <div className="mt-4 text-end">
            <CustomButton
            type="submit"
            title={
                <div className="flex items-center gap-2">
                <span>Send</span> <BiSend />
                </div>
            }
            variant="btn-secondary"
            />
        </div>
      </form>
    </motion.div>
  );
};

export default Compose;
