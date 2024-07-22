import React, { useEffect, useState } from "react";
import "./CreateHealthPost.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    healthType: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const fields = [
    {
      name: "name",
      label: "Heath Center Name",
      type: "text",
      //   value: formData.name,
      //   onChange: handleChange,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      //   value: formData.address,
      //   onChange: handleChange,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      //   value: formData.name,
      //   onChange: handleChange,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      //   value: formData.email,
      //   onChange: handleChange,
    },
    {
      name: "contactPerson",
      label: "Contact Person",
      type: "text",
      //   value: formData.contactPerson,
      //   onChange: handleChange,
    },
    {
      name: "ward",
      label: "Ward No.",
      type: "select",
      //   value: formData.ward || "",
      //   onChange: handleChange,
      options: [
        { label: "Select Ward No.", value: "" },
        // ...accessGroups.map((group) => ({
        //   label: group.name,
        //   value: group.name,
        // })),
      ],
    },
    {
      name: "bedCount",
      label: "Bed Count",
      type: "text",
      //   value: formData.bedCount,
      //   onChange: handleChange,
    },
    {
      name: "type",
      label: "Health Type",
      type: "select",
      //   value: formData.type || "",
      //   onChange: handleChange,
      options: [
        { label: "Select Health Type", value: "" },
        // ...accessGroups.map((group) => ({
        //   label: group.name,
        //   value: group.name,
        // })),
      ],
    },
    {
      name: "services",
      label: "Services",
      type: "textarea",
      //   value: formData.services,
      //   onChange: handleChange,
    },
  ];

  return (
    <div className="createHealthPostContainer">
      <CustomForm
        header="Create Health Post"
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
