import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button, Stack } from "@mui/material";
import { useOrdersQuery, useDeliverOrderMutation } from "api/summaryApi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { data } = useOrdersQuery();
  const handleDeliver = async (id) => {
    try {
      // const order = await useDeliverOrderMutation(id, {isDelivered: "delivered"});
      // console.log(order);
      await axios.put(`/orders/${id}`, {
        isDelivered: "delivered",
      });
    } catch (err) {
      console.log(err);
      if (err.data) {
        toast.error(err.data.message);
      }
    }
  };
  return (
    <DashboardLayout>
      <Container>
        <Stack spacing={3}>
          <Typography variant="h6" my={3}>
            Orders
          </Typography>
          {data?.map((order) => (
            <Card key={order._id}>
              <CardContent>
                <Grid container spacing={3}>
                  {order.items.map((item, index) => (
                    <Grid item xs={8} key={index}>
                      <Grid container spacing={3}>
                        <Grid item xs={1.5} key={item._id}>
                          <img src={item.images[0]} alt="" width="100%" />
                        </Grid>
                        <Grid item xs={7}>
                          <Typography variant="body2">{item.productName}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={4}>
                    <table style={{ fontSize: 16 }}>
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
                    {order.isDelivered === "pending" ? (
                      <Button
                        variant="contained"
                        sx={{ my: 1 }}
                        onClick={() => handleDeliver(order._id)}
                      >
                        Not Delivered
                      </Button>
                    ) : (
                      <Button variant="contained" sx={{ my: 1 }} disabled>
                        Delivered
                      </Button>
                    )}
                    <Button variant="contained" sx={{ m: 1 }}>
                      {order.isPaid ? "Paid" : "Not pay"}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </DashboardLayout>
  );
};

export default Orders;
