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
    "Code",
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchPoliceStations = async () => {
      try {
        const policeStation = await adminRequest.post(
          `${BASE_URL}/policeStation/get`,
          {
            firstRow: 1,
            pageSize: 3,
          }
        );
        const fetchedRows = policeStation.data.data.records.map((ps) => [
          ps.name,
          ps.address,
          ps.contactPerson,
          ps.phoneNumber,
          ps.ward.wardNumber,
          ps.code,
        ]);
        if (isMounted) {
          setRows(fetchedRows);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch police stations");
        }
      }
    };
    fetchPoliceStations();
    return () => {
      isMounted = false;
    };
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
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to delete news item");
      }
    }
  };
  const getMenuItems = (row) => [
    { link: `view/${row[5]}`, text: "View" },
    { link: `edit/${row[5]}`, text: "Edit" },
    {
      link: "#",
      text: "Delete",
      onClick: (e) => {
        e.preventDefault();
        handleDelete(row[5]);
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

export default PoliceStationList;
