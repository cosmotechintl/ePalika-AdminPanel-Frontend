import React from "react";
import "./Settings.scss";
import Card from "../../components/Card/Card";
import { MdGroups, MdPolicy, MdMiscellaneousServices } from "react-icons/md";
import { Link } from "react-router-dom";
const Settings = () => {
  return (
    <div className="settingPageContainer">
      <div className="settingPageContents">
        <div className="headerTitle">Settings</div>
        <div className="settingsCard">
          <Link to="group" style={{ textDecoration: "none" }}>
            <Card icon={<MdGroups />} title="Access Groups" />
          </Link>
          <Link to="systemConfiguration" style={{ textDecoration: "none" }}>
            <Card
              icon={<MdMiscellaneousServices />}
              title="System Configuration"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
