import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

const FinanceList = () => {
  const headers = [
    "Name",
    "Location",
    "Phone",
    "Email",
    "Category",
    "Ward",
    "Status",
  ];
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const list = await adminRequest.post(`${BASE_URL}/finance/get`, {
        firstRow: 1,
        pageSize: 3,
      });
      const fetchedRows = list.data.data.records.map((l) => ({
        displayData: [
          l.name,
          l.location,
          l.phoneNumber,
          l.email,
          l.financeCategory.name,
          l.ward.wardNumber,
          l.status.name,
        ],
        code: l.code,
      }));
      setRows(fetchedRows);
    } catch (error) {
      console.log(error);
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
      text: "Do you really want to delete this financial institution?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00425A",
      cancelButtonColor: "#FC0000",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const response = await adminRequest.post(`${BASE_URL}/finance/delete`, {
          code: code,
        });
        if (response.data.code == 0) {
          toast.success(response.data.message);
          fetchData();
        } else {
          toast.error("Failed to delete financial institution");
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
    <div className="financeListContainer">
      {rows.length > 0 ? (
        <List
          title="Financial Institution List"
          createButtonLabel="Create Financial Institution"
          headers={headers}
          rows={rows.map((row) => row.displayData)}
          link="create"
          showEyeViewIcon={false}
          showFilterIcon={true}
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

export default FinanceList;
