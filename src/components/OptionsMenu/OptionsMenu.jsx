import React from "react";
import { Link } from "react-router-dom";
import "./OptionsMenu.scss";

const OptionsMenu = ({ menuItems, visible }) => {
  if (!visible) return null;

  return (
    <div className="optionsMenuContainer">
      <div className="optionsMenuContents">
        {menuItems.map((item, index) => (
          <div key={index} className="menuListItem">
            {item.onClick ? (
              <a href="#" onClick={item.onClick}>
                {item.text}
              </a>
            ) : (
              <Link to={item.link}>{item.text}</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsMenu;
