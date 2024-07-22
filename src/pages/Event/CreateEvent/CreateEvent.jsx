import React, { useEffect, useState } from "react";
import "./CreateEvent.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEvent = () => {
  const initialFormData = {
    name: "",
    date: "",
    category: "",
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
    console.log(formData);
  };

  const fields = [
    {
      name: "name",
      label: "Event Name",
      type: "text",
      //   value: formData.name,
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
      name: "Date",
      label: "Event Date",
      type: "nepali-date-picker",
      //   value: formData.date,
      //   onChange: handleChange,
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
    <div className="createEventPostContainer">
      <CustomForm
        header="Create Event"
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

export default CreateEvent;
