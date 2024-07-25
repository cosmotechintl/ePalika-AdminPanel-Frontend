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
import HealthServiceCategoryList from "../Category/HealthServiceCategory/HealthServiceCategoryList/HealthServiceCategoryList";
import CreateHealthServiceCategory from "../Category/HealthServiceCategory/CreateHealthServiceCategory/CreateHealthServiceCategory";
import AdminList from "../Admin/AdminList/AdminList";
import AdminDetails from "../Admin/AdminDetails/AdminDetails";
import EducationLevelList from "../Category/Education/EducationLevel/EducationLevelList";
import CreateEducationLevel from "../Category/Education/EducationLevel/CreateEducationLevel";
import EducationOwnershipList from "../Category/Education/EducationOwnership/EducationOwnershipList";
import CreateEducationOwnership from "../Category/Education/EducationOwnership/CreateEducationOwnership";
import EducationList from "../Education/EducationList/EducationList";
import CreateEducation from "../Education/CreateEducation/CreateEducation";
import UserProfile from "../UserProfile/UserProfile";
import ChangePassword from "../ChangePassword/ChangePassword";

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
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/changePassword" element={<ChangePassword />} />
              <Route path="adminUser" element={<AdminList />} />
              <Route path="/adminUser/view/:email" element={<AdminDetails />} />
              <Route path="news" element={<NewsList />} />
              <Route path="news/create" element={<CreateNews />} />
              <Route path="news/view/:code" element={<EditNews />} />
              <Route path="police" element={<PoliceStationList />} />
              <Route path="police/create" element={<CreatePoliceStation />} />
              <Route path="tourismAreas" element={<TourismAreaList />} />
              <Route
                path="tourismAreas/create"
                element={<CreateTourismArea />}
              />
              <Route path="healthService" element={<HealthPostList />} />
              <Route
                path="healthService/create"
                element={<CreateHealthPost />}
              />
              <Route path="education" element={<EducationList />} />
              <Route path="education/create" element={<CreateEducation />} />
              <Route path="event" element={<EventList />} />
              <Route path="event/create" element={<CreateEvent />} />
              <Route path="setting" element={<Settings />} />
              <Route
                path="setting/systemConfiguration"
                element={<SystemConfiguration />}
              />
              <Route
                path="/setting/systemConfiguration/newsCategory"
                element={<NewsCategoryList />}
              />
              <Route
                path="/setting/systemConfiguration/newsCategory/create"
                element={<CreateNewsCategory />}
              />
              <Route
                path="/setting/systemConfiguration/eventCategory"
                element={<EventCategoryList />}
              />
              <Route
                path="/setting/systemConfiguration/eventCategory/create"
                element={<CreateEventCategory />}
              />
              <Route
                path="/setting/systemConfiguration/tourismAreaCategory"
                element={<TourismAreaCategoryList />}
              />
              <Route
                path="/setting/systemConfiguration/tourismAreaCategory/create"
                element={<CreateTourismAreaCategory />}
              />
              <Route
                path="/setting/systemConfiguration/healthServiceCategory"
                element={<HealthServiceCategoryList />}
              />
              <Route
                path="/setting/systemConfiguration/healthServiceCategory/create"
                element={<CreateHealthServiceCategory />}
              />
              <Route
                path="/setting/systemConfiguration/educationLevel"
                element={<EducationLevelList />}
              />
              <Route
                path="/setting/systemConfiguration/educationLevel/create"
                element={<CreateEducationLevel />}
              />
              <Route
                path="/setting/systemConfiguration/educationOwnership"
                element={<EducationOwnershipList />}
              />
              <Route
                path="/setting/systemConfiguration/educationOwnership/create"
                element={<CreateEducationOwnership />}
              />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};
export default Homepage;
