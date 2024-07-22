import React, { useState, useEffect, useRef } from "react";
import "./List.scss";
import { FaEyeSlash, FaFilter } from "react-icons/fa";
import { IoIosAddCircle, IoIosMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import OptionsMenu from "../../components/OptionsMenu/OptionsMenu";

const List = ({
  title = "Default Title",
  link = "/",
  createButtonLabel = "Create Button",
  headers = [],
  rows = [],
  showEyeViewIcon = true,
  showFilterIcon = true,
  getMenuItems,
}) => {
  const navigate = useNavigate();
  const [visibleMenu, setVisibleMenu] = useState(null);
  const menuRefs = useRef([]);

  const handleCreateButtonClick = () => {
    navigate(link);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMoreClick = (rowIndex) => {
    setVisibleMenu(visibleMenu === rowIndex ? null : rowIndex);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRefs.current.every((ref) => ref && !ref.contains(event.target))) {
        setVisibleMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="viewPageContainer">
      <div className="viewPageContents">
        <div className="top">
          <span className="leftTitle">
            <FaArrowLeftLong onClick={handleBackClick} className="icon" />
            {title}
          </span>
          <span className="rightContents">
            {showEyeViewIcon && (
              <span className="eyeViewIcon">
                <FaEyeSlash />
              </span>
            )}
            {showFilterIcon && (
              <span className="filterIcon">
                <FaFilter />
              </span>
            )}
            <span className="createButton" onClick={handleCreateButtonClick}>
              <span className="title">{createButtonLabel}</span>
              <span className="addIcon">
                <IoIosAddCircle />
              </span>
            </span>
          </span>
        </div>
        <div className="bottom">
          <table className="listTable">
            <thead>
              <tr className="tableHeaderRow">
                <th></th>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td
                    style={{ position: "relative" }}
                    ref={(el) => (menuRefs.current[rowIndex] = el)}
                  >
                    <IoIosMore onClick={() => handleMoreClick(rowIndex)} />
                    {visibleMenu === rowIndex && (
                      <OptionsMenu
                        menuItems={getMenuItems(row)}
                        visible={true}
                      />
                    )}
                  </td>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
