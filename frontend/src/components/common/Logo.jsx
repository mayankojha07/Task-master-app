import React from "react";
import { FaListUl } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to={"/"}>
        <div className="flex gap-x-1 md:gap-x-3 items-center justify-between w-fit cursor-pointer shadow-sm shadow-slate-300 p-2 md:p-3 rounded-md">
          <div className="md:px-4 p-2 py-2 text-white bg-[#906EED] rounded-md">
            <FaListUl fontSize={14} />
          </div>
          <span className="text-xl text-[#030303ff] font-medium ">
            TaskMaster
          </span>
        </div>
      </Link>
    </>
  );
}

export default Logo;
