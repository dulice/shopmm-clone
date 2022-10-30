import {
  Grid,
  Typography,
  Box,
  Stack,
  Link as MLink,
  Avatar,
  Container,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AppStore from "../../assets/image/app-store.png";
import GooglePlay from "../../assets/image/google-play.png";

const Footer1 = () => {
  return (
    <Box sx={{backgroundColor: "#2E2E54", color: "white", padding: "2rem"}}>
        <Container>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <Stack spacing={3}>
            <div>
              <Typography variant="h5">Customer Care</Typography>
              <Typography variant="body2">
                <Link className="inherit" to="/help-center">Help Center</Link>
              </Typography>
              <Typography variant="body2">
                <Link className="inherit" to="/how-to-buy">How to buy</Link>
              </Typography>
              <Typography variant="body2">
                <Link className="inherit" to="/corporate & bulk purchasing">
                  Corporate & bulk purchasing
                </Link>
              </Typography>
              <Typography variant="body2">
                <Link className="inherit" to="/return & refund">Return & refund</Link>
              </Typography>
              <Typography variant="body2">
                <Link className="inherit" to="/contact-us">Contact us</Link>
              </Typography>
            </div>
            <div>
              <Typography variant="h5">Earn with Shop</Typography>
              <Typography variant="body2">
                <Link className="inherit" to="/shop university">Shop University</Link>
              </Typography>
              <Typography variant="body2">
                <Link className="inherit" to="/sell on shop">Sell on Shop</Link>
              </Typography>
              <Typography variant="body2">
                <Link className="inherit" to="/code of conduct">Code of Conduct</Link>
              </Typography>
            </div>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <div>
            <Typography variant="h5">Shop</Typography>
            <Typography variant="body2">
              <Link className="inherit" to="/about shop">about shop</Link>
            </Typography>
            <Typography variant="body2">
              <Link className="inherit" to="/careers">careers</Link>
            </Typography>
            <Typography variant="body2">
              <Link className="inherit" to="/shop cares">shop cares</Link>
            </Typography>
            <Typography variant="body2">
              <Link className="inherit" to="/term & conditions">term & conditions</Link>
            </Typography>
            <Typography variant="body2">
              <Link className="inherit" to="/privacy policy">privacy policy</Link>
            </Typography>
            <Typography variant="body2">
              <Link className="inherit" to="/online shopping on app">online shopping on app</Link>
            </Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <div>
              <Avatar
                variant="square"
                sx={{ height: "50px" }}
                src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1.5gRgMZC2uNjSZFnXXaxZpXa.png"
                alt=""
              />
              <Typography variant="body2" color="error">
                Happy Shopping
              </Typography>
              <Typography variant="body2">Download App</Typography>
            </div>
            <Grid container>
              <Grid item xs={4}>
                <MLink href="https://apps.apple.com/us/app/shop-com-mm-online-shopping/id979214282?ls=1&scm=1003.4.icms-zebra-100010652-2860784.OTHER_5417611007_2539922&spm=a2a0e.pdp.1_top.15.7020dx3Bdx3BwL">
                  <Avatar
                    variant="square"
                    sx={{ width: "100px" }}
                    src={AppStore}
                    alt=""
                  />
                </MLink>
              </Grid>
              <Grid item>
                <MLink href="https://play.google.com/store/apps/details?spm=a2a0e.pdp.footer_top.16.2547I2qCI2qCnk&id=com.shop.android&scm=1003.4.icms-zebra-100010652-2860784.OTHER_5417611007_2539922">
                  <Avatar
                    variant="square"
                    sx={{ width: "130px" }}
                    src={GooglePlay}
                    alt=""
                  />
                </MLink>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
};

export default Footer1;
