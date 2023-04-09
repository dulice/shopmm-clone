import { CheckCircle } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { resetItems } from '../features/cartProductSlice';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);
  useEffect(() => {
    dispatch(resetItems());
    const redirect = counter>0 && setInterval(() => {
      setCounter(counter-1);
    }, 1000);
    counter === 0 && navigate('/');
    return () => clearInterval(redirect);
  },[counter]);
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