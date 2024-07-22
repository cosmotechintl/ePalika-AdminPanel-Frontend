import React, { useEffect, useState } from "react";
import "./CreateNews.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNews = () => {
  const initialFormData = {
    title: "",
    contents: "",
    category: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // try {
    //   const response = await toast.promise(
    //     adminRequest.post(`${BASE_URL}/adminUser/create`, {
    //       name: formData.fullName,
    //       mobileNumber: formData.mobileNumber,
    //       address: formData.address,
    //       email: formData.email,
    //       accessGroup: {
    //         name: "formData.accessGroup",
    //       },
    //     }),
    //     {
    //       pending: "Processing your request",
    //     }
    //   );
    //   if (response.data.code == 0) {
    //     toast.success(response.data.message);
    //   }
    //   if (response.data.code != 0) {
    //     toast.error(response.data.message);
    //   }
    //   setFormData(initialFormData);
    // } catch (error) {
    //   toast.error(error.message || "Failed to create user");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const fields = [
    {
      name: "title",
      label: "Title",
      type: "text",
      //   value: formData.title,
      //   onChange: handleChange,
      width: "750px",
      height: "30px",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      width: "200px",
      height: "40px",
      //   value: formData.category || "",
      //   onChange: handleChange,
      options: [
        { label: "Select News Category", value: "" },
        { label: "Education", value: "" },
        { label: "Politics", value: "" },
        // ...accessGroups.map((group) => ({
        //   label: group.name,
        //   value: group.name,
        // })),
      ],
    },
    {
      name: "contents",
      type: "rich-text-editor",
      //   value: formData.contents,
      //   onChange: handleChange,
    },
  ];

  return (
    <div className="createAdminContainer">
      <CustomForm
        header="Create News"
        fields={fields}
        flexDirection="row"
        createButtonLabel="Create News"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateNews;
