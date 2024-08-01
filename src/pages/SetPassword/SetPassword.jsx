import React, { useState } from "react";
import "./SetPassword.scss";
import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";

const SetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const activeUuid = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await toast.promise(
        axios.post(`${BASE_URL}/admin/setPassword`, {
          uuid: activeUuid,
          password: newPassword,
          confirmPassword: confirmPassword,
        }),
        {
          pending: "Processing your request",
        }
      );
      if (response.data.code == 0) {
        toast.success(response.data.message, {
          autoClose: 500,
          onClose: () => navigate("/login"),
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="createPasswordContainer">
      <div className="createPasswordContents">
        <div className="left">
          <div className="createPasswordlogoContainer">
            <img src={logo} alt="logo" className="logoContainerImg" />
          </div>
          <div className="headerText">Set Password</div>
          <p className="descText">
            Welcome to the ePalika Admin Panel! To secure your account, please
            create a new password below.
          </p>
          <form className="passwordContainer" onSubmit={handleSubmit}>
            <span className="passwordInput">
              <label htmlFor="new-password" className="passwordLabel">
                New Password
              </label>
              <div className="passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  id="new-password"
                  className="password-box"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="passwordToggleBtn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </span>
            <span className="passwordInput">
              <label htmlFor="confirm-password" className="passwordLabel">
                Confirm Password
              </label>
              <div className="passwordWrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirm-password"
                  className="password-box"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="passwordToggleBtn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </span>
            <span className="submit-btn">
              <input type="submit" value="Set Password" className="submitBtn" />
            </span>
          </form>
        </div>
        <div className="right">
          <h2 className="rightHeader">Password Criterias</h2>
          <span className="desc">
            Create a secure password using the following criterias
          </span>
          <span className="criterias">
            <ul>
              <li>
                Password should must contain minimum 1 special character(s).
              </li>
              <li>Password should must contain minimum 1 digit(s).</li>
              <li>
                Password should must contain minimum 1 lowercase letter(s).
              </li>
              <li>Password maximum length is 15.</li>
              <li>Password minimum length is 8.</li>
            </ul>
          </span>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default SetPassword;
