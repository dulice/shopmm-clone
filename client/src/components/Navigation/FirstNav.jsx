import {
  Typography,
  List,
  ListItem,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import { firstNavItems } from "../../data";
import { Info } from "@mui/icons-material";
import { useState } from "react";

const FirstNav = (props) => {
  const { user } = useSelector((state) => state.user);
  const { active, selected, onSelect } = props;
  const [mobileOpen, setMoblieOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMoblieOpen(!mobileOpen);
  };
  const dispatch = useDispatch();
  const menu = (
    <>
      {firstNavItems.map((nav) => (
        <ListItem key={nav.id} onClick={() => onSelect(nav.id)}>
          <Link
            to={nav.link}
            className="nav-link"
            style={selected === nav.id ? active : undefined}
          >
            <Button
              onClick={handleDrawerToggle}
              variant="standard"
              size="small"
            >
              <Typography variant="caption">{nav.title}</Typography>
            </Button>
          </Link>
        </ListItem>
      ))}
      <ListItem>
        {user ? (
          <Link
            className="nav-link uppercase"
            to="/login"
            onClick={() => dispatch(logout())}
          >
            <Button
              onClick={handleDrawerToggle}
              variant="standard"
              size="small"
            >
              <Typography variant="caption">logout</Typography>
            </Button>
          </Link>
        ) : (
          <>
            <Link className="nav-link uppercase" to="/login">
              <Button
                onClick={handleDrawerToggle}
                variant="standard"
                size="small"
              >
                <Typography variant="caption">login</Typography>
              </Button>
            </Link>
          </>
        )}
      </ListItem>
      <ListItem sx={{ width: "max-content" }}>
        <Link className="nav-link uppercase" to="/signup">
          <Button variant="standard" size="small">
            <Typography variant="caption">sign up</Typography>
          </Button>
        </Link>
      </ListItem>
    </>
  );
  return (
    <>
      <List
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "flex-end",
          p: 0,
        }}
      >
        {firstNavItems.map((nav) => (
          <ListItem
            sx={{ p: 0, width: "max-content" }}
            key={nav.id}
            onClick={() => onSelect(nav.id)}
          >
            <Link
              to={nav.link}
              className="nav-link"
              style={selected === nav.id ? active : undefined}
            >
              <Button variant="standard" size="small">
                <Typography variant="caption">{nav.title}</Typography>
              </Button>
            </Link>
          </ListItem>
        ))}
        <ListItem sx={{ width: "max-content" }}>
          {user ? (
            <Link
              className="nav-link uppercase"
              to="/login"
              onClick={() => dispatch(logout())}
            >
              <Typography variant="caption">logout</Typography>
            </Link>
          ) : (
            <>
              <Link className="nav-link uppercase" to="/login">
                <Typography variant="caption">login</Typography>
              </Link>
            </>
          )}
        </ListItem>
        <ListItem sx={{ width: "max-content" }}>
          <Link className="nav-link uppercase" to="/signup">
            <Typography variant="caption">sign up</Typography>
          </Link>
        </ListItem>
      </List>

      <IconButton onClick={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
        <Info />
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

export default FirstNav;
