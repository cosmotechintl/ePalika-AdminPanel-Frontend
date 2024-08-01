import React, { useEffect, useState } from "react";
import "./FinanceDetails.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import Loader from "../../../components/Loader/Loader";
import { BASE_URL } from "../../../utils/config";
const FinanceDetails = () => {
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
    const fetchFinance = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/finance/detail`, {
          code: `${activeURL}`,
        });
        if (isMounted) {
          setData(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch educational institution.");
      }
    };
    fetchFinance();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }
  return (
    <div className="financeDetailsContainer">
      <div className="financeDetailsContents">
        <div className="financeDetailsHeader">
          <FaArrowLeftLong className="backArrow" onClick={handleBackClick} />
          <div className="healthServiceHeading">
            Financial Institution Details
          </div>
        </div>
        <div className="financeeducationDetailsBody">
          <div className="bodyHead">
            <span className="institutionName">{data.data.name}</span>
          </div>
          <div className="bodyContents">
            <div className="item">
              <div className="itemHeader">Address</div>
              <div className="itemBody">
                Ward No. {data.data.ward.wardNumber} <br /> {data.data.location}
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
            <div className="item">
              <div className="itemHeader">Category</div>
              <div className="itemBody">{data.data.financeCategory.name}</div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default FinanceDetails;
