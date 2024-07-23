import React from "react";
import "./Loader.scss";
import { MdOutlineDownloading } from "react-icons/md";
const Loader = () => {
  return (
    <div className="loaderContainer">
      <div className="loaderContents">
        <div className="loaderIcon">
          <MdOutlineDownloading className="loadingIcon" />
        </div>
        <div className="loaderText">
          Please wait, your request is being processed!
        </div>
      </div>
    </div>
  );
};

export default Loader;
