import React, { useContext, useState } from "react";
import AuthBtn from "../common/AuthBtn";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/operations/authAPI";
import { UserContext } from "../../context/UserContext";

const SignupFrom = () => {
  const navigate = useNavigate();
  const { setLoading, setUser, setToken } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const onChangeHandler = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      setErrorMessage("All fields are required");
      return;
    } else if (signupData.password !== signupData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // invoke login api function
    signup(signupData, setUser, setToken, setLoading, navigate);

    if (errorMessage) return;

    // reset
    setSignupData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <>
      <div className="space-y-5 text-center">
        <h2 className="text-4xl text-center text-black font-semibold">
          Sign Up
        </h2>
        <form onSubmit={onSubmitHandler} className="flex flex-col space-y-4">
          <div className="flex flex-row md:flex-row space-x-4 md:space-x-4">
            <input
              required
              type="text"
              name="firstName"
              placeholder="First Name"
              value={signupData.firstName}
              onChange={onChangeHandler}
              className="w-full text-base sm:text-lg px-3 sm:px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
            />
            <input
              required
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={signupData.lastName}
              onChange={onChangeHandler}
              className="w-full text-base sm:text-lg px-3 sm:px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
            />
          </div>
          <input
            required
            type="text"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={onChangeHandler}
            className="w-full text-base sm:text-lg px-3 sm:px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={onChangeHandler}
            className="w-full text-base sm:text-lg px-3 sm:px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
          />
          <input
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signupData.confirmPassword}
            onChange={onChangeHandler}
            className="w-full text-base sm:text-lg px-3 sm:px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
          />

          <div className="flex flex-row space-x-4 items-center">
            <div className="flex flex-row items-center space-x-2">
              <input
                type="radio"
                name="gender"
                id="male"
                value={"male"}
                checked={signupData.gender === "male"}
                onChange={onChangeHandler}
                className="outline-none"
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <input
                type="radio"
                name="gender"
                id="female"
                value={"female"}
                checked={signupData.gender === "female"}
                onChange={onChangeHandler}
                className="outline-none"
              />
              <label htmlFor="female"> Female</label>
            </div>
          </div>

          <span
            className={`${
              errorMessage ? "inline" : "hidden"
            } text-center text-red-500 text-xs`}
          >
            {errorMessage}
          </span>

          <AuthBtn
            type="submit"
            onclick={onSubmitHandler}
            active={true}
            text={"Sign up"}
          />

          <Link
            to={"/login"}
            className="block md:hidden font-medium text-base text-blue-700"
          >
            Already a user? Login
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignupFrom;
