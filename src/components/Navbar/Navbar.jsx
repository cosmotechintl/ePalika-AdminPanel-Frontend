import React, { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import Menu from "../Menu/Menu";
import { IoChevronDownSharp } from "react-icons/io5";
// import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  //   useEffect(() => {
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);
  return (
    <div className="navbarContainer">
      <div className="logoContainer">
        <div className="left">
          <img src={logo} alt="" className="logoImg" />
        </div>
      </div>
      <div className="profileContainer" onClick={toggleMenu} ref={menuRef}>
        <div className="profile">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="profile"
            className="profileImg"
          />
          <span className="profileName">
            {/* Namaste, {data && data.data ? data.data.username : ""} */}
            Namaste,
          </span>
          <span className="chevron">
            <IoChevronDownSharp />
          </span>
        </div>
        {isMenuOpen && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
