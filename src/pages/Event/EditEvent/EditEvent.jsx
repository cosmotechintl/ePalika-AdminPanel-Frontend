import React, { useEffect, useState } from "react";
import "./EditEvent.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { trimDate } from "../../../utils/dateUtil";
const EditEvent = () => {
  const initialFormData = {
    name: "",
    date: "",
    category: "",
    description: "",
  };
  const location = useLocation();
  const activeURL = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventCategory, setEventCategory] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchEvent = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/event/detail`, {
          code: `${activeURL}`,
        });
        if (isMounted) {
          setData(response.data);
          setFormData({
            name: response.data.data.name,
            date: trimDate(response.data.data.eventDate),
            description: response.data.data.description,
            category: response.data.data.eventCategory.name,
          });
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch event at the moment");
        }
      }
    };
    const fetchEventCategory = async () => {
      try {
        const eventCategories = await adminRequest.get(
          `${BASE_URL}/eventCategory/get`
        );
        if (isMounted) {
          setEventCategory(eventCategories.data.data);
          updateAuthToken();
        }
      } catch (error) {
        if (isMounted) {
          console.log("Failed to fetch event category at the moment");
        }
      }
    };
    fetchEvent();
    fetchEventCategory();
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
        adminRequest.post(`${BASE_URL}/event/update`, {
          code: activeURL,
          name: formData.name,
          description: formData.description,
          eventDate: formData.date,
          eventCategory: {
            name: formData.category,
          },
        }),
        {
          pending: "Updating Event",
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
      toast.error("Failed to update event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Event Name",
      type: "text",
      value: formData.name,
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
        ...eventCategory.map((c) => ({
          label: c.name,
          value: c.name,
        })),
      ],
    },
    {
      name: "date",
      label: "Event Date",
      type: "date",
      value: formData.date,
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
    <div className="container">
      <CustomForm
        header="Edit Event"
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

export default EditEvent;
