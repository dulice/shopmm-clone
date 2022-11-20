import { Grid, Typography } from "@mui/material";
import React from "react";

const OrderItem = ({ item }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={1.5} key={item._id}>
        <img src={item.images[0]} alt="" width="100%" />
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body2" mt={3}>
          {item.productName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderItem;
