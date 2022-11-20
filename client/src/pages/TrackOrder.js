import React from "react";
import { useSelector } from "react-redux";
import { useTrackOrderQuery } from "../api/orderApi";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  Button,
  Stack,
} from "@mui/material";
import OrderItem from "../components/OrderItem";

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { data, isLoading } = useTrackOrderQuery(user._id);
  return (
    <Box>
      <Container>
        <Stack spacing={3}>
          <Typography variant="h6" my={3}>
            Your Orders
          </Typography>
          {isLoading ? (
            <Loading />
          ) : data.length <= 0 ? (
            <Alert severity="warning">
              You Don't have any order yet. <Link to="/">Buy Product</Link>
            </Alert>
          ) : (
            data?.map((order) => (
              <Card key={order._id}>
                <CardContent>
                  <Grid container spacing={3}>
                    {order.items.map((item, index) => (
                      <Grid item xs={9} key={index}>
                        <OrderItem item={item} />
                      </Grid>
                    ))}
                    <Grid item xs={3}>
                      <table>
                        <tbody>
                          <tr>
                            <td>Subtotal: </td>
                            <td>Ks {order.productsPrice}</td>
                          </tr>
                          <tr>
                            <td>Shipping fess: </td>
                            <td>Ks {order.shippingFees}</td>
                          </tr>
                          <tr>
                            <td color="orange">Total (GST Incl): </td>
                            <td>Ks {order.totalPrice}</td>
                          </tr>
                        </tbody>
                      </table>
                      <Button variant="contained" color="error" sx={{ my: 1 }}>
                        {order.isDelivered}
                      </Button>
                      {order.isDelivered === "delivered" && (
                        <Link to={`/review/${order._id}`} style={{textDecoration: "none"}}>
                          <Button
                            variant="contained"
                            sx={{ m: 1 }}
                          >
                            Review
                          </Button>
                        </Link>
                      )}
                      <br />
                      <Link to={`/order/${order._id}`}>View Details</Link>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default TrackOrder;
