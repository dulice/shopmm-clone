import {
  Alert,
  Typography,
  Container,
  Box,
  Stack,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useOrderDetailQuery } from "../api/orderApi";
import Loading from "../components/Loading";

const OrderDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useOrderDetailQuery(id);

  const steps = [
    {
      label: "Shipped",
      description: `Your package has been shipped by MM-Shop with tracking number ${data?._id}.`,
    },
    {
      label: "Reached Our Warehouse",
      description: "Your package has arrived at our warehouse from where it'll be sent to your address soon."
    },
    {
      label: "Package being Prepared",
      description: "Your package is being prepared by the seller."
    },
    {
      label: "Package Processing Started",
      description: "Your package is ready to be prepared by the seller"
    }
  ]
  return (
    <Box>
      <Container>
        <Stack spacing={3}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Alert>Tracking Number: {id}</Alert>
              <Card>
                <CardContent>
                  <Typography variant="body2">
                    Receiver: {data.address.fullName}
                  </Typography>
                  <Typography variant="caption" color="gray">
                    {data.address.address}, {data.address.city}, $
                    {data.address.state}
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Stepper activeStep={0} orientation="vertical">
                    {steps.map(step => (
                      <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                        <StepContent>{step.description}</StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    {data?.items.map(item => (
                      <>
                        <Grid item xs={1} key={item._id}>
                          <img src={item.images[0]} alt="" width="100%" />
                        </Grid>
                        <Grid item xs={7}>
                          <Typography variant="body2">
                            {item.productName}
                          </Typography>
                          <Typography variant="h6">Ks {item.price}</Typography>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default OrderDetail;
