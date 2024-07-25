import React, { useEffect, useState } from "react";
import "./CreatePoliceStation.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";

const CreatePoliceStation = () => {
  const initialFormData = {
    name: "",
    address: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    ward: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wardNo, setWardNo] = useState([]);
  useEffect(() => {
    let isMounted = true;
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
    updateAuthToken();
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
        adminRequest.post(`${BASE_URL}/policeStation/create`, {
          name: formData.name,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          contactPerson: formData.contactPerson,
          ward: {
            wardNumber: formData.ward,
          },
        }),
        {
          pending: "Creating police station",
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
      toast.error("Failed to create police station");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Station Name",
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
      name: "contactPerson",
      label: "Contact Person",
      type: "text",
      value: formData.contactPerson,
      onChange: handleChange,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      value: formData.phoneNumber,
      onChange: handleChange,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      value: formData.email,
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
  ];

  return (
    <div className="createPoliceStationContainer">
      <CustomForm
        header="Create Police Station"
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

export default CreatePoliceStation;
