import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AuthBtn from "./AuthBtn";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { logout } from "../../services/operations/authAPI";

function Navbar() {
  const { token, setUser, setToken } = useContext(UserContext);

  const [sidebar, setSidebar] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout(setUser, setToken, navigate);
  };

  return (
    <>
      <nav className="w-full py-2 px-3 md:px-8 flex items-center justify-between border-b">
        {/* Logo */}
        <Logo />

        {/* Navlinks and sidebar */}

        <div
          className={`text-lg w-[250px] md:static bg-white fixed z-[999] top-0 bottom-0 ${
            sidebar ? "right-0" : "right-[-400px]"
          } transition-all duration-500`}
        >
          {/* close button */}
          <div className="w-full ml-auto px-4 pt-4 md:hidden">
            <IoCloseOutline
              fontSize={26}
              onClick={() => setSidebar(false)}
              className="cursor-pointer"
            />
          </div>

          {/* links */}
          <ul className="flex flex-col items-start md:flex-row md:justify-center md:items-center md:space-x-4 lg:space-x-8 md:p-0 p-4 pt-0">
            <Link
              to={"/"}
              onClick={() => setSidebar(false)}
              className="border-b border-b-slate-200 md:border-none w-full md:w-fit"
            >
              <li
                className={`hover:text-blue-700 transition-colors p-2 ${
                  location.pathname.endsWith("/") && "text-blue-700"
                }`}
              >
                Home
              </li>
            </Link>
            <Link
              to={"/dashboard"}
              onClick={() => setSidebar(false)}
              className="border-b border-b-slate-200 md:border-none w-full md:w-fit"
            >
              <li
                className={`hover:text-blue-700 transition-colors p-2 ${
                  location.pathname.endsWith("/dashboard") && "text-blue-700"
                }`}
              >
                Dashboard
              </li>
            </Link>
            <Link
              to={"/tasks"}
              onClick={() => setSidebar(false)}
              className="border-b border-b-slate-200 md:border-none w-full md:w-fit"
            >
              <li
                className={`hover:text-blue-700 transition-colors p-2 ${
                  location.pathname.endsWith("/tasks") && "text-blue-700"
                }`}
              >
                Tasks
              </li>
            </Link>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center space-x-2 md:space-x-4">
          {!token && (
            <Link to={"/login"}>
              <AuthBtn active={true} text={"Login"} />
            </Link>
          )}
          {!token && (
            <Link to={"/signup"}>
              <AuthBtn
                active={true}
                text={"Sign up"}
                customClasses="md:block hidden"
              />
            </Link>
          )}
          {token && <AuthBtn text={"Logout"} onclick={logoutHandler} />}

          {/* Menu button */}
          <HiOutlineMenu
            fontSize={26}
            className={`text-black md:hidden cursor-pointer`}
            onClick={() => setSidebar(true)}
          />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
