import { Box } from "@mui/material";
import React from "react";
import Footer1 from "./Footer1";
import Footer2 from "./Footer2";

const Footer = () => {
  return (
    <Box sx={{ margin: "2rem 0" }}>
      <Footer1 />
      <Footer2 />
    </Box>
  );
};

export default Footer;
