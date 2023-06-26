import {
  Typography,
  List,
  ListItem,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import CategoriesNav from "../CategoriesNav";
import { Link } from "react-router-dom";
import { thirdNavItems } from "../../data";
import { Menu } from "@mui/icons-material";

const ThirdNav = (props) => {
  const { active, selected, onSelect } = props;

  const [mobileOpen, setMoblieOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMoblieOpen(!mobileOpen);
  };

  const menu = (
    <>
      {thirdNavItems.map((nav) => (
        <ListItem key={nav.id} onClick={() => onSelect(nav.id)}>
          <Link
            to={nav.link}
            className="nav-link"
            style={selected === nav.id ? active : undefined}
          >
            <Button
              onClick={handleDrawerToggle}
              startIcon={<nav.Icon />}
              variant="standard"
              size="small"
            >
              <Typography variant="caption">{nav.title}</Typography>
            </Button>
          </Link>
        </ListItem>
      ))}
    </>
  );
  return (
    <>
      <List sx={{ display: { xs: "none", sm: "flex" }, p: 0 }}>
        <ListItem sx={{width: "max-content"}}>
          <CategoriesNav />
        </ListItem>
        {thirdNavItems.map((nav) => (
          <ListItem sx={{p: 0, width: "max-content"}} key={nav.id} onClick={() => onSelect(nav.id)}>
            <Link
              to={nav.link}
              className="nav-link"
              style={selected === nav.id ? active : undefined}
            >
              <Button
                startIcon={<nav.Icon />}
                variant="standard"
                size="small"
              >
                <Typography variant="caption">{nav.title}</Typography>
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
      <IconButton onClick={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
        <Menu />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <List>{menu}</List>
      </Drawer>
    </>
  );
};

export default ThirdNav;
