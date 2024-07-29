import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./HealthPostList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";
const HealthPostList = () => {
  const headers = [
    "Name",
    "Address",
    "Phone",
    "Bed Count",
    "Type",
    "Ward",
    "Code",
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchHealthServices = async () => {
      try {
        const healthService = await adminRequest.post(
          `${BASE_URL}/healthService/get`,
          {
            firstRow: 1,
            pageSize: 3,
          }
        );
        const fetchedRows = healthService.data.data.records.map((hs) => [
          hs.name,
          hs.address,
          hs.phone,
          hs.bedCount,
          hs.healthCategory.name,
          hs.ward.wardNumber,
          hs.code,
        ]);
        if (isMounted) {
          setRows(fetchedRows);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch health services");
        }
      }
    };
    fetchHealthServices();
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
          toast.success("Health service deleted successfully");
        } else {
          toast.error("Failed to delete health service");
        }
      } catch (error) {
        toast.error("Failed to delete health service");
      }
    }
  };
  const getMenuItems = (row) => [
    { link: `view/${row[6]}`, text: "View" },
    { link: `edit/${row[6]}`, text: "Edit" },
    {
      link: "#",
      text: "Delete",
      onClick: (e) => {
        e.preventDefault();
        handleDelete(row[6]);
      },
    },
  ];

  return (
    <div className="healthPostListContainer">
      {rows.length > 0 ? (
        <List
          title="Health Services Lists"
          createButtonLabel="Create Health Post"
          headers={headers}
          rows={rows}
          link="create"
          showEyeViewIcon={false}
          showFilterIcon={true}
          getMenuItems={getMenuItems}
        />
      ) : (
        <Loader />
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default HealthPostList;
