import { AppBar, Container } from '@mui/material'
import React from 'react'
import FirstNav from './FirstNav'
import SecondNav from './SecondNav'
import ThirdNav from './ThirdNav'

const Navigation = () => {
  return (
    <AppBar position="sticky" color="inherit">
      <Container>
        <FirstNav />
        <SecondNav />
        <ThirdNav />
      </Container>
    </AppBar>
  )
}

export default Navigation