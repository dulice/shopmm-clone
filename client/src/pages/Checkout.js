import { Mail, Phone, PinDrop } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid,
  CardContent,
  Card,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Discount from "../components/Discount";
import StepState from "../components/StepState";
import { resetItems } from '../features/cartProductSlice';

const Checkout = () => {
  const { address, items, productsPrice, shippingFees, totalPrice } =
    useSelector((state) => state.cartItems);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post("/orders/checkout", {
        items,
        userId: user._id,
      });
      window.location.href = data.url;
      if(data.url) {
        try {
          const { data } = await axios.post('/orders', {
            customerId: user._id,
            items,
            productsPrice,
            shippingFees,
            totalPrice,
            address,
            isPaid: true,
          })
          console.log(data);
          dispatch(resetItems());
        } catch (err) {
          if(err.response) {
            console.log(err.response.data.message);
          }
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Box my={3}>
      <Container>
        <Stack spacing={2}>
          <StepState step={1} />
          <List>
            <ListItem>
              <ListItemIcon>
                <PinDrop style={{ color: "#F26924", fontWeight: 700 }} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">{address.fullName}</Typography>
                <Typography variant="body2">
                  {address.address}, {address.city}, {address.township},{" "}
                  {address.state}
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone style={{ color: "#F26924", fontWeight: 700 }} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">{address.phoneNumber}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Mail style={{ color: "#F26924", fontWeight: 700 }} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">{user.email}</Typography>
              </ListItemText>
            </ListItem>
          </List>
          <Divider />
          <>
            {items.map((item) => (
              <Grid item xs={9} key={item._id}>
                <Card>
                  <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={2}>
                        <img src={item.images[0]} alt="" width="100%" />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2">
                          {item.productName}
                        </Typography>
                        <Typography variant="caption">
                          only {item.stock} item(s) in stock
                        </Typography>
                        <Discount product={item} />
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant="body2">
                          Qty: {item.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
          <Typography variant="body2" align="end">
            Subtotal:{" "}
            <span style={{ color: "#F26924", fontWeight: 700 }}>
              Ks {productsPrice}
            </span>
          </Typography>
          <Typography variant="body2" align="end">
            Delivery Fees:{" "}
            <span style={{ color: "#F26924", fontWeight: 700 }}>
              Ks {shippingFees}
            </span>
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">
              Total:{" "}
              <span style={{ color: "#F26924", fontWeight: 700 }}>
                Ks {totalPrice}
              </span>
            </Typography>
            <Button variant="contained" onClick={handleCheckout}>
              Checkout
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Checkout;
