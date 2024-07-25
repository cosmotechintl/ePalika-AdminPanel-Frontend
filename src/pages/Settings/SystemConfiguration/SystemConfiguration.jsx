import React from "react";
import "./SystemConfiguration.scss";
import Card from "../../../components/Card/Card";
import { BiSolidInstitution } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { TbMapPin2 } from "react-icons/tb";
import { IoSchoolSharp } from "react-icons/io5";
import { BiHealth } from "react-icons/bi";
const SystemConfiguration = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="systemConfigurationContainer">
      <div className="systemConfigurationContents">
        <div className="systemConfigurationHeader">
          <span className="backIcon" onClick={handleBackClick}>
            <FaArrowLeftLong />
          </span>
          <span>System Configuration</span>
        </div>
        <div className="systemConfigurationCard">
          <Link to="newsCategory" style={{ textDecoration: "none" }}>
            <Card icon={<FaRegNewspaper />} title="News Category" />
          </Link>
          <Link to="eventCategory" style={{ textDecoration: "none" }}>
            <Card icon={<MdEventAvailable />} title="Event Category" />
          </Link>
          <Link to="tourismAreaCategory" style={{ textDecoration: "none" }}>
            <Card icon={<TbMapPin2 />} title="Tourism Area Category" />
          </Link>
          <Link to="healthServiceCategory" style={{ textDecoration: "none" }}>
            <Card icon={<BiHealth />} title="Health Service Category" />
          </Link>
          <Link to="educationLevel" style={{ textDecoration: "none" }}>
            <Card icon={<IoSchoolSharp />} title="Education Level" />
          </Link>
          <Link to="educationOwnership" style={{ textDecoration: "none" }}>
            <Card icon={<BiSolidInstitution />} title="Education Ownership" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SystemConfiguration;
