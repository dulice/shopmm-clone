import {
  Container,
  Grid,
  Typography,
  Stack,
  FormControl,
  TextField,
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { useUserLoginMutation } from "../api/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { register } from "../features/userSlice";
import { resetItems } from "../features/cartProductSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const [userLogin, { isLoading }] = useUserLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (email.length < 5) {
      setEmailText("The email length should be 6-50 characters.");
    } else {
      setEmailText("");
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (password.length < 5) {
      setPasswordText("The password length should be 6-50 characters.");
    } else {
      setPasswordText("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(resetItems());
    try {
      const data = await userLogin({ email, password }).unwrap();
      dispatch(register(data));
      navigate("/");
    } catch (err) {
      toast.error(err.status);
    }
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
  }

  return (
    <div>
      <Container maxWidth="md">
        <form onSubmit={handleLogin}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ margin: "3rem 0" }}>
                Welcome to Shop! Please login.
              </Typography>
              <Stack spacing={3}>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  helperText={emailText}
                  value={email}
                  onChange={handleChangeEmail}
                />
                <FormControl>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    label="Password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChangePassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {!showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{passwordText}</FormHelperText>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                color="GrayText"
                sx={{ margin: "3rem 0", textAlign: "end" }}
              >
                New member? <Link to="/signup">Register</Link> here.
              </Typography>
              <Stack spacing={3}>
                <Button variant="contained" color="warning" type="submit">
                  LOGIN{" "}
                  {isLoading && (
                    <CircularProgress size={20} sx={{ marginLeft: "10px" }} />
                  )}
                </Button>
                {/* <Typography variant="body2" color="orange">
                  Or login with
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Google />}
                  onClick={handleGoogle}
                >
                  Google
                </Button> */}
                <Box>
                  <Typography variant="body2">Use the follow data to login</Typography>
                  <Typography color="primary" variant="body2">Email: emma@gmail.com</Typography>
                  <Typography color="primary" variant="body2">Password: 123456</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Login;
