import { AppBar, Container } from '@mui/material'
import React, { useState } from 'react'
import FirstNav from './FirstNav'
import SecondNav from './SecondNav'
import ThirdNav from './ThirdNav'

const Navigation = () => {
  const [selected, setSelected] = useState(0);
  const active = {
    textDecoration: "underline",
    color: "orange",
  };      

  const handleSelected = (id) => {
    setSelected(id);
  };
  return (
    <AppBar position="sticky" color="inherit">
      <Container>
        <FirstNav active={active} selected={selected} onSelect={handleSelected}/>
        <SecondNav />
        <ThirdNav active={active} selected={selected} onSelect={handleSelected}/>
      </Container>
    </AppBar>
  )
}

export default Navigation