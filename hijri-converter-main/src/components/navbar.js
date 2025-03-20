import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-4 flex justify-center gap-4 bg-white shadow-md">
      <Link to="/" className="btn btn-primary">English</Link>
      <Link to="/arabic2" className="btn btn-secondary">العربية</Link>
    </div>
  );
};

export default Navbar;
