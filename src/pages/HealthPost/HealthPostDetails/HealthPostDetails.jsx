import React, { useEffect, useState } from "react";
import "./HealthPostDetails.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { CiPhone } from "react-icons/ci";
import { RxEnvelopeClosed } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import Loader from "../../../components/Loader/Loader";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
const HealthPostDetails = () => {
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
    const fetchHealthService = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/healthService/detail`,
          {
            code: `${activeURL}`,
          }
        );
        if (isMounted) {
          setData(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch health service.");
      }
    };
    fetchHealthService();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }
  return (
    <div className="healthPostDetailsContainer">
      <div className="healthPostDetailsContents">
        <div className="healthPostDetailsContentsHead">
          <FaArrowLeftLong className="backArrow" onClick={handleBackClick} />
          <div className="healthServiceHeading">Health Service Details</div>
        </div>
        <div className="healthPostDetailsContentsBody">
          <div className="bodyContentsTop">
            <div className="topLeft">
              <span className="healthServiceName"> {data.data.name}</span>

              <span className="healthServiceAddress">
                Ward No. {data.data.ward.wardNumber}, {data.data.address}
              </span>
              <span className="contactDetails">
                <span className="phone">
                  <CiPhone className="contactIcon" />
                  {data.data.phone}
                </span>
                <span className="email">
                  <RxEnvelopeClosed className="contactIcon" />
                  {data.data.email}
                </span>
                <span className="contactPerson">
                  <CiUser className="contactIcon" />
                  {data.data.contactPerson}
                </span>
              </span>
            </div>
            <div className="topRight">
              <div className="topRightTop">
                <div className="topRightTopContents">
                  <span className="rightTopHeader">Services Offered</span>
                  <span className="servicesOffered">{data.data.services}</span>
                </div>
              </div>
              <div className="topRightBottom">
                <div className="topRightBottomContents">
                  <span className="rightBottomBody">
                    <span className="beds">
                      <span className="bedsHeader">Beds</span>
                      <span className="bedsCount">{data.data.bedCount}</span>
                    </span>
                    <span className="category">
                      <span className="categoryHeader">Category</span>
                      <span className="categoryName">
                        {data.data.healthCategory.name}
                      </span>
                    </span>
                    <span className="statusContainer">
                      <span className="categoryHeader">Status</span>
                      <span className="status">ACTIVE</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="bodyContentsBottom">
            <div className="bottomHeader">About {data.data.name}</div>
            <div className="bottomDescriptionText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
              iure. Necessitatibus dolorem, sed magnam illum minus, eligendi
              corrupti vel impedit error modi provident quos ducimus ullam
              voluptatibus numquam reiciendis nemo!
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default HealthPostDetails;
