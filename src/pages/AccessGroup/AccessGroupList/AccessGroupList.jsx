import React, { useEffect, useState } from "react";
import "./AccessGroupList.scss";
import List from "../../../components/List/List";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

const AccessGroupList = () => {
  const headers = ["Name", "Type"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/accessGroup`, {
          firstRow: 1,
          pageSize: 3,
        });
        const fetchedRows = response.data.data.records.map((accessGroup) => [
          accessGroup.name,
          "Unavailable at the moment",
        ]);
        setRows(fetchedRows);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);
  updateAuthToken();
  const handleDelete = async (name) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this access grpup?",
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
          `${BASE_URL}/accessGroup/delete`,
          {
            name: name,
          }
        );
        if (response.data.code == 0) {
          toast.success("Access group deleted successfully");
        } else {
          toast.error("Failed to delete access group");
        }
      } catch (error) {
        toast.error("Failed to delete access group");
      }
    }
  };
  const getMenuItems = (row) => [
    { link: `view/${row[0]}`, text: "View" },
    { link: `/delete/${row[0]}`, text: "Edit" },
    {
      link: "#",
      text: "Delete",
      onClick: (e) => {
        e.preventDefault();
        handleDelete(row[0]);
      },
    },
  ];

  return (
    <div className="accessGroupContainer">
      <div className="accessGroupContents">
        {rows ? (
          <List
            title="Access Groups"
            createButtonLabel="Create Access Group"
            headers={headers}
            rows={rows}
            link="create"
            showEyeViewIcon={false}
            showFilterIcon={false}
            getMenuItems={getMenuItems}
          />
        ) : (
          <Loader />
        )}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AccessGroupList;
