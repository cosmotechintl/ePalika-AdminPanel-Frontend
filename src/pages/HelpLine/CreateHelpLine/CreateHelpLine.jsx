import React, { useEffect, useState } from "react";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
const CreateHelpLine = () => {
  const initialFormData = {
    name: "",
    description: "",
    phoneNumber: "",
    category: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [helpCategory, setHelpCategory] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchHelpLineCategory = async () => {
      try {
        const helpLineCategory = await adminRequest.get(
          `${BASE_URL}/helplineCategory/get`
        );
        if (isMounted) {
          setHelpCategory(helpLineCategory.data.data);
        }
      } catch (error) {
        if (isMounted) {
          console.log("Failed to fetch health category at the moment");
        }
      }
    };
    updateAuthToken();
    fetchHelpLineCategory();
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
        adminRequest.post(`${BASE_URL}/helpline/create`, {
          name: formData.name,
          description: formData.description,
          phoneNumber: formData.phoneNumber,
          helpLineCategory: {
            name: formData.category,
          },
        }),
        {
          pending: "Creating helpline number",
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
      toast.error("Failed to create helpline number");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Helpline Name",
      type: "text",
      value: formData.name,
      onChange: handleChange,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      value: formData.phoneNumber,
      onChange: handleChange,
      tail: "Do not include country code",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      value: formData.category || "",
      onChange: handleChange,
      options: [
        { label: "Select Helpline Category", value: "" },
        ...helpCategory.map((h) => ({
          label: h.name,
          value: h.name,
        })),
      ],
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
    <div className="createHelpLineContainer">
      <CustomForm
        header="Create Helpline"
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

export default CreateHelpLine;
