import { CheckCircle } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetItems } from '../features/cartProductSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);
  const url = localStorage.getItem('url');

  const { address, items, productsPrice, shippingFees, totalPrice } =
    useSelector((state) => state.cartItems);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const createOrder = async () => {
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/orders`, {
            customerId: user._id,
            items,
            productsPrice,
            shippingFees,
            totalPrice,
            address,
            isPaid: true,
          })
          dispatch(resetItems());
        } catch (err) {
          if(err.response) {
            console.log(err.response.data.message);
          }
          console.log(err);
        }
      }
    url && createOrder();
  },[])
  
  useEffect(() => {
    dispatch(resetItems());
    const redirect = counter>0 && setInterval(() => {
      setCounter(counter-1);
    }, 1000);
    counter === 0 && navigate('/');
    localStorage.removeItem('url');
    return () => clearInterval(redirect);
  },[counter, dispatch, navigate]);
  return (
    <Box sx={{width: 350, margin: "3rem auto", lineHeight: "2rem"}}>
        <CheckCircle style={{color: "green", fontSize: "5rem"}}/>
        <Typography variant="h5">Your payment was successful</Typography>
        <Typography variant="body2">Thank you for your payment. We will be in contact with more details shortly.</Typography>
        <Typography variant="h6">Redirect to the homepage in {counter} second.</Typography>
    </Box>
  )
}

export default Success