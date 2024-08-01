import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./PoliceStationList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Swal from "sweetalert2";
const PoliceStationList = () => {
  const headers = [
    "Name",
    "Address",
    "Contact Person",
    "Phone",
    "Ward",
    "Status",
  ];
  const [rows, setRows] = useState([]);
  const fetchPoliceStations = async () => {
    let isMounted = true;
    try {
      const policeStation = await adminRequest.post(
        `${BASE_URL}/policeStation/get`,
        {
          firstRow: 1,
          pageSize: 3,
        }
      );
      const fetchedRows = policeStation.data.data.records.map((ps) => ({
        displayData: [
          ps.name,
          ps.address,
          ps.contactPerson,
          ps.phoneNumber,
          ps.ward.wardNumber,
          ps.status.name,
        ],
        code: ps.code,
      }));
      if (isMounted) {
        setRows(fetchedRows);
      }
    } catch (error) {
      if (isMounted) {
        console.log("Failed to fetch police stations");
      }
    }
  };
  useEffect(() => {
    fetchPoliceStations();
  }, []);
  updateAuthToken();
  const handleDelete = async (code) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this police station?",
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
          `${BASE_URL}/policeStation/delete`,
          {
            code: code,
          }
        );
        if (response.data.code == 0) {
          fetchPoliceStations();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
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
    <div className="policeStationListContainer">
      {rows.length > 0 ? (
        <List
          title="Police Station Lists"
          createButtonLabel="Create Police Station"
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

export default PoliceStationList;
