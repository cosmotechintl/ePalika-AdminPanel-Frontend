import React, { useEffect, useState } from "react";
import "./CreateAdmin.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const initialFormData = {
    fullName: "",
    mobileNumber: "",
    address: "",
    email: "",
    accessGroup: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [accessGroups, setAccessGroups] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAccessGroups = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/accessGroup`, {
          firstRow: 0,
          pageSize: 0,
        });
        setAccessGroups(response.data.data.records);
        updateAuthToken();
      } catch (error) {
        toast.error(error.message || "Failed to fetch access groups");
      }
    };
    fetchAccessGroups();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/admin/create`, {
          name: formData.fullName,
          mobileNumber: formData.mobileNumber,
          address: formData.address,
          email: formData.email,
          accessGroup: {
            name: formData.accessGroup,
          },
        }),
        {
          pending: "Processing your request",
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
      toast.error("Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      value: formData.fullName,
      onChange: handleChange,
    },
    {
      name: "mobileNumber",
      label: "Mobile Number",
      type: "text",
      value: formData.mobileNumber,
      onChange: handleChange,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      value: formData.address,
      onChange: handleChange,
    },
    {
      name: "email",
      label: "Email (Username)",
      type: "email",
      value: formData.email,
      onChange: handleChange,
      tail: "Activation links will be sent to this email.",
    },
    {
      name: "accessGroup",
      label: "Access Group",
      type: "select",
      value: formData.accessGroup || "",
      onChange: handleChange,
      options: [
        { label: "Select Access Group", value: "" },
        ...accessGroups.map((group) => ({
          label: group.name,
          value: group.name,
        })),
      ],
    },
  ];

  return (
    <div className="createAdminContainer">
      <CustomForm
        header="Create Admin User"
        fields={fields}
        flexDirection="row"
        createButtonLabel="Create User"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateAdmin;
