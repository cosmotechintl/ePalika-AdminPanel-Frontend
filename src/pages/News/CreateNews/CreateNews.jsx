import React, { useEffect, useState } from "react";
import "./CreateNews.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
const CreateNews = () => {
  const initialFormData = {
    title: "",
    contents: "",
    category: "",
    image: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsCategory, setNewsCategory] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchNewsCategory = async () => {
      try {
        const newsCategories = await adminRequest.get(
          `${BASE_URL}/newsCategory/get`
        );
        if (isMounted) {
          toast.success(newsCategories.data.message);
          setNewsCategory(newsCategories.data.data);
          updateAuthToken();
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch news category at the moment");
        }
      }
    };
    fetchNewsCategory();
    return () => {
      isMounted = false;
    };
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditorChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      contents: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/news/create`, {
          heading: formData.title,
          newsCategory: {
            name: formData.category,
          },
          details: formData.contents,
          // image: formData.image,
          image:
            "https://about.fb.com/wp-content/uploads/2023/09/GettyImages-686732223.jpg",
        }),
        {
          pending: "Posting News",
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
      toast.error("Failed to create news");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: "title",
      label: "Title",
      type: "text",
      value: formData.title,
      onChange: handleChange,
      width: "750px",
      height: "30px",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      width: "200px",
      height: "40px",
      value: formData.category || "",
      onChange: handleChange,
      options: [
        { label: "Select News Category", value: "" },
        ...newsCategory.map((c) => ({
          label: c.name,
          value: c.name,
        })),
      ],
    },
    {
      name: "contents",
      type: "rich-text-editor",
      value: formData.contents,
      onChange: handleEditorChange,
    },
  ];

  return (
    <div className="createNewsContainer">
      <CustomForm
        header="Create News"
        fields={fields}
        flexDirection="row"
        createButtonLabel="Post"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateNews;
