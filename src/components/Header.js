import React from "react";
import logo from "../img/logo72.png";

function Header() {
  return (
    <div className="p-3 bg-purple-700 flex justify-center items-center">
      <img src={logo} alt="" className="w-8 h-8 mr-4" />
      <span className=" text-white font-semibold text-2xl">Globe times</span>
    </div>
  );
}

export default Header;
