import {
  Box,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../features/userSlice';
import { firstNavItems } from "../../data";

const FirstNav = (props) => {
  const { user } = useSelector((state) => state.user);
  const { active, selected, onSelect } = props;

  const dispatch = useDispatch();
  return (
    <Box>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <BottomNavigation
            showLabels
            sx={{
              whiteSpace: "nowrap",
              fontSize: "12px",
              height: 0,
              display: "inline-block",
            }}
          >
            {firstNavItems.map((item) => (
                <BottomNavigationAction
                  onClick={() => onSelect(item.id)}               
                  key={item.id}
                  value={item.title}
                  label={
                    <Link to={item.link} className="nav-link uppercase" style={selected === item.id ? active : undefined}>
                      {item.title}
                    </Link>
                  }
                />
            ))}
            <BottomNavigationAction
              value="login"
              label={
                user ? (
                  <Link className="nav-link uppercase" to="/login" onClick={() => dispatch(logout())}>
                    Logout
                  </Link>
                ) : (
                  <>
                    <Link className="nav-link uppercase" to="/login">
                      login
                    </Link>
                  </>
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
