import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Swal from "sweetalert2";

const AdminList = () => {
  const headers = ["Name", "Email", "Mobile", "Access Group", "Status"];
  const [rows, setRows] = useState([]);
  const [filterValues, setFilterValues] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    accessGroup: "",
    status: "",
  });
  const [accessGroups, setAccessGroups] = useState([]);

  const fetchAdmin = async () => {
    try {
      const admin = await adminRequest.post(`${BASE_URL}/admin`, {
        firstRow: 1,
        pageSize: 3,
      });
      const fetchedRows = admin.data.data.records.map((a) => [
        a.name,
        a.email,
        a.mobileNumber,
        a.accessGroup.name,
        a.status.name,
      ]);
      setRows(fetchedRows);
    } catch (error) {
      toast.error("Failed to fetch admin list");
    }
  };

  const fetchFilteredAdmin = async () => {
    try {
      const admin = await adminRequest.post(`${BASE_URL}/admin`, {
        firstRow: 1,
        pageSize: 3,
        param: {
          name: filterValues.name,
          mobileNumber: filterValues.mobileNumber,
          email: filterValues.email,
        },
      });
      const fetchedRows = admin.data.data.records.map((a) => [
        a.name,
        a.email,
        a.mobileNumber,
        a.accessGroup.name,
        a.status.name,
      ]);
      setRows(fetchedRows);
    } catch (error) {
      toast.error("Failed to fetch filtered admin list");
    }
  };

  const fetchAccessGroups = async () => {
    try {
      const response = await adminRequest.post(`${BASE_URL}/accessGroup`, {
        firstRow: 0,
        pageSize: 0,
      });
      setAccessGroups(response.data.data.records);
      updateAuthToken();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchAdmin();
      fetchAccessGroups();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00425A",
      cancelButtonColor: "#FC0000",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await adminRequest.post(`${BASE_URL}/admin/delete`, {
          email: email,
        });
        if (response.data.code == 0) {
          toast.success("Admin deleted successfully");
          fetchAdmin();
        } else {
          toast.error("Failed to delete admin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  updateAuthToken();

  const getMenuItems = (row) => [
    { link: `view/${row[1]}`, text: "View" },
    { link: `edit/${row[1]}`, text: "Edit" },
    {
      link: "#",
      text: "Delete",
      onClick: (e) => {
        e.preventDefault();
        handleDelete(row[1]);
      },
    },
    ,
  ];

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchFilteredAdmin();
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
    {
      name: "email",
      label: "Email",
      type: "email",
      value: filterValues.email,
      onChange: handleFilterChange,
    },
    {
      name: "mobileNumber",
      label: "Mobile Number",
      type: "text",
      value: filterValues.mobileNumber,
      onChange: handleFilterChange,
    },
    {
      name: "accessGroup",
      label: "Access Group",
      type: "select",
      value: filterValues.accessGroup,
      onChange: handleFilterChange,
      options: [
        { label: "Select Access Group", value: "" },
        ...accessGroups.map((group) => ({
          label: group.name,
          value: group.name,
        })),
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "text",
      value: filterValues.status,
      onChange: handleFilterChange,
    },
  ];
  const resetFilterForm = (e) => {
    e.preventDefault();
    fetchAdmin();
    setFilterValues({
      name: "",
      email: "",
      mobileNumber: "",
    });
  };
  return (
    <div className="adminListContainer">
      <List
        title="Admin List"
        createButtonLabel="Create Admin"
        headers={headers}
        rows={rows}
        link="create"
        showEyeViewIcon={false}
        showFilterIcon={true}
        getMenuItems={getMenuItems}
        filterFields={filterFields}
        onFilterSubmit={handleFilterSubmit}
        resetFilterForm={resetFilterForm}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AdminList;
