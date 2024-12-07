import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Todo Magic</div>
        <div className="space-x-6">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-gray-200">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
