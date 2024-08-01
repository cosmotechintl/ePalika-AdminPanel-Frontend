import React, { useEffect, useState } from "react";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
const CreateFinance = () => {
  const initialFormData = {
    name: "",
    description: "",
    location: "",
    phoneNumber: "",
    email: "",
    contactPerson: "",
    image: "",
    ward: "",
    category: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [financeCategory, setFinanceCategory] = useState([]);
  const [wardNo, setWardNo] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchWards = async () => {
      try {
        const wards = await adminRequest.get(`${BASE_URL}/wardNumbers/get`);
        if (isMounted) {
          const sortedWards = wards.data.data.sort(
            (a, b) => parseInt(a.wardNumber) - parseInt(b.wardNumber)
          );
          setWardNo(sortedWards);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch wards at the moment");
        }
      }
    };
    const fetchFinanceCategory = async () => {
      try {
        const financeCategory = await adminRequest.get(
          `${BASE_URL}/financeCategory/get`
        );
        if (isMounted) {
          setFinanceCategory(financeCategory.data.data);
        }
      } catch (error) {
        if (isMounted) {
          console.log("Failed to fetch finance category at the moment");
        }
      }
    };
    updateAuthToken();
    fetchWards();
    fetchFinanceCategory();
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
        adminRequest.post(`${BASE_URL}/finance/create`, {
          name: formData.name,
          description: formData.description,
          location: formData.location,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          contactPerson: formData.contactPerson,
          image: "image.jpg",
          ward: {
            wardNumber: formData.ward,
          },
          financeCategory: {
            name: formData.category,
          },
        }),
        {
          pending: "Creating financial institution",
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
      toast.error("Failed to create financial institution");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Institution Name",
      type: "text",
      value: formData.name,
      onChange: handleChange,
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      value: formData.location,
      onChange: handleChange,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      value: formData.email,
      onChange: handleChange,
    },
    {
      name: "contactPerson",
      label: "Contact Person",
      type: "text",
      value: formData.contactPerson,
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
      label: "Institution Category",
      type: "select",
      value: formData.category || "",
      onChange: handleChange,
      options: [
        { label: "Select Financial Institution Category", value: "" },
        ...financeCategory.map((f) => ({
          label: f.name,
          value: f.name,
        })),
      ],
    },
    {
      name: "ward",
      label: "Ward",
      type: "select",
      value: formData.ward || "",
      onChange: handleChange,
      options: [
        { label: "Select Ward No.", value: "" },
        ...wardNo.map((w) => ({
          label: w.wardNumber,
          value: w.wardNumber,
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
    {
      name: "image",
      label: "Image",
      type: "file",
      value: formData.image,
      onChange: handleChange,
    },
  ];

  return (
    <div className="createFinanceContainer">
      <CustomForm
        header="Create Financial Institution"
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

export default CreateFinance;
