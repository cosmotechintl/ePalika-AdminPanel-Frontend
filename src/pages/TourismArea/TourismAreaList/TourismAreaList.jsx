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
    "Status",
  ];
  const [rows, setRows] = useState([]);

  const fetchTourismAreas = async () => {
    try {
      const tourismAreas = await adminRequest.post(
        `${BASE_URL}/tourismArea/get`,
        {
          firstRow: 1,
          pageSize: 3,
        }
      );
      const fetchedRows = tourismAreas.data.data.records.map((t) => ({
        displayData: [
          t.name,
          t.tourismCategory.name,
          t.latitude,
          t.longitude,
          truncateContents(t.details, 10),
          t.status.name,
        ],
        code: t.code,
      }));
      setRows(fetchedRows);
    } catch (error) {
      toast.error("Failed to fetch tourism areas");
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) fetchTourismAreas();
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
          fetchTourismAreas();
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
    <div className="tourismAreaListContainer">
      {rows.length > 0 ? (
        <List
          title="Tourism Area Lists"
          createButtonLabel="Create Tourism Area"
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

export default TourismAreaList;
