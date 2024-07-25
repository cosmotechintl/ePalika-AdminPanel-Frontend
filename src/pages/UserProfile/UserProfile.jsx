import React, { useState } from "react";
import "./UserProfile.scss";
import { MdGroups2 } from "react-icons/md";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { adminRequest, updateAuthToken } from "../../utils/requestMethod";
import Loader from "../../components/Loader/Loader";
const UserProfile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const maskContent = (content) => {
    return isVisible ? content : content.replace(/./g, "*");
  };
  const { data, loading, error } = useFetch(
    `${BASE_URL}/admin/viewProfile`,
    adminRequest
  );
  updateAuthToken();
  if (loading) {
    return <Loader />;
  }
  if (!data || !data.data) {
    return <p>Not Found.</p>;
  }
  const {
    name,
    username,
    email,
    mobileNumber,
    status,
    accessGroup,
    profilePictureName,
  } = data.data;

  return (
    <div className="userProfileContainer">
      <div className="userProfileContents">
        <div className="header">
          <span>My Profile</span>
          <span onClick={toggleVisibility} className="visibilityToggle">
            {isVisible ? (
              <FaEye title="Hide Sensitive Data" />
            ) : (
              <FaEyeSlash title="View Sensitive Data" />
            )}
          </span>
        </div>
        <div className="body">
          <div className="left">
            <div className="profileImgContainer">
              <img
                src={
                  profilePictureName
                    ? `${BASE_URL}/path/to/images/${profilePictureName}`
                    : "https://www.w3schools.com/howto/img_avatar.png"
                }
                alt="profile"
                className="profileImg"
              />
            </div>
            <div className="userDetailsContainer">
              <span className="fullName">{name}</span>
              <span className="username">{maskContent(`@${username}`)}</span>
              <span className="status">{status.name}</span>
              <span className="accessGroup">
                <span className="icon">
                  <MdGroups2 />
                </span>
                <span className="groupName">{accessGroup.name}</span>
              </span>
            </div>
          </div>
          <div className="right">
            <div className="headerRight">Contact</div>
            <div className="emailContainer">
              <span className="icon">
                <FaEnvelope />
              </span>
              <span className="email">{maskContent(email)}</span>
            </div>
            <div className="phoneContainer">
              <span className="icon">
                <FaPhoneAlt />
              </span>
              <span className="phone">{maskContent(mobileNumber)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
