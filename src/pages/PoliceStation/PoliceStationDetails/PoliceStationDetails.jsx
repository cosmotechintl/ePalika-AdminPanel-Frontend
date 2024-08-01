import React, { useEffect, useState } from "react";
import "./PoliceStationDetails.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import Loader from "../../../components/Loader/Loader";
import { BASE_URL } from "../../../utils/config";
const PoliceStationDetails = () => {
  const location = useLocation();
  const activeURL = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchEducation = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/policeStation/detail`,
          {
            code: `${activeURL}`,
          }
        );
        if (isMounted) {
          setData(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch police station.");
      }
    };
    fetchEducation();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }
  return (
    <div className="policeDetailsContainer">
      <div className="policeDetailsContents">
        <div className="policeDetailsHeader">
          <FaArrowLeftLong className="backArrow" onClick={handleBackClick} />
          <div className="healthServiceHeading">Police Station Details</div>
        </div>
        <div className="policeDetailsBody">
          <div className="bodyHead">
            <span className="stationName">{data.data.name}</span>
          </div>
          <div className="bodyContents">
            <div className="item">
              <div className="itemHeader">Address</div>
              <div className="itemBody">
                Ward No. {data.data.ward.wardNumber} <br /> {data.data.address}
              </div>
            </div>
            <div className="item">
              <div className="itemHeader">Contact Person</div>
              <div className="itemBody">{data.data.contactPerson}</div>
            </div>
            <div className="item">
              <div className="itemHeader">Phone</div>
              <div className="itemBody">{data.data.phoneNumber}</div>
            </div>
            <div className="item">
              <div className="itemHeader">Email</div>
              <div className="itemBody">{data.data.email}</div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default PoliceStationDetails;
