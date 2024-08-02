import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./HealthPostList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Swal from "sweetalert2";

const HealthPostList = () => {
  const headers = [
    "Name",
    "Address",
    "Phone",
    "Bed Count",
    "Type",
    "Ward",
    "Status",
  ];
  const [rows, setRows] = useState([]);
  const [filterValues, setFilterValues] = useState({
    name: "",
    category: "",
    status: "",
  });
  const fetchHealthServices = async () => {
    try {
      const healthService = await adminRequest.post(
        `${BASE_URL}/healthService/get`,
        {
          firstRow: 1,
          pageSize: 3,
        }
      );
      const fetchedRows = healthService.data.data.records.map((hs) => ({
        displayData: [
          hs.name,
          hs.address,
          hs.phone,
          hs.bedCount,
          hs.healthCategory.name,
          hs.ward.wardNumber,
          hs.status.name,
        ],
        code: hs.code,
      }));
      setRows(fetchedRows);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFilteredHealthServices = async () => {
    try {
      const healthService = await adminRequest.post(
        `${BASE_URL}/healthService/get`,
        {
          firstRow: 1,
          pageSize: 3,
          param: {
            name: filterValues.name,
          },
        }
      );
      const fetchedRows = healthService.data.data.records.map((hs) => ({
        displayData: [
          hs.name,
          hs.address,
          hs.phone,
          hs.bedCount,
          hs.healthCategory.name,
          hs.ward.wardNumber,
          hs.status.name,
        ],
        code: hs.code,
      }));
      setRows(fetchedRows);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) fetchHealthServices();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  const handleDelete = async (code) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this health service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00425A",
      cancelButtonColor: "#FC0000",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/healthService/delete`,
          {
            code: code,
          }
        );
        if (response.data.code == 0) {
          toast.success(response.data.message);
          fetchHealthServices();
        } else {
          toast.error("Failed to delete health service");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getMenuItems = (row) => [
    { link: `view/${row.code}`, text: "View" },
    { link: `edit/${row.code}`, text: "Edit" },
    {
      link: "#",
      text: "Delete",
      onClick: (e) => {
        e.preventDefault();
        handleDelete(row.code);
      },
    },
  ];
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchFilteredHealthServices();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const filterFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      value: filterValues.name,
      onChange: handleFilterChange,
    },
  ];
  const resetFilterForm = (e) => {
    e.preventDefault();
    fetchHealthServices();
    setFilterValues({
      name: "",
    });
  };
  return (
    <div className="healthPostListContainer">
      <List
        title="Health Services Lists"
        createButtonLabel="Create Health Post"
        headers={headers}
        rows={rows.map((row) => row.displayData)}
        link="create"
        showEyeViewIcon={false}
        showFilterIcon={true}
        filterFields={filterFields}
        onFilterSubmit={handleFilterSubmit}
        getMenuItems={(row) =>
          getMenuItems(rows.find((r) => r.displayData === row))
        }
        resetFilterForm={resetFilterForm}
      />

      <ToastContainer position="top-center" />
    </div>
  );
};

export default HealthPostList;
