import React, { useEffect, useState } from "react";
import "./AdminDetails.scss";
import { MdGroups2 } from "react-icons/md";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { BASE_URL } from "../../../utils/config";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import Loader from "../../../components/Loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { FaArrowLeftLong } from "react-icons/fa6";

const AdminDetails = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const activeURL = location.pathname.split("/")[3];

  const [refresh, setRefresh] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const maskContent = (content) => {
    return isVisible ? content : content.replace(/./g, "*");
  };
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/admin/get`, {
          email: `${activeURL}`,
        });
        setData(response.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, [activeURL, refresh]);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00425A",
      cancelButtonColor: "#FC0000",
      confirmButtonText: "Delete",
      html: '<textarea id="deleteReason" class="swal2-textarea" placeholder="Enter reason for deletion" rows="3" style="width: 80%;"></textarea>',
      preConfirm: () => {
        const deleteReason =
          Swal.getPopup().querySelector("#deleteReason").value;
        if (!deleteReason) {
          Swal.showValidationMessage("Please enter a reason for deletion");
        }
        return { deleteReason: deleteReason };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await adminRequest.post(
            `${BASE_URL}/adminUser/delete`,
            {
              email: `${activeURL}`,
              remarks: result.value.deleteReason,
            }
          );
          setRefresh(!refresh);
          Swal.fire({
            title: "Deleted!",
            text: `${response.data.message}`,
            icon: "success",
          });
        } catch (error) {
          toast.error(error.message || "Failed to delete data");
        }
      }
    });
  };

  const handleBlockUser = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to block this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00425A",
      cancelButtonColor: "#FC0000",
      confirmButtonText: "Block",
      html: '<textarea id="blockReason" class="swal2-textarea" placeholder="Enter reason for blocking" rows="3" style="width: 80%;"></textarea>',
      preConfirm: () => {
        const blockReason = Swal.getPopup().querySelector("#blockReason").value;
        if (!blockReason) {
          Swal.showValidationMessage("Please enter a reason for block");
        }
        return { blockReason: blockReason };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await adminRequest.post(
            `${BASE_URL}/adminUser/block`,
            {
              email: `${activeURL}`,
              remarks: result.value.blockReason,
            }
          );
          setRefresh(!refresh);
          Swal.fire({
            title: "Blocked!",
            text: `${response.data.message}`,
            icon: "success",
          });
        } catch (error) {
          toast.error(error.message || "Failed to block data");
        }
      }
    });
  };

  const handleUnblockUser = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to unblock this user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00425A",
      cancelButtonColor: "#FC0000",
      confirmButtonText: "Unblock",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await adminRequest.post(
            `${BASE_URL}/adminUser/unblock`,
            {
              email: `${activeURL}`,
            }
          );
          setRefresh(!refresh);
          Swal.fire({
            title: "Unblocked!",
            text: `${response.data.message}`,
            icon: "success",
          });
        } catch (error) {
          toast.error(error.message || "Failed to unblock user");
        }
      }
    });
  };
  return (
    <div className="adminDetailsContainer">
      <div className="adminDetailsContents">
        <div className="adminDetailsHeader">
          <span>
            <FaArrowLeftLong className="backIcon" onClick={handleBackClick} />
            Admin User Details
          </span>
          <span onClick={toggleVisibility} className="visibilityToggle">
            {isVisible ? (
              <FaEye title="Hide Sensitive Data" />
            ) : (
              <FaEyeSlash title="View Sensitive Data" />
            )}
          </span>
        </div>
        {data && data.data ? (
          <>
            <div className="body">
              <div className="left">
                <div className="profileImgContainer">
                  <img
                    src={
                      data.data.profilePictureName
                        ? `${BASE_URL}/path/to/images/${data.data.profilePictureName}`
                        : "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    alt="profile"
                    className="profileImg"
                  />
                </div>
                <div className="adminUserDetailsContainer">
                  <span className="fullName">{data.data.name}</span>
                  <span className="username">
                    {maskContent(`@${data.data.username}`)}
                  </span>
                  <span className="status">{data.data.status.name}</span>
                  <span className="accessGroup">
                    <span className="icon">
                      <MdGroups2 />
                    </span>
                    <span className="groupName">
                      {data.data.accessGroup
                        ? data.data.accessGroup.name
                        : "Unavailable"}
                    </span>
                  </span>
                </div>
              </div>
              <div className="right">
                <div className="headerRight">Contact</div>
                <div className="emailContainer">
                  <span className="icon">
                    <FaEnvelope />
                  </span>
                  <span className="email">{maskContent(data.data.email)}</span>
                </div>
                <div className="phoneContainer">
                  <span className="icon">
                    <FaPhoneAlt />
                  </span>
                  <span className="phone">
                    {maskContent(data.data.mobileNumber)}
                  </span>
                </div>
                <div className="addressContainer">
                  <span className="icon">
                    <FaMapMarkerAlt />
                  </span>
                  <span className="phone">{data.data.address}</span>
                </div>
              </div>
            </div>
            <div className="bottom">
              <Link to={`/adminUser/edit/${activeURL}`}>
                <button
                  type="button"
                  className="edit-btn"
                  disabled={data.data.status.name === "DELETED"}
                >
                  Edit
                </button>
              </Link>
              <button
                type="button"
                className="bottom-btn"
                disabled={data.data.status.name === "DELETED"}
                onClick={handleDeleteUser}
              >
                Delete
              </button>
              <button
                type="button"
                className="bottom-btn"
                disabled={data.data.status.name === "DELETED"}
                onClick={
                  data.data.status.name === "BLOCKED"
                    ? handleUnblockUser
                    : handleBlockUser
                }
              >
                {data.data.status.name === "BLOCKED" ? "Unblock" : "Block"}
              </button>

              <button
                type="button"
                className="bottom-btn"
                disabled={data.data.status.name === "DELETED"}
              >
                Reset Password
              </button>
              <button
                type="button"
                className="bottom-btn"
                disabled={data.data.status.name === "DELETED"}
              >
                Reset Two Factor Authentication
              </button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AdminDetails;
