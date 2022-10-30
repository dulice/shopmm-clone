import {
  BottomNavigationAction,
  BottomNavigation,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import CategoriesNav from "../CategoriesNav";

const ThirdNav = () => {
  return (
    <>
      <BottomNavigation
        showLabels
        sx={{
          whiteSpace: "nowrap",
          display: "inline-block",
        }}
      >
        <BottomNavigationAction label={<CategoriesNav />} />
        <BottomNavigationAction
          label={
            <Link to="/" className="nav-link">
              <MilitaryTechOutlinedIcon />
              <Typography variant="caption">Official Store</Typography>
            </Link>
          }
        />
        <BottomNavigationAction
          label={
            <Link to="/" className="nav-link">
              <ShoppingCartCheckoutOutlinedIcon />
              <Typography variant="caption">Shop Mart</Typography>
            </Link>
          }
        />
        <BottomNavigationAction
          label={
            <Link to="/sale" className="nav-link">
              <ReceiptOutlined />
              <Typography variant="caption">El Sale</Typography>
            </Link>
          }
        />
        <BottomNavigationAction
          label={
            <Link to="/" className="nav-link">
              <LocalShippingOutlinedIcon />
              <Typography variant="caption">Shop Travel</Typography>
            </Link>
          }
        />
        <BottomNavigationAction
          label={
            <Link to="/new-arrival" className="nav-link">
              <PercentOutlinedIcon />
              <Typography variant="caption">New Arrivals</Typography>
            </Link>
          }
        />
      </BottomNavigation>
    </>
  );
};

export default ThirdNav;
