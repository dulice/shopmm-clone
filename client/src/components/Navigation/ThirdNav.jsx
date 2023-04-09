import {
  BottomNavigationAction,
  BottomNavigation,
  Typography,
} from "@mui/material";
import React from "react";
import CategoriesNav from "../CategoriesNav";
import { Link } from "react-router-dom";
import { thirdNavItems } from "../../data";

const ThirdNav = (props) => {
  const { active, selected, onSelect } = props;
  
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
        {thirdNavItems.map((nav) => (
          <BottomNavigationAction key={nav.id}
            onClick={() => onSelect(nav.id)}
            label={
              <Link to={nav.link} className="nav-link" style={selected === nav.id ? active : undefined}>
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
