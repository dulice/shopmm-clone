import React, { useState } from "react";
import { CustomButton } from "../../custom";
import react from "../../assets/react.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slideAnimation } from "../../config/motion";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
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
            <h1 className="text-xl font-bold">Create and account</h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium"
                >
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="username"
                  name="username"
                  id="username"
                  className="input w-full"
                  placeholder="name"
                  required=""
                />
              </div>
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
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium"
                >
                  Confirm password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
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
                title="Create an account"
                variant="btn-primary"
                customStyle="w-full"
                onClick={handleSubmit}
              />
              <p className="text-sm font-light">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium hover:underline text-primary-100"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
