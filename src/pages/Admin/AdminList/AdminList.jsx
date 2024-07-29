import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";
const AdminList = () => {
  const headers = ["Name", "Email", "Mobile", "Access Group", "Status"];
  const [rows, setRows] = useState([]);
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

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchAdmin();
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
          fetchAdmin(); // Refetch the admin list
        } else {
          toast.error("Failed to delete admin");
        }
      } catch (error) {
        toast.error("Failed to delete admin");
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

  return (
    <div className="adminListContainer">
      {rows.length > 0 ? (
        <List
          title="Admin List"
          createButtonLabel="Create Admin"
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

export default AdminList;
