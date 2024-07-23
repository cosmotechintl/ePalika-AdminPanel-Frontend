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
import Settings from "../Settings/Settings";
import SystemConfiguration from "../Settings/SystemConfiguration/SystemConfiguration";
import NewsCategoryList from "../Category/NewsCategory/NewsCategoryList/NewsCategoryList";
import CreateNewsCategory from "../Category/NewsCategory/CreateNewsCategory/CreateNewsCategory";
import EventCategoryList from "../Category/EventCategory/EventCategoryList/EventCategoryList";
import CreateEventCategory from "../Category/EventCategory/CreateEventCategory/CreateEventCategory";
import TourismAreaCategoryList from "../Category/TourismAreaCategory/TourismAreaCategoryList/TourismAreaCategoryList";
import CreateTourismAreaCategory from "../Category/TourismAreaCategory/CreateTourismAreaCategory/CreateTourismAreaCategory";
import EditNews from "../News/EditNews/EditNews";

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
              <Route path="news/edit/:identifier" element={<EditNews />} />
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
              <Route path="settings" element={<Settings />} />
              <Route
                path="settings/systemConfiguration"
                element={<SystemConfiguration />}
              />
              <Route
                path="/settings/systemConfiguration/newsCategory"
                element={<NewsCategoryList />}
              />
              <Route
                path="/settings/systemConfiguration/newsCategory/create"
                element={<CreateNewsCategory />}
              />
              <Route
                path="/settings/systemConfiguration/eventCategory"
                element={<EventCategoryList />}
              />
              <Route
                path="/settings/systemConfiguration/eventCategory/create"
                element={<CreateEventCategory />}
              />
              <Route
                path="/settings/systemConfiguration/tourismAreaCategory"
                element={<TourismAreaCategoryList />}
              />
              <Route
                path="/settings/systemConfiguration/tourismAreaCategory/create"
                element={<CreateTourismAreaCategory />}
              />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" draggable />
    </div>
  );
};
export default Homepage;
