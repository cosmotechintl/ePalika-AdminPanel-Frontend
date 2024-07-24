import React, { useEffect, useState } from "react";
import "./CreateHealthPost.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";

const CreateHealthPost = () => {
  const initialFormData = {
    name: "",
    address: "",
    phone: "",
    email: "",
    contactPerson: "",
    services: "",
    ward: "",
    bedCount: "",
    category: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wardNo, setWardNo] = useState([]);
  const [healthType, setHealthType] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchWards = async () => {
      try {
        const wards = await adminRequest.post(`${BASE_URL}/wardNo/get`);
        if (isMounted) {
          setWardNo(wards.data.data);
        }
      } catch (error) {
        if (isMounted) {
          // toast.error("Failed to fetch wards at the moment");
        }
      }
    };
    const fetchHealthType = async () => {
      try {
        const healthType = await adminRequest.get(
          `${BASE_URL}/healthCategory/get`
        );
        if (isMounted) {
          toast.success(healthType.data.message);
          setHealthType(healthType.data.data);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch health category at the moment");
        }
      }
    };
    updateAuthToken();
    fetchHealthType();
    fetchWards();
    return () => {
      isMounted = false;
    };
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/healthService/create`, {
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          contactPerson: formData.contactPerson,
          services: formData.services,
          ward: {
            wardNumber: 1,
          },
          bedCount: formData.bedCount,
          healthCategory: {
            name: test,
          },
        }),
        {
          pending: "Creating health service",
        }
      );
      if (response.data.code == 0) {
        toast.success(response.data.message);
      }
      if (response.data.code != 0) {
        toast.error(response.data.message);
      }
      setFormData(initialFormData);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create health service");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Heath Center Name",
      type: "text",
      value: formData.name,
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
      name: "phone",
      label: "Phone Number",
      type: "text",
      value: formData.phone,
      onChange: handleChange,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      value: formData.email,
      onChange: handleChange,
    },
    {
      name: "contactPerson",
      label: "Contact Person",
      type: "text",
      value: formData.contactPerson,
      onChange: handleChange,
    },
    {
      name: "ward",
      label: "Ward No.",
      type: "select",
      value: formData.ward || "",
      onChange: handleChange,
      options: [
        { label: "Select Ward No.", value: "" },
        ...wardNo.map((w) => ({
          label: w.name,
          value: w.name,
        })),
      ],
    },
    {
      name: "bedCount",
      label: "Bed Count",
      type: "text",
      value: formData.bedCount,
      onChange: handleChange,
    },
    {
      name: "type",
      label: "Health Category",
      type: "select",
      value: formData.category || "",
      onChange: handleChange,
      options: [
        { label: "Select Health Category", value: "" },
        ...healthType.map((ht) => ({
          label: ht.name,
          value: ht.name,
        })),
      ],
    },
    {
      name: "services",
      label: "Services",
      type: "textarea",
      value: formData.services,
      onChange: handleChange,
    },
  ];

  return (
    <div className="createHealthPostContainer">
      <CustomForm
        header="Create Health Service"
        fields={fields}
        flexDirection="row"
        createButtonLabel="Create"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateHealthPost;
