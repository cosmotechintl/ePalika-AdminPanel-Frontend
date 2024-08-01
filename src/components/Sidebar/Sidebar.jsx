import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { MdDesignServices } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { PiSignOut } from "react-icons/pi";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import { performLogout } from "../../auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { adminRequest, updateAuthToken } from "../../utils/requestMethod";
import { GrServices } from "react-icons/gr";
import { BsChatLeftText, BsPeople } from "react-icons/bs";
const iconMapping = {
  IoHomeOutline,
  IoSettingsOutline,
  MdDesignServices,
  GrUserAdmin,
  PiSignOut,
  GrServices,
  BsChatLeftText,
  BsPeople,
};
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigation, setNavigation] = useState([]);
  const handleSignout = () => {
    performLogout(() => {
      toast.success("Logging Out");
      navigate("/login");
    });
  };
  const goToHome = () => {
    navigate("/");
  };
  useEffect(() => {
    let isMounted = true;
    const fetchNavigation = async () => {
      try {
        const navigation = await adminRequest.get(`${BASE_URL}/navigation`);
        if (isMounted) {
          updateAuthToken();
          setNavigation(navigation.data);
        }
      } catch (error) {
        if (isMounted) {
          console.log("Failed to fetch navigation");
        }
      }
    };
    fetchNavigation();
    return () => {
      isMounted = false;
    };
  }, []);
  if (!navigation) return <div>Loading...</div>;
  if (!navigation || !navigation.data) return <div>No data available</div>;
  const sortedData = navigation.data.sort((a, b) => a.position - b.position);
  return (
    <div className="sidebarContainer">
      <div className="sidebarContents">
        <div className="sidebarMenuContainer">
          <SidebarMenu
            icon={<IoHomeOutline />}
            title="Dashboard"
            onClick={goToHome}
          />
          {sortedData.map((item, index) => {
            const IconComponent = iconMapping[item.icon];
            return (
              <Link
                to={`${item.navigation}`}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <SidebarMenu
                  icon={IconComponent ? <IconComponent /> : null}
                  title={item.name}
                  // isActive={!activeURL || activeURL === "reports" || activeURL === "profile"}
                />
              </Link>
            );
          })}
          <SidebarMenu
            icon={<PiSignOut />}
            title="Sign Out"
            onClick={handleSignout}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
