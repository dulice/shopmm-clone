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

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Shopmm Admin Dashboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

import { useDispatch } from "react-redux";
import { useUserLoginMutation } from "api/userApi";
import { logout } from "features/userSlice";
import { register } from "features/userSlice";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);
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
    dispatch(logout());
    try {
      const data = await userLogin({ email, password }).unwrap();
      dispatch(register(data));
      navigate("/");
    } catch (err) {
      toast.error(err.status);
    }
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox mb={2}>
        <Socials />
      </ArgonBox>
      <ArgonBox px={12}>
        <Separator />
      </ArgonBox>
      <ArgonBox component="form" role="form" onSubmit={handleLogin}>
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
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{passwordText}</FormHelperText>
          </FormControl>
        </Stack>
        <ArgonBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <ArgonTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" fullWidth type="submit">
            {isLoading ? "Signing In" : "Sign In"}
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Sign up
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
