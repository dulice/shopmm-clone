import { ArrowBack, Mail, Phone, PinDrop } from "@mui/icons-material";
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
  IconButton,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Discount from "../components/Discount";
import StepState from "../components/StepState";
import { useNavigate } from "react-router-dom";
import OrderPrice from "../components/OrderPrice";

const Checkout = () => {
  const navigate = useNavigate();
  const { address, items } =
    useSelector((state) => state.cartItems);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    localStorage.removeItem("url");
  }, []);

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders/checkout`,
        {
          items,
          userId: user._id,
          email: user.email,
        }
      );
      window.location.href = data.url;
      localStorage.setItem("url", data.url);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Box my={3}>
      <Container>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
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
          {items.map((item) => (
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
          ))}
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "end"}}>
            <OrderPrice />
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
