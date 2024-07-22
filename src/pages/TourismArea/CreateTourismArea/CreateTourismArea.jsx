import React, { useEffect, useState } from "react";
import "./CreateTourismArea.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTourismArea = () => {
  const initialFormData = {
    name: "",
    category: "",
    description: "",
    latitude: "",
    longitude: "",
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
      label: "Name",
      type: "text",
      //   value: formData.name,
      //   onChange: handleChange,
    },
    {
      name: "latitude",
      label: "Latitude",
      type: "text",
      //   value: formData.latitude,
      //   onChange: handleChange,
    },
    {
      name: "longitude",
      label: "Longitude",
      type: "text",
      //   value: formData.longitude,
      //   onChange: handleChange,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      //   value: formData.category || "",
      //   onChange: handleChange,
      options: [
        { label: "Select Category", value: "" },
        // ...accessGroups.map((group) => ({
        //   label: group.name,
        //   value: group.name,
        // })),
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "rich-text-editor",
      //   value: formData.description,
      //   onChange: handleChange,
    },
  ];

  return (
    <div className="createAdminContainer">
      <CustomForm
        header="Create Tourism Area"
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

export default CreateTourismArea;
