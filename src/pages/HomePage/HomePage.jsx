import React, { useEffect } from "react";
import "./HomePage.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import AccessGroupList from "../AccessGroup/AccessGroupList/AccessGroupList";
import CreateAccessGroup from "../AccessGroup/CreateAccessGroup/CreateAccessGroup";
import CreateAdmin from "../Admin/CreateAdmin/CreateAdmin";
import Services from "../Services/Services";
import { useAuth } from "../../auth/useAuth";
import ViewNews from "../News/ViewNews/ViewNews";
import EditEvent from "../Event/EditEvent/EditEvent";
import EditHealthPost from "../HealthPost/EditHealthPost/EditHealthPost";
import EditEducation from "../Education/EditEducation/EditEducation";
import EditTourismArea from "../TourismArea/EditTourismArea/EditTourismArea";
import EditPoliceStation from "../PoliceStation/EditPoliceStation/EditPoliceStation";
import EventDetails from "../Event/EventDetails/EventDetails";
import HealthPostDetails from "../HealthPost/HealthPostDetails/HealthPostDetails";
import EducationDetails from "../Education/EducationDetails/EducationDetails";
import TourismAreaDetails from "../TourismArea/TourismAreaDetails/TourismAreaDetails";
import PoliceStationDetails from "../PoliceStation/PoliceStationDetails/PoliceStationDetails";
import HelpLineCategory from "../Category/HelpLine/HelpLineCategoryList/HelpLineCategory";
import CreateHelpLineCategory from "../Category/HelpLine/CreateHelpLineCategory/CreateHelpLineCategory";
import HelpLineList from "../HelpLine/HelpLineList/HelpLineList";
import CreateHelpLine from "../HelpLine/CreateHelpLine/CreateHelpLine";
import EditHelpLine from "../HelpLine/EditHelpLine/EditHelpLine";
import FinanceCategoryList from "../Category/FinanceCategory/FinanceCategoryList/FinanceCategoryList";
import CreateFinanceCategory from "../Category/FinanceCategory/CreateFinanceCategory/CreateFinanceCategory";
import FinanceList from "../Finance/FinanceList/FinanceList";
import CreateFinance from "../Finance/CreateFinance/CreateFinance";
import EditFinance from "../Finance/EditFinance/EditFinance";
import FinanceDetails from "../Finance/FinanceDetails/FinanceDetails";
import QueryList from "../Query/QueryList/QueryList";
import QueryDetails from "../Query/QueryDetails/QueryDetails";
import CustomerList from "../Customer/CustomerList/CustomerList";
import CustomerDetails from "../Customer/CustomerDetails/CustomerDetails";
import ViewTermsAndCondition from "../TermsAndCondition/ViewTermsAndCondition/ViewTermsAndCondition";
import EditTermsAndCondition from "../TermsAndCondition/EditTermsAndCondition/EditTermsAndCondition";

const Homepage = () => {
  useAuth();
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
              <Route path="/services" element={<Services />} />
              <Route
                path="setting/termsAndConditions"
                element={<ViewTermsAndCondition />}
              />
              <Route
                path="setting/termsAndConditions/edit"
                element={<EditTermsAndCondition />}
              />
              <Route path="/queries" element={<QueryList />} />
              <Route path="/queries/view/:code" element={<QueryDetails />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route
                path="/customers/view/:code"
                element={<CustomerDetails />}
              />
              <Route path="/changePassword" element={<ChangePassword />} />
              <Route path="/accessGroup" element={<AccessGroupList />} />
              <Route
                path="/accessGroup/create"
                element={<CreateAccessGroup />}
              />
              <Route path="adminUser" element={<AdminList />} />
              <Route path="/adminUser/create" element={<CreateAdmin />} />
              <Route path="/adminUser/view/:email" element={<AdminDetails />} />
              <Route path="news" element={<NewsList />} />
              <Route path="news/create" element={<CreateNews />} />
              <Route path="/news/edit/:code" element={<EditNews />} />
              <Route path="/news/view/:code" element={<ViewNews />} />
              <Route path="police" element={<PoliceStationList />} />
              <Route path="police/create" element={<CreatePoliceStation />} />
              <Route path="police/edit/:code" element={<EditPoliceStation />} />
              <Route
                path="police/view/:code"
                element={<PoliceStationDetails />}
              />
              <Route path="tourismAreas" element={<TourismAreaList />} />
              <Route
                path="tourismAreas/create"
                element={<CreateTourismArea />}
              />
              <Route
                path="tourismAreas/edit/:code"
                element={<EditTourismArea />}
              />
              <Route
                path="tourismAreas/view/:code"
                element={<TourismAreaDetails />}
              />
              <Route path="healthService" element={<HealthPostList />} />
              <Route
                path="healthService/create"
                element={<CreateHealthPost />}
              />
              <Route
                path="/healthService/edit/:code"
                element={<EditHealthPost />}
              />
              <Route
                path="/healthService/view/:code"
                element={<HealthPostDetails />}
              />
              <Route path="education" element={<EducationList />} />
              <Route path="education/create" element={<CreateEducation />} />
              <Route path="/education/edit/:code" element={<EditEducation />} />
              <Route
                path="/education/view/:code"
                element={<EducationDetails />}
              />
              <Route path="event" element={<EventList />} />
              <Route path="/event/view/:code" element={<EventDetails />} />
              <Route path="/event/create" element={<CreateEvent />} />
              <Route path="/event/edit/:code" element={<EditEvent />} />
              <Route path="helpLine" element={<HelpLineList />} />
              <Route path="/helpLine/create" element={<CreateHelpLine />} />
              <Route path="/helpLine/edit/:code" element={<EditHelpLine />} />
              <Route path="finance" element={<FinanceList />} />
              <Route path="/finance/view/:code" element={<FinanceDetails />} />
              <Route path="/finance/create" element={<CreateFinance />} />
              <Route path="/finance/edit/:code" element={<EditFinance />} />
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
              <Route
                path="/setting/systemConfiguration/helpLineCategory"
                element={<HelpLineCategory />}
              />
              <Route
                path="/setting/systemConfiguration/helpLineCategory/create"
                element={<CreateHelpLineCategory />}
              />
              <Route
                path="/setting/systemConfiguration/financeCategory"
                element={<FinanceCategoryList />}
              />
              <Route
                path="/setting/systemConfiguration/financeCategory/create"
                element={<CreateFinanceCategory />}
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
