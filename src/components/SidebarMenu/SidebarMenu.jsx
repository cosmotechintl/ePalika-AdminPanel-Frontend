import React from "react";
import "./SidebarMenu.scss";

const SidebarMenu = ({ isActive, icon, title, onClick }) => {
  return (
    <div
      className={`sidebarMenu ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="menuContent">
        <span className="sidebarIcon">{icon}</span>
        <h3 className="title">{title}</h3>
      </div>
    </div>
  );
};

export default SidebarMenu;
