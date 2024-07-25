import React, { useEffect, useState } from "react";
import "./EditNews.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
const EditNews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeURL = location.pathname.split("/")[3];
  const initialFormData = {
    title: "",
    contents: "",
    category: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsCategory, setNewsCategory] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      contents: value,
    }));
  };
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/news/detail`, {
          code: `${activeURL}`,
        });
        setData(response.data);
        setFormData({
          title: response.data.data.heading,
          contents: response.data.data.details,
          category: response.data.data.newsCategory.name,
          image: response.data.data.image,
        });
      } catch (error) {
        toast.error("Failed to fetch news at the moment");
      }
    };
    const fetchNewsCategory = async () => {
      try {
        const newsCategories = await adminRequest.get(
          `${BASE_URL}/newsCategory/get`
        );
        setNewsCategory(newsCategories.data.data);
        updateAuthToken();
      } catch (error) {
        console.log("Failed to fetch news category at the moment");
      }
    };
    fetchNews();
    fetchNewsCategory();
  }, [activeURL]);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/news/update`, {
          code: activeURL,
          heading: formData.title,
          newsCategory: {
            name: formData.category,
          },
          details: formData.contents,
          image: formData.image,
        }),
        {
          pending: "Updating News",
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
      toast.error("Failed to update news");
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
    <div className="updateNewsContainer">
      <CustomForm
        header="Edit News"
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

export default EditNews;
