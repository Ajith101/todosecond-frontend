import React from "react";
import { CgClose } from "react-icons/cg";

const MObNav = ({ setMobNav }) => {
  return (
    <div className="fixed md:hidden top-0 right-0 w-2/3 h-screen bg-violet-600 flex flex-col justify-center items-center text-white">
      <CgClose
        onClick={() => setMobNav(false)}
        className="fixed top-5 right-5"
        size={"29px"}
      />
    </div>
  );
};

export default MObNav;
