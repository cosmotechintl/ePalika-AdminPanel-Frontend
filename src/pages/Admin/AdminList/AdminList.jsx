import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
const AdminList = () => {
  const headers = ["Name", "Email", "Mobile", "Access Group", "Status"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let isMounted = true;
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
        if (isMounted) {
          setRows(fetchedRows);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch admin list");
        }
      }
    };
    fetchAdmin();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  const getMenuItems = (row) => [
    { link: `view/${row[1]}`, text: "View" },
    { link: `edit/${row[1]}`, text: "Edit" },
    { link: `delete/${row[1]}`, text: "Delete" },
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
