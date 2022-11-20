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

const navs = [{
  id: 1,
  link: "/official-store",
  Icon: MilitaryTechOutlinedIcon,
  title: "Official Store"
},
{
  id: 2,
  link: "/shop-mart",
  Icon: ShoppingCartCheckoutOutlinedIcon,
  title: "Shop Mart"
},{
  id: 3,
  link: "/sale",
  Icon: ReceiptOutlined,
  title: "El Sale"
},{
  id: 4,
  link: "/shop-travel",
  Icon: LocalShippingOutlinedIcon,
  title: "Shop Travel"
},{
  id: 5,
  link: "/new-arrival",
  Icon: PercentOutlinedIcon,
  title: "New Arrival"
},
]

const ThirdNav = () => {
  return (
    <>
      <BottomNavigation
        showLabels
        sx={{
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start"
        }}
      >
        <span style={{marginBottom: 5}}><CategoriesNav /></span>
        {navs.map(nav => (
          <BottomNavigationAction
            label={
              <Link to={nav.link} className="nav-link">
                <nav.Icon />
                <Typography variant="caption">{nav.title}</Typography>
              </Link>
            }
          />
        ))}
      </BottomNavigation>
    </>
  );
};

export default ThirdNav;
