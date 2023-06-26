import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Visa, Mastercard, Jcb } from "react-pay-icons";
import { PK, BD, LK, NP, MM } from "country-flag-icons/react/3x2";
import { SocialIcon } from 'react-social-icons';
import DSS from '../../assets/image/dss.png';

const Footer2 = () => {
  return (
    <Container sx={{ padding: "1rem 0" }}>
      <Grid container spacing={1} sx={{justifyContent: "center", alignItems: "center"}}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{textAlign: "center"}}>Payment Methods</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px", margin: "1rem 0" }}>
            <Visa style={{ width: 60 }} />
            <Mastercard style={{ width: 60 }} />
            <Jcb style={{ width: 60 }} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{textAlign: "center"}}>Shop International</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px", margin: "1rem 0" }}>
            <BD style={{ height: "30px" }} />
            <PK style={{ height: "30px" }} />
            <LK style={{ height: "30px" }} />
            <MM style={{ height: "30px" }} />
            <NP style={{ height: "30px" }} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{textAlign: "center"}}>Follow Us</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <SocialIcon url="https://facebook.com/ShopAppMM" target="_blank" />
          <SocialIcon url="https://instagram.com/shop_myanmar" target="_blank" />
          <SocialIcon url="https://youtube.com//channel/UCcGyVgad9JF8fv8QmpUV5ag" target="_blank" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{textAlign: "center"}}>Verify By</Typography>
          <Avatar src={DSS} variant="square" sx={{width: 200, height: "auto", margin: "auto"}}/>
        </Grid>
      </Grid>
      <Typography variant="body1" textAlign="center"> &copy; Shop 2022</Typography>
    </Container>
  );
};

export default Footer2;
