import React from 'react'
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorImg from '../assets/image/404-error-page.jpg';

const Error = () => {
  return (
    <Container>
      <Link to="/">
        <img src={ErrorImg} alt="" />
      </Link>
    </Container>
  )
}

export default Error