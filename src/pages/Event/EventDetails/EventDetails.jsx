import React, { useEffect, useState } from "react";
import "./EventDetails.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
import { trimDate } from "../../../utils/dateUtil";
const EventDetails = () => {
  const location = useLocation();
  const activeURL = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchEvent = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/event/detail`, {
          code: `${activeURL}`,
        });
        if (isMounted) {
          setData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch event at the moment");
        }
      }
    };
    fetchEvent();
    return () => {
      isMounted = false;
    };
  }, [activeURL]);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="eventDetailsContainer">
      <div className="eventDetailsContents">
        <div className="eventDetailsTop">
          <FaArrowLeftLong className="backArrow" onClick={handleBackClick} />
          <div className="eventHeading">Event Details</div>
        </div>
        <div className="eventDetailsBody">
          <div className="eventTitle">{data.data.name}</div>
          <div className="eventDescription">{data.data.description}</div>
          <div className="eventDetailsContainer">
            <span className="eventDateContainer">
              <span className="dateHeading">Date</span>
              <span className="eventDate">{trimDate(data.data.eventDate)}</span>
            </span>
            <span className="eventCategoryContainer">
              <span className="categoryHeading">Category</span>
              <span className="eventCategory">
                {data.data.eventCategory.name}
              </span>
            </span>
            <span className="eventStatusContainer">
              <span className="statusHeading">Status</span>
              {/* <span className="eventStatus">{data.data.status.name}</span> */}
            </span>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default EventDetails;
