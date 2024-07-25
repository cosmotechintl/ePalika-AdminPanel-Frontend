import React, { useEffect, useState } from "react";
import "./CreateEvent.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";

const CreateEvent = () => {
  const initialFormData = {
    name: "",
    date: "",
    category: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventCategory, setEventCategory] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchEventCategory = async () => {
      try {
        const eventCategories = await adminRequest.get(
          `${BASE_URL}/eventCategory/get`
        );
        if (isMounted) {
          toast.success("Event categories fetched successfully");
          setEventCategory(eventCategories.data.data);
          updateAuthToken();
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch event category at the moment");
        }
      }
    };
    fetchEventCategory();
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
        adminRequest.post(`${BASE_URL}/event/create`, {
          name: formData.name,
          description: formData.description,
          eventDate: formData.date,
          eventCategory: {
            name: formData.category,
          },
        }),
        {
          pending: "Creating Event",
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
      toast.error("Failed to create event");
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
    <div className="createEventContainer">
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
