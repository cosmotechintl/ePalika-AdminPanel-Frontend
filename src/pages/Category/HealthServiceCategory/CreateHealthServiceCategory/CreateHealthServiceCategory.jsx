import React, { useState } from "react";
import CustomForm from "../../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../../utils/config";
import { adminRequest } from "../../../../utils/requestMethod";
import { useNavigate } from "react-router-dom";
const CreateHealthServiceCategory = () => {
  const initialFormData = {
    name: "",
    description: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/healthCategory/create`, {
          name: formData.name,
          description: formData.description,
        }),
        {
          pending: "Creating health service category",
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
      toast.error("Failed to create news category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      value: formData.name,
      onChange: handleChange,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      value: formData.description,
      onChange: handleChange,
    },
  ];

  return (
    <div className="createHealthServiceCategoryContainer">
      <CustomForm
        header="Create Health Service Category"
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

export default CreateHealthServiceCategory;
