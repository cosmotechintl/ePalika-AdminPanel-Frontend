import React from "react";
import "./Dashboard.scss";
const Dashboard = () => {
  return (
    <div className="dashboardContainer">
      <div className="dashboardCardContainer">
        <div className="populationCardItem">
          <div className="populationCardItemContents">
            <span className="populationCardHeader">Total Population</span>
            <span className="populationCount">10000</span>
            <span className="maleFemaleContainer">
              <span className="mailPercentage">80%</span>
              <span className="femalePercentage">20%</span>
            </span>
          </div>
        </div>
        <div className="populationCardItem">
          <div className="populationCardItemContents">
            <span className="populationCardHeader">Total Population</span>
            <span className="populationCount">10000</span>
            <span className="maleFemaleContainer">
              <span className="mailPercentage">80%</span>
              <span className="femalePercentage">20%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
