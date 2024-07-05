import React from "react";
import { fadeAnimation } from "../config/motion";
import { motion } from "framer-motion";
import Icon from '@mdi/react';

const SummaryCard = ({name, count, icon}) => {
  return (
    <div key={name} className="card hover:-mt-4">
      <motion.div {...fadeAnimation}>
        <Icon path={icon} size={1} className="m-auto"/>
        <p className="text-2xl font-bold">{count}</p>
        <p>{name}</p>
      </motion.div>
    </div>
  );
};

export default SummaryCard;
