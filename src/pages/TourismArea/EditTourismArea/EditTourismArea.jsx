import React, { useEffect, useState } from "react";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
const EditTourismArea = () => {
  const location = useLocation();
  const activeURL = location.pathname.split("/")[3];
  const initialFormData = {
    name: "",
    category: "",
    description: "",
    latitude: "",
    longitude: "",
    image: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tourismCategory, setTourismCategory] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchTourismArea = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/tourismArea/detail`,
          {
            code: `${activeURL}`,
          }
        );
        if (isMounted) {
          setData(response.data);
          setFormData({
            name: response.data.data.name,
            latitude: response.data.data.latitude,
            longitude: response.data.data.longitude,
            category: response.data.data.tourismCategory.name,
            description: response.data.data.details,
            image: response.data.data.image,
          });
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch tourism area");
        }
      }
    };

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
          console.log("Failed to fetch tourism category at the moment");
        }
      }
    };
    fetchTourismArea();
    fetchTourismCategory();
    return () => {
      isMounted = false;
    };
  }, [activeURL]);
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
        adminRequest.post(`${BASE_URL}/tourismArea/update`, {
          code: activeURL,
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
          pending: "Updating tourism area",
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
      toast.error("Failed to update tourism area");
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
        header="Edit Tourism Area"
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

export default EditTourismArea;
