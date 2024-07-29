import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./TourismAreaList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { truncateContents } from "../../../utils/truncateContents";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";
const TourismAreaList = () => {
  const headers = [
    "Name",
    "Category",
    "Latitude",
    "Longitude",
    "Description",
    "Code",
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchTourismAreas = async () => {
      try {
        const tourismAreas = await adminRequest.post(
          `${BASE_URL}/tourismArea/get`,
          {
            firstRow: 1,
            pageSize: 3,
          }
        );
        const fetchedRows = tourismAreas.data.data.records.map((t) => [
          t.name,
          t.tourismCategory.name,
          t.latitude,
          t.longitude,
          t.details,
          t.code,
        ]);
        if (isMounted) {
          setRows(fetchedRows);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch tourism areas");
        }
      }
    };
    fetchTourismAreas();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();
  const handleDelete = async (code) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this tourism area?",
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
          `${BASE_URL}/tourismArea/delete`,
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
        toast.error("Failed to delete tourism area");
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
    <div className="tourismAreaListContainer">
      {rows.length > 0 ? (
        <List
          title="Tourism Area Lists"
          createButtonLabel="Create Tourism Area"
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

export default TourismAreaList;
