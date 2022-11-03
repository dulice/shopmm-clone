import { CheckCircle } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { resetItems } from '../features/cartProductSlice';

const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetItems());
  })
  return (
    <Box sx={{width: 350, margin: "3rem auto", lineHeight: "2rem"}}>
        <CheckCircle style={{color: "green", fontSize: "5rem"}}/>
        <Typography variant="h5">Your payment was successful</Typography>
        <Typography variant="body2">Thank you for your payment. We will be in contact with more details shortly.</Typography>
    </Box>
  )
}

export default Success