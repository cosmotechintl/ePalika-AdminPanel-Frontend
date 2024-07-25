import React, { useEffect, useState } from "react";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";

const CreateEducation = () => {
  const initialFormData = {
    name: "",
    address: "",
    phone: "",
    email: "",
    contactPerson: "",
    level: "",
    ward: "",
    ownership: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [level, setLevel] = useState([]);
  const [ownership, setOwnership] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchLevel = async () => {
      try {
        const levels = await adminRequest.get(`${BASE_URL}/educationType/get`);
        if (isMounted) {
          setLevel(levels.data.data);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch education level at the moment");
        }
      }
    };
    const fetchOwnership = async () => {
      try {
        const ownership = await adminRequest.get(
          `${BASE_URL}/educationOwnedBy/get`
        );
        if (isMounted) {
          setOwnership(ownership.data.data);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch education ownership at the moment");
        }
      }
    };
    const fetchWards = async () => {
      try {
        const ward = await adminRequest.get(`${BASE_URL}/wardNumbers/get`);
        if (isMounted) {
          const sortedWards = ward.data.data.sort(
            (a, b) => parseInt(a.wardNumber) - parseInt(b.wardNumber)
          );
          setWards(sortedWards);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch ward number at the moment");
        }
      }
    };
    updateAuthToken();
    fetchLevel();
    fetchOwnership();
    fetchWards();
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
        adminRequest.post(`${BASE_URL}/education/create`, {
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          contactPerson: formData.contactPerson,
          ward: {
            wardNumber: formData.ward,
          },
          educationType: {
            type: formData.level,
          },
          educationOwnedBy: {
            ownedBy: formData.ownership,
          },
        }),
        {
          pending: "Creating educational instiutution",
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
      toast.error("Failed to create educational instiutution");
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
      name: "address",
      label: "Address",
      type: "text",
      value: formData.address,
      onChange: handleChange,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      value: formData.phone,
      onChange: handleChange,
      tail: "Do not include country code",
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
      name: "ward",
      label: "Ward No.",
      type: "select",
      value: formData.ward || "",
      onChange: handleChange,
      options: [
        { label: "Select Ward No.", value: "" },
        ...wards.map((w) => ({
          label: w.wardNumber,
          value: w.wardNumber,
        })),
      ],
    },
    {
      name: "level",
      label: "Level",
      type: "select",
      value: formData.level || "",
      onChange: handleChange,
      options: [
        { label: "Select Level", value: "" },
        ...level.map((w) => ({
          label: w.type,
          value: w.type,
        })),
      ],
    },
    {
      name: "ownership",
      label: "Ownership",
      type: "select",
      value: formData.ownership || "",
      onChange: handleChange,
      options: [
        { label: "Select Ownership", value: "" },
        ...ownership.map((w) => ({
          label: w.ownedBy,
          value: w.ownedBy,
        })),
      ],
    },
  ];

  return (
    <div className="createEducationContainer">
      <CustomForm
        header="Create Educational Institution"
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

export default CreateEducation;
