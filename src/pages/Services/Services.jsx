import React, { useEffect, useState } from "react";
import "./Services.scss";
import Card from "../../components/Card/Card";
import { MdGroups, MdMiscellaneousServices } from "react-icons/md";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../utils/requestMethod";
import Loader from "../../components/Loader/Loader";
import { BASE_URL } from "../../utils/config";
import { TbMapPin2 } from "react-icons/tb";
import { GiPoliceCar } from "react-icons/gi";
import { IoSchoolSharp } from "react-icons/io5";
import { MdEventAvailable } from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
const iconMapping = {
  TbMapPin2,
  GiPoliceCar,
  IoSchoolSharp,
  MdEventAvailable,
  BiHealth,
  FaRegNewspaper,
};
const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        const response = await adminRequest.get(`${BASE_URL}/navigation`);
        if (isMounted) {
          const navigationData = response.data.data;

          // Find the services group
          const servicesGroup = navigationData.find(
            (group) => group.uiGroupName === "Services"
          );

          if (servicesGroup) {
            // Use a Set to filter out duplicate roles
            const uniqueRoles = Array.from(
              new Set(servicesGroup.roles.map((role) => role.name))
            ).map((name) =>
              servicesGroup.roles.find((role) => role.name === name)
            );

            setServices(uniqueRoles);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch services");
        }
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);
  if (!services) return <Loader />;
  const sortedData = services.sort((a, b) => a.position - b.position);
  return (
    <div className="servicePageContainer">
      <div className="servicePageContents">
        <div className="headerTitle">Services</div>
        <div className="serviceCard">
          {sortedData.map((item, index) => {
            const IconComponent = iconMapping[item.icon];
            return (
              <Link
                to={`${item.navigation}`}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <Card
                  icon={IconComponent ? <IconComponent /> : null}
                  title={item.name}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
