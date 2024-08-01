import React, { useEffect, useState } from "react";
import "./QueryDetails.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
import { IoPersonOutline } from "react-icons/io5";
import { trimDate } from "../../../utils/dateUtil";
import Modal from "../../../components/Modal/Modal";

const QueryDetails = () => {
  const location = useLocation();
  const activeURL = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const initialFormData = {
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState([]);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const [openViewReplyModal, setViewOpenReplyModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchQueries = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/queries/detail`, {
          code: `${activeURL}`,
        });
        if (isMounted) {
          setData(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch queries.");
      }
    };
    fetchQueries();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }

  const openReplyModel = (e) => {
    e.preventDefault();
    setOpenReplyModal(true);
  };
  const openViewReplyModel = (e) => {
    e.preventDefault();
    setViewOpenReplyModal(true);
  };
  const closeReplyModal = (e) => {
    e.preventDefault();
    setOpenReplyModal(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/queries/response/create`, {
          message: formData.message,
          query: {
            code: activeURL,
          },
        }),
        {
          pending: "Sending message",
        }
      );
      if (response.data.code == 0) {
        toast.success(response.data.message, {
          autoClose: 500,
          onClose: () => navigate(-1),
        });
      }
      if (response.data.code != 0) {
        toast.error(response.data.message);
      }
      setFormData(initialFormData);
    } catch (error) {
      toast.error("Failed to send message");
    }
  };
  const fields = [
    {
      name: "message",
      label: "Message",
      type: "textarea",
      value: formData.message,
      onChange: handleChange,
    },
  ];
  return (
    <div className="queryDetailsContainer">
      {openReplyModal && (
        <Modal
          onClose={closeReplyModal}
          fields={fields}
          onSubmit={handleSubmit}
          receiverName={data.data.customer.fullName}
        ></Modal>
      )}
      <div className="queryDetailsContents">
        <div className="queryDetailsHeader">
          <div className="headerLeft">
            <FaArrowLeftLong className="backArrow" onClick={handleBackClick} />
            <div className="messageFrom">
              Message From {data.data.customer.fullName}
            </div>
          </div>
          <div className="headerRight">
            {data.data.replied ? (
              <span className="replyButton" onClick={openViewReplyModel}>
                View Reply
              </span>
            ) : (
              <span className="replyButton" onClick={openReplyModel}>
                Reply
              </span>
            )}
          </div>
        </div>
        <div className="queryDetailsBody">
          <div className="queryBodyTop">
            <span className="querySubject">Subject: {data.data.subject}</span>
            <span className="queryMessage">{data.data.description}</span>
          </div>
          <div className="queryBodyBottom">
            <div className="senderDetails">
              <span className="senderDetailsHeader">Sender Information</span>
              <div className="senderDetailsBody">
                <div className="senderPersonalInfo">
                  <div className="infoLeft">
                    <IoPersonOutline className="icon" />
                  </div>
                  <div className="infoRight">
                    <span className="senderName">
                      {data.data.customer.fullName}
                    </span>
                    <div className="senderPhone">
                      {data.data.customer.email}
                    </div>
                  </div>
                </div>
                <hr className="separator" />
                <div className="senderOtherInfo">
                  <span className="infoItem">
                    <span className="infoItemHeader">Address:</span>
                    <span className="infoItemBody">
                      {data.data.customer.address}
                    </span>
                  </span>
                  <span className="infoItem">
                    <span className="infoItemHeader">Phone:</span>
                    <span className="infoItemBody">
                      {data.data.customer.mobileNumber}
                    </span>
                  </span>
                  <span className="infoItem">
                    <span className="infoItemHeader">Gender:</span>
                    <span className="infoItemBody">
                      {data.data.customer.gender.gender}
                    </span>
                  </span>
                  <span className="infoItem">
                    <span className="infoItemHeader">Ward:</span>
                    <span className="infoItemBody">
                      {data.data.customer.wardNo}
                    </span>
                  </span>
                  <span className="infoItem">
                    <span className="infoItemHeader">BloodGroup:</span>
                    <span className="infoItemBody">
                      {data.data.customer.bloodGroup.name}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="messageDetails">
              <span className="messageDetailsHeader">Message Details</span>
              <span className="messageDetailsBody">
                <span className="messageDetailsBodyTop">
                  <span className="receivedDate">
                    <span className="dateLeft">Received Date</span>
                    <span className="dateRight">
                      {trimDate(data.data.recordedDate)}
                    </span>
                  </span>
                </span>
                <hr className="separator" />
                <span className="messageOtherInfo">
                  <span className="infoItem">
                    <span className="infoItemHeader">Subject:</span>
                    <span className="infoItemBody">{data.data.subject}</span>
                  </span>
                  <span className="infoItem">
                    <span className="infoItemHeader">Status:</span>
                    <span className="infoItemBody">
                      {data.data.replied ? "Replied" : "Not Replied"}
                    </span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default QueryDetails;
