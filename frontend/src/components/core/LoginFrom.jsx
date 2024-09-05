import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/operations/authAPI";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const LoginFrom = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoading, setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setErrorMessage("All fields are required");
      return;
    }

    setLoading(true); // Start loading indicator
    try {
      await login(loginData, setUser, setToken, setLoading, navigate);
    } catch (error) {
      setErrorMessage("Failed to login");
    } finally {
      setLoading(false); // End loading indicator
    }

    setLoginData({ email: "", password: "" }); // Clear form fields
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="w-full flex flex-col justify-center items-center space-y-4"
      >
        <h2 className="text-4xl text-black font-bold">Login</h2>
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={onChangeHandler}
          className="w-full text-lg px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={onChangeHandler}
          className="w-full text-lg px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
        />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button
          type="submit"
          className="px-14 py-3 bg-blue-600 text-white rounded-md font-semibold"
        >
          Login
        </button>

        <Link
          to={"/signup"}
          className="block md:hidden font-medium text-base text-blue-700"
        >
          Don't have an account? Sign Up
        </Link>
      </form>
    </>
  );
};

export default LoginFrom;
