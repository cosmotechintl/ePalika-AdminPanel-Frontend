import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAdmin } from "../../services/loginService";
import { performLogin } from "../../auth";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import "./Login.scss";
import thumbnail from "../../assets/coatofarm.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    const changedValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: changedValue,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await toast.promise(loginAdmin(loginDetail), {
        pending: "Logging in...",
        success: {
          render({ data }) {
            if (data.code == 0) {
              performLogin(data, () => {
                // Redirect to dashboard
                navigate("/");
              });
              return data.message;
            } else {
              throw new Error(data.message);
            }
          },
        },
        error: {
          render({ data }) {
            return data.message || "An error occurred";
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Username or password doesnot match");
    }
  };

  const isFormValid = loginDetail.username && loginDetail.password;

  return (
    <div className="loginContainer">
      <div className="loginContainer">
        <div className="loginContents">
          <div className="loginContentsLeft">
            <img src={thumbnail} className="loginImg" />
          </div>
          <div className="loginContentsRight">
            <div className="logoContainer">
              <img src={logo} alt="logo" className="companyLogo" />
            </div>
            <div className="headerContainer">
              <span className="header">Welcome Back!</span>
              <span className="desc">Please sign in to continue</span>
            </div>
            <div className="loginForm">
              <div className="inputField">
                <MdOutlineEmail className="inputFieldIcon" />
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your username"
                  className="emailField"
                  value={loginDetail.username}
                  onChange={(e) => handleChange(e, "username")}
                />
              </div>
              <div className="inputField">
                <MdOutlinePassword className="inputFieldIcon" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="passwordField"
                  value={loginDetail.password}
                  onChange={(e) => handleChange(e, "password")}
                />
              </div>
              <div className="loginButton">
                <button
                  type="submit"
                  className="submitButton"
                  onClick={handleFormSubmit}
                  disabled={!isFormValid}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" reverseOrder={true} />
      </div>
    </div>
  );
};

export default Login;
