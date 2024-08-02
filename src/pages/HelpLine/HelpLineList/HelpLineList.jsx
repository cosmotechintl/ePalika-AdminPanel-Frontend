import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

const HelpLineList = () => {
  const headers = ["Name", "Phone", "Description", "Category", "Status"];
  const [rows, setRows] = useState([]);

  const fetchHelpLine = async () => {
    try {
      const helpLine = await adminRequest.post(`${BASE_URL}/helpline/get`, {
        firstRow: 1,
        pageSize: 3,
      });
      const fetchedRows = helpLine.data.data.records.map((hp) => ({
        displayData: [
          hp.name,
          hp.phoneNumber,
          hp.description,
          hp.helpLineCategory.name,
          hp.active ? "Active" : "Closed",
        ],
        code: hp.code,
      }));
      setRows(fetchedRows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) fetchHelpLine();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  const handleDelete = async (code) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this helpline number?",
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
          `${BASE_URL}/helpline/delete`,
          {
            code: code,
          }
        );
        if (response.data.code == 0) {
          toast.success(response.data.message);
          fetchHelpLine();
        } else {
          toast.error("Failed to delete helpline number");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getMenuItems = (row) => [
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
    <div className="helpLineListContainer">
      {rows.length > 0 ? (
        <List
          title="Helpline Lists"
          createButtonLabel="Create Helpline"
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

export default HelpLineList;
