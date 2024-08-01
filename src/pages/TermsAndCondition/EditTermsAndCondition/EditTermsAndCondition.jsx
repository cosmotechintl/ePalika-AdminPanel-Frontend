import React, { useEffect, useRef, useState } from "react";
import "./EditTermsAndCondition.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";

const EditTermsAndCondition = () => {
  const termsAndConditionEditor = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [description, setDescription] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchTermsAndCondition = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/termsAndCondition/get`,
          {}
        );
        if (isMounted) {
          const termsData = response.data.data[0];
          setData(termsData);
          setDescription(termsData.description);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchTermsAndCondition();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const requestBody = {
        code: data.code,
        title: data.title,
        description,
        effectiveDate: futureDate.toISOString(),
      };
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/termsAndCondition/update`, requestBody),
        {
          pending: "Processing your request",
        }
      );
      if (response.status == 200) {
        toast.success(response.data.message, {
          autoClose: 500,
          onClose: () => navigate(-1),
        });
      } else {
        toast.error("Failed to update Terms and Conditions.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateAuthToken();

  if (!data.description) {
    return <Loader />;
  }

  return (
    <div className="editTermsAndCondition">
      <div className="editTermsAndConditionHeader">
        <div className="headerLeft">
          <FaArrowLeftLong className="backArrow" onClick={handleBackClick} />
          <div className="termsAndConditionHeading">
            Edit Terms & Conditions
          </div>
        </div>
        <div className="headerRight">
          <div className="btn-group">
            <button type="submit" className="create-btn" onClick={handleSubmit}>
              Update
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleBackClick}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="editTermsAndConditionBody">
        <JoditEditor
          ref={termsAndConditionEditor}
          value={description}
          tabIndex={1}
          onChange={(newContent) => setDescription(newContent)}
        />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default EditTermsAndCondition;
