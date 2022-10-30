import { Box, Button, Container, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../features/cartProductSlice";
import StepState from "../components/StepState";
import { toast } from "react-toastify";

const ShippingAddress = () => {
    const { address: shippingAdd } = useSelector(state => state.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(shippingAdd.fullName || "");
  const [address, setAddress] = useState(shippingAdd.address || "");
  const [state, setState] = useState(shippingAdd.state || "");
  const [city, setCity] = useState(shippingAdd.city || "");
  const [township, setTownship] = useState(shippingAdd.township || "");
  const [phoneNumber, setPhoneNumber] = useState(shippingAdd.phoneNumber || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      fullName === "" ||
      address === "" ||
      state === "" ||
      city === "" ||
      township === "" ||
      phoneNumber === ""
    ) {
      toast.error("Please fill all the required");
    } else {
      dispatch(
        addAddress({
          fullName,
          address,
          state,
          city,
          township,
          phoneNumber,
        })
      );
      navigate("/checkout");
    }
  };
  return (
    <Box my={3}>
      <Container>
        <StepState step={0} />
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Full Name"
              variant="standard"
              helperText="You can't leave this empty."
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Address"
              variant="standard"
              helperText="You can't leave this empty."
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              fullWidth
              label="State"
              variant="standard"
              helperText="You can't leave this empty."
              name="regin"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <TextField
              fullWidth
              label="City"
              variant="standard"
              helperText="You can't leave this empty."
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              fullWidth
              label="Township"
              variant="standard"
              helperText="You can't leave this empty."
              name="township"
              value={township}
              onChange={(e) => setTownship(e.target.value)}
            />
            <TextField
              fullWidth
              style={{ width: "100% !important" }}
              type="number"
              label="Phone Number"
              variant="standard"
              helperText="You can't leave this empty."
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default ShippingAddress;
