import React from "react";
import "./HomePage.scss";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewsList from "../News/NewsList/NewsList";
import CreateNews from "../News/CreateNews/CreateNews";
import PoliceStationList from "../PoliceStation/PoliceStationList/PoliceStationList";
import CreatePoliceStation from "../PoliceStation/CreatePoliceStation/CreatePoliceStation";
import TourismAreaList from "../TourismArea/TourismAreaList/TourismAreaList";
import CreateTourismArea from "../TourismArea/CreateTourismArea/CreateTourismArea";
import HealthPostList from "../HealthPost/HealthPostList/HealthPostList";
import CreateHealthPost from "../HealthPost/CreateHealthPost/CreateHealthPost";
import EventList from "../Event/EventList/EventList";
import CreateEvent from "../Event/CreateEvent/CreateEvent";
const Homepage = () => {
  return (
    <div className="homepageContainer">
      <div className="homepageContents">
        <div className="homepage__top">
          <div className="navbarArea">
            <Navbar />
          </div>
        </div>
        <div className="middle">
          <div className="homepageContents__left">
            <div className="sidebarArea">
              <Sidebar />
            </div>
          </div>
          <div className="homepageContents__right">
            <Routes>
              <Route path="news" element={<NewsList />} />
              <Route path="news/create" element={<CreateNews />} />
              <Route path="policeStation" element={<PoliceStationList />} />
              <Route
                path="policeStation/create"
                element={<CreatePoliceStation />}
              />
              <Route path="tourismArea" element={<TourismAreaList />} />
              <Route
                path="tourismArea/create"
                element={<CreateTourismArea />}
              />
              <Route path="healthPost" element={<HealthPostList />} />
              <Route path="healthPost/create" element={<CreateHealthPost />} />
              <Route path="event" element={<EventList />} />
              <Route path="event/create" element={<CreateEvent />} />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" draggable />
    </div>
  );
};
export default Homepage;
