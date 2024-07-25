import React from "react";
import "./Menu.scss";
import { CiUser } from "react-icons/ci";
import { PiAddressBookLight, PiSignOut } from "react-icons/pi";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="menuContainer">
      <div className="menuContents">
        <Link to="/profile" className="menuItem">
          <span className="icon">
            <CiUser />
          </span>
          <span className="title">View Profile</span>
        </Link>
        <div className="menuItem">
          <span className="icon">
            <PiAddressBookLight />
          </span>
          <span className="title">Activity Log</span>
        </div>
        <Link to="/changePassword" className="menuItem">
          <div className="menuItem">
            <span className="icon">
              <IoLockClosedOutline />
            </span>
            <span className="title">Change Password</span>
          </div>
        </Link>
        <div className="menuItem">
          <span className="icon">
            <PiSignOut />
          </span>
          <span className="title">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
