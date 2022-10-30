import {
  CardContent,
  Checkbox,
  Grid,
  Container,
  Card,
  Typography,
  FormControlLabel,
  Box,
  Alert,
  Button,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Discount from "../components/Discount";
import OrderPrice from "../components/OrderPrice";
import QuantityButton from "../components/QuantityButton";
import { discountAmount } from "../features/cartProductSlice";

const CartProducts = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cartItems);
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <Container>
        <Grid container spacing={2} my={2} position="relative">
          {items.length <= 0 ? (
            <Alert severity="warning">
              No Product Add to Cart. Go To <Link to="/">Homepage</Link>
            </Alert>
          ) : (
            items.map((item) => (
              <Grid item xs={9} key={item._id}>
                <Card>
                  <CardContent>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={2}>
                            <img src={item.images[0]} alt="" width="100%" />
                          </Grid>
                          <Grid item xs={5}>
                            <Typography variant="body2">
                              {item.productName}
                            </Typography>
                            <Typography variant="caption">
                              only {item.stock} item(s) in stock
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Discount product={item} />
                          </Grid>
                          <Grid item xs={1}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <QuantityButton
                                quantity={quantity}
                                setQuantity={setQuantity}
                                item={item}
                              />
                            </Box>
                            <Typography variant="caption" noWrap>
                              {discountAmount(item.price, item.discount)} x {item.quantity} ={" "}
                              {discountAmount(item.price, item.discount) * item.quantity}
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
          <Grid item xs={3} sx={{position: "absolute", right: 0}}>
            <Stack spacing={3}>
              <Typography variant="h6">Order Summery</Typography>
              <OrderPrice />
              <Button variant="contained" onClick={() => navigate('/shipping-address')}>PROCEED TO CHECKOUT</Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CartProducts;
