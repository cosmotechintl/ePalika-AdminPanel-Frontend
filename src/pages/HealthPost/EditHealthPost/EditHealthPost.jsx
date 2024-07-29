import React, { useEffect, useState } from "react";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
const CreateHealthPost = () => {
  const location = useLocation();
  const activeURL = location.pathname.split("/")[3];
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wardNo, setWardNo] = useState([]);
  const [healthType, setHealthType] = useState([]);

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
          setFormData({
            name: response.data.data.name,
            address: response.data.data.address,
            phone: response.data.data.phone,
            email: response.data.data.email,
            contactPerson: response.data.data.contactPerson,
            services: response.data.data.services,
            ward: response.data.data.ward.wardNumber,
            bedCount: response.data.data.bedCount,
            category: response.data.data.healthCategory.name,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch health service at the moment");
      }
    };
    const fetchWards = async () => {
      try {
        const wards = await adminRequest.get(`${BASE_URL}/wardNumbers/get`);
        if (isMounted) {
          const sortedWards = wards.data.data.sort(
            (a, b) => parseInt(a.wardNumber) - parseInt(b.wardNumber)
          );
          setWardNo(sortedWards);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch wards at the moment");
        }
      }
    };
    const fetchHealthType = async () => {
      try {
        const healthType = await adminRequest.get(
          `${BASE_URL}/healthCategory/get`
        );
        if (isMounted) {
          setHealthType(healthType.data.data);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch health category at the moment");
        }
      }
    };
    fetchHealthService();
    fetchHealthType();
    fetchWards();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/healthService/update`, {
          code: activeURL,
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          contactPerson: formData.contactPerson,
          services: formData.services,
          ward: {
            wardNumber: formData.ward,
          },
          bedCount: formData.bedCount,
          healthCategory: {
            name: formData.category,
          },
        }),
        {
          pending: "Updating health service",
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
      console.log(error);
      toast.error("Failed to update health service");
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
      tail: "Do not include country code",
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
          label: w.wardNumber,
          value: w.wardNumber,
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
      name: "category",
      label: "Health Category",
      type: "select",
      value: formData.category || "",
      onChange: handleChange,
      options: [
        { label: "Select Health Category", value: "" },
        ...healthType.map((hc) => ({
          label: hc.name,
          value: hc.name,
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
    <div className="container">
      <CustomForm
        header="Edit Health Service"
        fields={fields}
        flexDirection="row"
        createButtonLabel="Update"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateHealthPost;
