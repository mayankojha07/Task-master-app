import React, { useContext } from "react";
import AuthBtn from "../components/common/AuthBtn";
import { Link, useLocation } from "react-router-dom";
import LoginFrom from "../components/core/LoginFrom";
import SignupFrom from "../components/core/SignupFrom";
import { UserContext } from "../context/UserContext";
import Spinner from "../components/common/Spinner";

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname.endsWith("/login");

  const { loading } = useContext(UserContext);

  return (
    <>
      <div
        className={`bg-white md:bg-[#f6f5f7] w-full h-[calc(100vh-4.425rem)] flex justify-center items-center ${
          isLogin ? "flex-row" : "flex-row-reverse"
        } `}
      >
        <div
          className={`bg-white w-full  h-full md:h-[80%] md:max-w-[45%] lg:max-w-[30%] px-6 sm:px-16 md:px-12 py-16 flex justify-center items-center rounded-lg shadow-md ${
            isLogin ? "md:rounded-r-none" : "md:rounded-l-none"
          }`}
        >
          {loading ? <Spinner /> : isLogin ? <LoginFrom /> : <SignupFrom />}
        </div>

        <div
          className={`hidden md:w-[45%] lg:w-[30%] md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-purple-800 px-12 py-16 h-[80%] ${
            isLogin ? "rounded-r-lg" : "rounded-l-lg"
          } space-y-8 shadow-md`}
        >
          <h3 className="text-4xl lg:text-5xl text-center font-bold text-gray-200">
            Hello, Friend!
          </h3>
          <p className=" w-72 text-lg text-center text-gray-200">
            Enter your personal details and start journey with us
          </p>
          <Link to={isLogin ? "/signup" : "/login"}>
            <AuthBtn text={isLogin ? "Sign In" : "Login"} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
