import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";
const EducationList = () => {
  const headers = [
    "Name",
    "Address",
    "Phone",
    "Email",
    "Level",
    "Ownership",
    "Status",
  ];
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const data = await adminRequest.post(`${BASE_URL}/education`, {
        firstRow: 1,
        pageSize: 3,
      });
      const fetchedRows = data.data.data.records.map((e) => ({
        displayData: [
          e.name,
          e.address,
          e.phone,
          e.email,
          e.educationType.type,
          e.educationOwnedBy.ownedBy,
          e.status.name,
        ],
        code: e.code,
      }));
      setRows(fetchedRows);
    } catch (error) {
      toast.error("Failed to education institutions");
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();
  const handleDelete = async (code) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this education institution?",
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
          `${BASE_URL}/education/delete`,
          {
            code: code,
          }
        );
        if (response.data.code == 0) {
          toast.success("Education institution deleted successfully");
          fetchData();
        } else {
          toast.error("Failed to delete education institution");
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

  return (
    <div className="educationListContainer">
      {rows.length > 0 ? (
        <List
          title="Educational Institution Lists"
          createButtonLabel="Create Education"
          headers={headers}
          rows={rows.map((row) => row.displayData)}
          link="create"
          showEyeViewIcon={false}
          showFilterIcon={false}
          getMenuItems={(row) =>
            getMenuItems(rows.find((r) => r.displayData === row))
          }
        />
      ) : (
        <Loader />
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default EducationList;
