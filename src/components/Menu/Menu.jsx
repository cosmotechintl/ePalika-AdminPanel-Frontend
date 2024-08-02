import React from "react";
import "./Menu.scss";
import { CiUser } from "react-icons/ci";
import { PiAddressBookLight, PiSignOut } from "react-icons/pi";
import { IoLockClosedOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { performLogout } from "../../auth";
const Menu = () => {
  const navigate = useNavigate();
  const handleSignout = () => {
    performLogout(() => {
      toast.success("Logging Out");
      navigate("/login");
    });
  };
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
        <div className="menuItem" onClick={handleSignout}>
          <span className="icon">
            <PiSignOut />
          </span>
          <span className="title">Sign Out</span>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Menu;
