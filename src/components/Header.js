import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

import logo from "../../public/images/logo.png";
import profilenav from "../../public/images/profilenav.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="px-6 relative bg-white">
      <div className="flex items-center justify-between border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10">
        <div className="flex flex-col justify-start lg:w-0 lg:flex-1 mb-1">
          <div className="w-8 mb-1 h-0.5 bg-gray-600"></div>
          <div className="w-8 mb-1 h-0.5 bg-gray-600"></div>
          <div className="w-8 mb-1 h-0.5 bg-gray-600"></div>
        </div>

        <div className="grid place-items-center">
          <img src={logo} className="h-8 w-auto sm:h-10" />
        </div>

        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          <div className="flex items-center justify-between">
            <img src={profilenav} className="h-4 w-4" />
            <div className="flex px-3">{user && user.nama}</div>
            <a className="flex" onClick={logout}>
              <svg
                className="grid place-items-center ml-2 h-5 w-5 group-hover:text-gray-500 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
