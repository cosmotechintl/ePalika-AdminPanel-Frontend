import React, { useEffect, useState } from "react";
import "./ViewTermsAndCondition.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import Loader from "../../../components/Loader/Loader";
import { BASE_URL } from "../../../utils/config";
import parse from "html-react-parser";
const ViewTermsAndCondition = () => {
  const navigate = useNavigate();
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const gotoEditPage = (e) => {
    e.preventDefault();
    navigate("edit");
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchTermsAndCondition = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/termsAndCondition/get`,
          {}
        );
        if (isMounted) {
          setData(response.data.data[0]);
          console.log(response.data);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchTermsAndCondition();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  if (!data) {
    return <Loader />;
  }
  return (
    <div className="termsAndConditionContainer">
      <div className="termsAndConditionContents">
        <div className="termsAndConditionHeader">
          <div className="tACHeaderLeft">
            <FaArrowLeftLong className="backArrow" onClick={handleBackClick} />
            <div className="termsAndConditionHeading">{data.title}</div>
          </div>
          <div className="tACHeaderRight">
            <button className="edit-btn" onClick={gotoEditPage}>
              Edit
            </button>
          </div>
        </div>
        <div className="termsAndConditionBody">
          <div className="termsAndCondition">
            {data.description && parse(data.description)}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ViewTermsAndCondition;
