/**
=========================================================
* Shopmm Admin Dashboard MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Shopmm Admin Dashboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useUserSignupMutation } from "api/userApi";
import { useDispatch } from "react-redux";
import { logout } from "features/userSlice";
import { toast } from "react-toastify";
import { register } from "features/userSlice";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

function Cover() {
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
    e.preventDefault();
    dispatch(logout());
    try {
      if (password !== confirmPassword) return toast.error("Password do not match.");
      const data = await userSignup({ username, email, password, isAdmin: true }).unwrap();
      dispatch(register(data));
      navigate("/authentication/sign-in");
    } catch (err) {
      console.log(err);
      if(err.data) {
        toast.error(err.data.message);
      }
    }
  };

  return (
    <CoverLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Register with
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mb={2}>
          <Socials />
        </ArgonBox>
        <ArgonBox px={12}>
          <Separator />
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form" onSubmit={handleSignup}>
            <Stack spacing={3}>
              <TextField
                label="Name"
                helperText={usernameText}
                value={username}
                onChange={handleChangeName}
              />
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
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{passwordText}</FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                <OutlinedInput
                  label="Confirm Password"
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{confirmPasswordText}</FormHelperText>
              </FormControl>
            </Stack>
            <ArgonBox display="flex" alignItems="center">
              <Checkbox defaultChecked />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </ArgonTypography>
              <ArgonTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton variant="gradient" color="dark" fullWidth type="submit">
                {isLoading ? "signing up" : "sign up"}
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
