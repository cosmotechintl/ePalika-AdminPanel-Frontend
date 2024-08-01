import React from "react";
import "./Settings.scss";
import Card from "../../components/Card/Card";
import { MdGroups, MdMiscellaneousServices } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const Settings = () => {
  return (
    <div className="settingPageContainer">
      <div className="settingPageContents">
        <div className="headerTitle">Settings</div>
        <div className="settingsCard">
          <Link to="/accessGroup" style={{ textDecoration: "none" }}>
            <Card icon={<MdGroups />} title="Access Groups" />
          </Link>
          <Link to="systemConfiguration" style={{ textDecoration: "none" }}>
            <Card
              icon={<MdMiscellaneousServices />}
              title="System Configuration"
            />
          </Link>
          <Link to="termsAndConditions" style={{ textDecoration: "none" }}>
            <Card icon={<FaRegFileAlt />} title="Terms & Conditions" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
