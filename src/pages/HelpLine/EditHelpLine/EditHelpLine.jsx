import React, { useEffect, useState } from "react";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
const EditHelpLine = () => {
  const location = useLocation();
  const activeURL = location.pathname.split("/")[3];
  const initialFormData = {
    name: "",
    description: "",
    phoneNumber: "",
    category: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [helpCategory, setHelpCategory] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchHelpLine = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/helpline/detail`,
          {
            code: `${activeURL}`,
          }
        );
        if (isMounted) {
          setData(response.data);
          setFormData({
            name: response.data.data.name,
            phoneNumber: response.data.data.phoneNumber,
            description: response.data.data.description,
            category: response.data.data.helpLineCategory.name,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch helpline at the moment");
      }
    };

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
    fetchHelpLine();
    fetchHelpLineCategory();
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
        adminRequest.post(`${BASE_URL}/helpline/update`, {
          code: activeURL,
          name: formData.name,
          description: formData.description,
          phoneNumber: formData.phoneNumber,
          helpLineCategory: {
            name: formData.category,
          },
        }),
        {
          pending: "Updating helpline",
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
      toast.error("Failed to update helpline");
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
    <div className="container">
      <CustomForm
        header="Edit Helpline"
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

export default EditHelpLine;
