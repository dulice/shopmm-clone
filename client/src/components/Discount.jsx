import { Box, Typography } from "@mui/material";
import React from "react";
import { discountAmount } from "../features/cartProductSlice";

const Discount = ({ product }) => {
  return (
    <Box>
      <Typography variant="h5" style={{color: "#F26924"}}>
        Ks {discountAmount(product.price, product.discount)}
      </Typography>
      {product.discount > 0 && (
        <Typography variant="body2">
          <span style={{ textDecoration: "line-through gray" }}>
            Ks {product.price}
          </span>{" "}
          {product.discount}%
        </Typography>
      )}
    </Box>
  );
};

export default Discount;
