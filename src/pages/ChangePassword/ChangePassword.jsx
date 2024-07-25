import React, { useState } from "react";
import "./ChangePassword.scss";
import { adminRequest, updateAuthToken } from "../../utils/requestMethod";
import { BASE_URL } from "../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/admin/changePassword`, {
          oldPassword: oldPassword,
          newPassword: newPassword,
          retypeNewPassword: confirmPassword,
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
    } catch (error) {
      toast.error(error.message);
    }
  };
  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  updateAuthToken();
  return (
    <div className="changePasswordContainer">
      <div className="changePasswordContents">
        <div className="changePasswordLeft">
          <div className="changePasswordHeader">
            <span className="goBackIcon" onClick={goBack}>
              <FaArrowLeftLong />
            </span>
            <span>Change Password</span>
          </div>
          <form className="changePasswordContainer" onSubmit={handleSubmit}>
            <span className="changePasswordInput">
              <label htmlFor="old-password" className="passwordLabel">
                Old Password
              </label>
              <div className="changePasswordWrapper">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  id="old-password"
                  className="password-box"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="passwordToggleBtn"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </span>
            <span className="changePasswordInput">
              <label htmlFor="new-password" className="passwordLabel">
                New Password
              </label>
              <div className="changePasswordWrapper">
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
            <span className="changePasswordInput">
              <label htmlFor="confirm-password" className="passwordLabel">
                Confirm Password
              </label>
              <div className="changePasswordWrapper">
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
              <input
                type="submit"
                value="Change Password"
                className="submitBtn"
              />
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
              <li>Password must contain minimum 1 special character(s).</li>
              <li>Password must contain minimum 1 digit(s).</li>
              <li>Password must contain minimum 1 lowercase letter(s).</li>
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
export default ChangePassword;
