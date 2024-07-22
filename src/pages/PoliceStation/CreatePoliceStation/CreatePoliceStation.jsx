import React, { useEffect, useState } from "react";
import "./CreatePoliceStation.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      name: "name",
      label: "Station Name",
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
      name: "contactPerson",
      label: "Contact Person",
      type: "text",
      //   value: formData.contactPerson,
      //   onChange: handleChange,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      //   value: formData.phoneNumber,
      //   onChange: handleChange,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      //   value: formData.email,
      //   onChange: handleChange,
    },
    {
      name: "ward",
      label: "Ward No.",
      type: "select",
      //   value: formData.category || "",
      //   onChange: handleChange,
      options: [
        { label: "Select Ward", value: "" },
        // ...accessGroups.map((group) => ({
        //   label: group.name,
        //   value: group.name,
        // })),
      ],
    },
  ];

  return (
    <div className="createAdminContainer">
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
