import {
  Container,
  Grid,
  Typography,
  Stack,
  FormControl,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import dayjs from "dayjs";
import { useUserSignupMutation } from "../api/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout, register } from "../features/userSlice";
import { resetItems } from "../features/cartProductSlice";

const Signup = () => {
  const [dateOfBirth, setDateOfBirth] = useState(dayjs());
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameText, setUsernameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [confirmPasswordText, setConfirmPasswordText] = useState("");

  const [userSignup, { isLoading }] = useUserSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setUsername(e.target.value);
    // console.log(username.length);
    if (username.length < 1) {
      setUsernameText("The name length should be 2-50 characters.");
    } else {
      setUsernameText("");
    }
  };

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

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (confirmPassword.length < 5) {
      setConfirmPasswordText("The password length should be 6-50 characters.");
    } else {
      setConfirmPasswordText("");
    }
  };

  const handleSignup = async (e) => {
    dispatch(logout());
    dispatch(resetItems());
    e.preventDefault();
    try {
      if (password !== confirmPassword)
        return toast.error("Password do not match.");
      const data = await userSignup({ username, email, password, dateOfBirth, }).unwrap();
      dispatch(register(data));
      navigate('/login');
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
  }

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h6" style={{ margin: "1rem 0" }}>
          Create Your Shop Account
        </Typography>
        <form onSubmit={handleSignup}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
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
                          {password ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{passwordText}</FormHelperText>
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="confirm-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    label="Confirm Password"
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {password ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{confirmPasswordText}</FormHelperText>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="Your Birthday"
                    value={dateOfBirth}
                    onChange={(newValue) => setDateOfBirth(newValue.$d)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={3}>
                <TextField
                  label="Name"
                  helperText={usernameText}
                  value={username}
                  onChange={handleChangeName}
                />
                <FormControlLabel
                  label={
                    <Typography variant="body2" color="GrayText">
                      I'd like to receive exclusive offers and promotions via
                      SMS
                    </Typography>
                  }
                  control={<Checkbox name="offers" color="warning" />}
                />
                <Button variant="contained" color="warning" type="submit">
                  SIGN UP{" "}
                  {isLoading && (
                    <CircularProgress size={20} sx={{ marginLeft: "10px" }} />
                  )}
                </Button>
                <Typography variant="body2" color="GrayText">
                  By clicking "SIGN UP", I agree to Shop's Terms of Use and
                  Privacy Policy
                </Typography>
                <Typography variant="body2" color="orange">
                  Or sign up with
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Google />}
                  onClick={handleGoogle}
                >
                  Google
                </Button>
                <Typography variant="body2" color="GrayText">
                  Already member? <Link to="/login">Login</Link> here.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Signup;
