import React from "react";
import {
  Box,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../features/userSlice';

const FirstNav = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Box>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}>
          <BottomNavigation
            showLabels
            sx={{
              whiteSpace: "nowrap",
              fontSize: "12px",
              height: 0,
              display: "inline-block",
              textTransform: "uppercase",
            }}
          >
            <BottomNavigationAction
              value="save more on app"
              label={
                <Link to="/save-more-on-app" className="nav-link uppercase">
                  save more on app
                </Link>
              }
            />
            <BottomNavigationAction
              value="sell on app"
              label={
                <Link className="nav-link uppercase" to="/sell-on-app">
                  sell on app
                </Link>
              }
            />
            <BottomNavigationAction
              value="customer care"
              label={
                <Link className="nav-link uppercase" to="/customer-care">
                  customer care
                </Link>
              }
            />
            <BottomNavigationAction
              value="track my order"
              label={
                <Link className="nav-link uppercase" to="/track-order">
                  track my order
                </Link>
              }
            />
            <BottomNavigationAction
              value="login"
              label={
                user ? (
                  <Link className="nav-link uppercase" to="/login" onClick={() => dispatch(logout())}>
                    Logout
                  </Link>
                ) : (
                  <Link className="nav-link uppercase" to="/login">
                    login
                  </Link>
                )
              }
            />
            <BottomNavigationAction
              value="signup"
              label={
                <Link className="nav-link uppercase" to="/signup">
                  sign up
                </Link>
              }
            />
          </BottomNavigation>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FirstNav;
