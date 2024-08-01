import React, { useEffect, useState } from "react";
import "./EducationDetails.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import Loader from "../../../components/Loader/Loader";
import { BASE_URL } from "../../../utils/config";
const EducationDetails = () => {
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
          `${BASE_URL}/education/detail`,
          {
            code: `${activeURL}`,
          }
        );
        if (isMounted) {
          setData(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch educational institution.");
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
    <div className="educationDetailsContainer">
      <div className="educationDetailsContents">
        <div className="educationDetailsHeader">
          <FaArrowLeftLong className="backArrow" onClick={handleBackClick} />
          <div className="healthServiceHeading">
            Education Institution Details
          </div>
        </div>
        <div className="educationDetailsBody">
          <div className="bodyHead">
            <span className="institutionName">{data.data.name}</span>
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
              <div className="itemBody">{data.data.phone}</div>
            </div>
            <div className="item">
              <div className="itemHeader">Email</div>
              <div className="itemBody">{data.data.email}</div>
            </div>
            <div className="item">
              <div className="itemHeader">Level</div>
              <div className="itemBody">{data.data.educationType.type}</div>
            </div>
            <div className="item">
              <div className="itemHeader">Ownership</div>
              <div className="itemBody">
                {data.data.educationOwnedBy.ownedBy}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default EducationDetails;
