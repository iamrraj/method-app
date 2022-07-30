import React from "react";
import Theme from "../../../resources/Theme/Theme";
import { getRemoveToken } from "../../../service/Auth/Auth";
import { NavLink } from "react-router-dom";
import { AiOutlineCodepenCircle, AiOutlineLogout } from "react-icons/ai";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function SideNav({ small, setSmall }) {
  const SideIcon = [
    {
      name: "Dashboard",
      icon: <AiOutlineCodepenCircle />,
      link: "/",
    },
    {
      name: "Engagement",
      icon: <AiOutlineCodepenCircle />,
      link: "/target-packs/",
    },
    {
      name: "Results",
      icon: <AiOutlineCodepenCircle />,
      link: "/reports/",
    },
    {
      name: "Threats",
      icon: <AiOutlineCodepenCircle />,
      link: "/detection/",
    },
    {
      name: "Organization",
      icon: <AiOutlineCodepenCircle />,
      link: "/malware/",
    },
  ];

  const autoLogout = () => {
    if (
      cookies.get("@method_storage_access_token") === null ||
      cookies.get("@method_storage_access_token") === undefined ||
      cookies.get("@method_storage_access_token") === ""
    ) {
      getRemoveToken();

      // window.location.reload(1);
    }
  };

  React.useEffect(() => {
    autoLogout();
  }, []);

  const navClass =
    "flex flex-row items-center    hover:bg-light300 hover:text-white  h-10 transform  transition-transform ease-in duration-200    ";

  const mainCass =
    "w-full btnn focus:text-mainColor   justify-center inline-block text-center pt-2 pb-2";
  return (
    <div>
      <div
        className={` ${
          small ? "w-20" : ""
        } min-h-screen xssm:hidden tab:flex bg-white   flex-row   `}
      >
        <div className="flex flex-col w-auto   shadow-lg overflow-hidden">
          <div className="flex items-center justify-center h-14  ">
            <a className="text-3xl uppercase " href="# ">
              <img
                src={Theme.Logo.Black}
                alt="Logo"
                className={`${
                  small ? "rounded-full w-14  -ml-0" : "w-40"
                } p-1 pt-6 ml-1  inline-flex`}
              />
            </a>
          </div>

          <ul class={`flex flex-col py-10  `}>
            {SideIcon.map((item, index) => (
              <li key={index + 1} className=" pb-2 w-48 py-2  ">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? `activeClass w-40 rounded-r-lg    bg-light500 text-white ${navClass} `
                      : `inactive w-40 rounded-r-lg    text-deepDark     ${navClass}`
                  }
                >
                  <span className="inline-flex  items-center justify-center h-12 w-12  text-3xl">
                    {/* <img src={item?.icon} alt="icon" className={` "h-8 w-8`} /> */}
                    {item.icon}
                  </span>

                  <span className="text-md    font-medium">{item?.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <ul class={`flex flex-col py-10  `}>
            <li className=" pb-2 w-48 py-2  ">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? `activeClass w-40 rounded-r-lg   bg-light500 text-white ${navClass} `
                    : `inactive w-40 rounded-r-lg  bg-light500 text-white    ${navClass}`
                }
              >
                <span className="inline-flex  items-center justify-center h-12 w-12  text-3xl">
                  <AiOutlineLogout />
                </span>

                <span className="text-md    font-medium">{"Logout"}</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile Header section */}
      <div className="w-full tab:hidden ">
        <section
          id="bottom-navigation"
          className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
        >
          <div id="tabs" className="flex btnn justify-between h-16">
            {SideIcon.map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? ` activeClass bg-light500 text-white  ${mainCass}`
                    : ` inactive   ${mainCass}`
                }
              >
                <span
                  className={` inline-block mb-1 text-3xl text-center relative justify-center  `}
                  style={{ marginBottom: "-2px" }}
                >
                  <span>{item.icon}</span>
                </span>
                <span className="tab pb-2 tab-account block text-xs">
                  {item?.name}
                </span>
              </NavLink>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default SideNav;
