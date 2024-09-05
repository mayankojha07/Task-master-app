import React, { useContext } from "react";
import AuthBtn from "../components/common/AuthBtn";
import HomepagePng from "../assets/homepage-background.png";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Home() {
  const { token } = useContext(UserContext);

  return (
    <>
      <div className="w-full h-full md:h-[calc(100vh-4.425rem)] flex flex-col-reverse md:flex-row justify-end md:justify-center items-center bg-[#E4E6EA] mx-auto">
        <div className="w-full md:w-[35%] p-8 md:p-4">
          <h2 className="text-4xl lg:text-5xl font-bold">Manage Tasks</h2>
          <p className="text-lg mt-4 font-normal">
            Organize your tasks, set deadlines, track progress & achieve your
            goals efficiently.
          </p>

          <Link to={!token ? "/login" : "/tasks"}>
            <AuthBtn
              text={"Start"}
              active={true}
              customClasses="md:px-14 lg:px-14 font-semibold mt-8"
            />
          </Link>
        </div>

        <div className="p-8 md:p-0">
          <img
            src={HomepagePng}
            alt="TaskMaster"
            className="w-full aspect-square object-cover sm:w-[80%] md:w-full"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
