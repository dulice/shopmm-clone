import React, { useState } from "react";
import react from "../../assets/react.svg";
import { CustomButton } from "../../custom";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { slideAnimation } from "../../config/motion";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { register } from "../../app/userSlice";
import { useUserLoginMutation } from "../../api/userApi";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userLogin, { isLoading, error }] = useUserLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password) {
      toast.error("Please fill all the field")
    }else{
      try {
        const data = await userLogin({email, password}).unwrap();
        if(data.isAdmin) {
          dispatch(register(data));
        }else {
          toast.error("Register as a seller to login")
        }
        navigate('/')
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };
  return (
    <motion.div {...slideAnimation("up")}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibolm">
          <img className="w-8 h-8 mr-2" src={react} alt="logo" />
          <p className="text-black dark:text-white">Dashboard</p>
        </Link>
        <div className="w-full sm:max-w-md xl:p-0 card">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold">Login to account</h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="input w-full"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="input w-full"
                  required=""
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="input w-full"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms">
                    I accept the{" "}
                    <Link
                      to="/"
                      className="font-medium hover:underline text-primary-100"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <CustomButton
                type="submit"
                title="Login"
                variant="btn-primary"
                customStyle="w-full"
                disabled={isLoading}
                onClick={handleSubmit}
              />
              <p className="text-sm font-light">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium hover:underline text-primary-100"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signin;
