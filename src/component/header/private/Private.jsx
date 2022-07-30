import React from "react";
// import Theme from "../../../../Resources/Theme/ThemeData";
import { AiOutlineCodepenCircle, AiOutlineLogout } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getRemoveToken } from "../../../service/Auth/Auth";

function PrivateHeader(props) {
  const location = useNavigate();

  //   const baseUrl = process.env.PUBLIC_URL;
  //   const link = window.location.pathname;
  //   const params = new URLSearchParams(window.location.search).get("params");
  //   const showHeader =
  //     link === baseUrl + "/" ||
  //     link === baseUrl + "/target-packs/" ||
  //     link === baseUrl + "/reports/" ||
  //     link === baseUrl + "/detection/" ||
  //     link === baseUrl + "/malware/" ||
  //     link === baseUrl + "/intrusion/" ||
  //     link === baseUrl + "/events/"
  //       ? true
  //       : true;

  //   const widgetS = [
  //     {
  //       name: "Central",
  //       value: "Widget",
  //     },
  //     {
  //       name: "Feed",
  //       value: "Dashboard",
  //     },
  //   ];
  const onLogout = () => {
    try {
      getRemoveToken();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main class=" flex-1 bg-white shadow-lg  sticky    ">
      <nav class=" px-6  flex justify-between  h-12">
        <div class="">
          <div className=" flex justify-between">
            <div className=" md:w-4/12 w-3/5  absolute top-1 flex ">
              <input
                type="text"
                placeholder="Search here ..."
                onChange={(e) => props?.setText(e.target.value)}
                className="w-full px-3 bg focus:outline-none focus:ring-1 focus:ring-light700 border-1 border-gray-200 text-black rounded-l-lg bg-white "
              />
              <button className="bg-light700  w-16 h-9  rounded-r-lg shadow   text-white">
                <span className=" text-2xl m-auto font-light text-white  ">
                  <FiSearch className=" ml-3 " />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          <div>
            <button
              className="rounded-full"
              title="User Profile"
              onClick={() => location("/user-details/")}
            >
              <span className="inline-flex  items-center justify-center h-12 w-12  text-3xl">
                <AiOutlineCodepenCircle />
              </span>
            </button>
          </div>

          <div className="ml-3">
            <button
              className="rounded-full   "
              onClick={() => onLogout()}
              title="Logout"
            >
              <span className="inline-flex  items-center justify-center h-12 w-12  text-3xl">
                <AiOutlineLogout />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
}

export default PrivateHeader;
