import React, { useEffect, useState } from "react";
import "./CreateTourismAreaCategory.scss";
import CustomForm from "../../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTourismAreaCategory = () => {
  const initialFormData = {
    name: "",
    description: "",
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
      name: "description",
      label: "Description",
      type: "textarea",
      //   value: formData.description,
      //   onChange: handleChange,
    },
  ];

  return (
    <div className="createTourismAreaCategoryContainer">
      <CustomForm
        header="Create Tourism Area Category"
        fields={fields}
        flexDirection="column"
        createButtonLabel="Create"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateTourismAreaCategory;
