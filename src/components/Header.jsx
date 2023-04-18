import React, { useState } from "react";
import { RiMenu5Line } from "react-icons/ri";
import MObNav from "./MObNav";
import { useNavigate, NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [mobNav, setMobNav] = useState(false);
  return (
    <>
      <div className="bg-violet-600 w-full px-10 py-5 text-white flex justify-between items-center">
        <div className="image">
          <NavLink to="/">
            <h1 className="text-2xl font-semibold">Todo App</h1>
          </NavLink>
        </div>
        <div className="">
          <RiMenu5Line
            onClick={() => setMobNav(true)}
            className="md:hidden"
            size={"25px"}
          />
          <ul className="hidden md:flex gap-5 text-xl font-medium justify-center items-center">
            <li>Home</li>
            <li>About</li>
            <li>contact</li>
          </ul>
        </div>
      </div>
      {mobNav ? <MObNav setMobNav={setMobNav} /> : null}
    </>
  );
};

export default Header;
