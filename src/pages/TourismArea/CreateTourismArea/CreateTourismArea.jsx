import React, { useEffect, useState } from "react";
import "./CreateTourismArea.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";

const CreateTourismArea = () => {
  const initialFormData = {
    name: "",
    category: "",
    description: "",
    latitude: "",
    longitude: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tourismCategory, setTourismCategory] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchTourismCategory = async () => {
      try {
        const tourismCategory = await adminRequest.get(
          `${BASE_URL}/tourismCategory`
        );
        if (isMounted) {
          setTourismCategory(tourismCategory.data.data);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch tourism category at the moment");
        }
      }
    };
    updateAuthToken();
    fetchTourismCategory();
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
        adminRequest.post(`${BASE_URL}/tourismArea/create`, {
          name: formData.name,
          details: formData.description,
          latitude: formData.latitude,
          longitude: formData.longitude,
          image: "image.png",
          tourismCategory: {
            name: formData.category,
          },
        }),
        {
          pending: "Creating tourism area",
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
      toast.error("Failed to create tourism area");
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
      name: "latitude",
      label: "Latitude",
      type: "text",
      value: formData.latitude,
      onChange: handleChange,
    },
    {
      name: "longitude",
      label: "Longitude",
      type: "text",
      value: formData.longitude,
      onChange: handleChange,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      value: formData.category || "",
      onChange: handleChange,
      options: [
        { label: "Select Category", value: "" },
        ...tourismCategory.map((c) => ({
          label: c.name,
          value: c.name,
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
    <div className="createTourismAreaContainer">
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
