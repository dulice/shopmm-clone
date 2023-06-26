import { AppBar, Container, Grid, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import FirstNav from "./FirstNav";
import SecondNav from "./SecondNav";
import ThirdNav from "./ThirdNav";

const Navigation = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [selected, setSelected] = useState(0);
  const active = {
    textDecoration: "underline",
    color: "orange",
    transitionDuration: 300,
  };

  const handleSelected = (id) => {
    setSelected(id);
  };
  return (
    <AppBar position="sticky" color="inherit">
      <Container>
        <Grid container>
          <Grid item xs={1} sm={12} sx={{mt: {xs: "9px", sm: 0}}}>
            <FirstNav
              active={active}
              selected={selected}
              onSelect={handleSelected}
            />
          </Grid>
          <Grid item xs={10} sm={12}>
            <SecondNav />
          </Grid>
          <Grid item xs={1} sm={12} sx={{mt: {xs: "9px", sm: 0}}}>
            <ThirdNav
              isMobile={isMobile}
              active={active}
              selected={selected}
              onSelect={handleSelected}
            />
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Navigation;
