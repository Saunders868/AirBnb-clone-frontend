import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URI } from "../constants";
import { UserContext } from "../context/UserContext";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const { user } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const userImageUrl = BASE_URI + "/uploads/user" + user?.avatar;
  return (
    <header className="flex justify-between">
      {/* add aria label */}
      <Link className="flex items-center gap-1" to={"/"}>
        <svg
          aria-labelledby="logo"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 -rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>

        {/* logo name */}
        <span id="logo" className="font-bold text-xl">
          airbnb
        </span>
      </Link>

      {/* searchbar */}
      <div className="header-item hidden md:flex shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border-l border-gray-300" />
        <div>Any week</div>
        <div className="border-l border-gray-300" />
        <div>Any guests</div>
        <button className="bg-primary text-white p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
            aria-label="Search"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      {/* user widget */}
      <div className="header-item items-center relative">
        <button
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          className="hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
          type="button"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            aria-label="Menu"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <DropdownMenu
          dropDown={isOpen}
          user={user}
          setDropdownState={setIsOpen}
        />

        {/* user Icon */}
        {user ? (
          <div className="w-4 h-4 overflow-hidden rounded-full">
            <img className="object-cover aspect-square w-full h-full" src={user?.avatar.length > 0 ? userImageUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="profile" />
          </div>
        ) : (
          <Link
            to={"/login"}
            aria-label="User"
            className=" bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
