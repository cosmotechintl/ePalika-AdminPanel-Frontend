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
    "Code",
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await adminRequest.post(`${BASE_URL}/education`, {
          firstRow: 1,
          pageSize: 3,
        });
        const fetchedRows = data.data.data.records.map((e) => [
          e.name,
          e.address,
          e.phone,
          e.email,
          e.educationType.type,
          e.educationOwnedBy.ownedBy,
          e.code,
        ]);
        if (isMounted) {
          setRows(fetchedRows);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to education institutions");
        }
      }
    };
    fetchData();
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
        } else {
          toast.error("Failed to delete education institution");
        }
      } catch (error) {
        toast.error("Failed to delete education institution");
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
    <div className="educationListContainer">
      {rows.length > 0 ? (
        <List
          title="Educational Institution Lists"
          createButtonLabel="Create Education"
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

export default EducationList;
