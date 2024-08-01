import React, { useEffect, useState } from "react";
import "./TourismAreaDetails.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
const TourismAreaDetails = () => {
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
    const fetchTourismArea = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/tourismArea/detail`,
          {
            code: `${activeURL}`,
          }
        );
        if (isMounted) {
          setData(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch tourism area.");
      }
    };
    fetchTourismArea();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }
  return (
    <div className="tourismAreaDetailsContainer">
      <div className="tourismAreaDetailsContents">
        <div className="tourismAreaDetailsHeader">
          <FaArrowLeftLong className="backArrow" onClick={handleBackClick} />
          <div className="healthServiceHeading">Tourism Area Details</div>
        </div>
        <div className="tourismAreaDetailsBody">
          <div className="bodyContents">
            <div className="bodyLeft">
              <div className="imageContainer">
                <img
                  src="https://www.nepaltrekhub.com/wp-content/uploads/2020/03/nagarjun-day-hiking-1400x1020.jpg"
                  alt="area_image"
                  className="tourismAreaImage"
                />
              </div>
            </div>
            <div className="bodyRight">
              <div className="tourismAreaName">{data.data.name}</div>
              <div className="directionDetails">
                {data.data.latitude}, {data.data.longitude}
              </div>
              <div className="tourismAreaCategory">
                {data.data.tourismCategory.name}
              </div>
              <div className="tourismAreaDescription">{data.data.details}</div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default TourismAreaDetails;
