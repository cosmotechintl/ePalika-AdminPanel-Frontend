import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./TourismAreaList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { truncateContents } from "../../../utils/truncateContents";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
const TourismAreaList = () => {
  const headers = ["Name", "Category", "Latitude", "Longitude", "Description"];
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

  const getMenuItems = (row) => [
    { link: `view/${row[1]}`, text: "View" },
    { link: `edit/${row[1]}`, text: "Edit" },
    { link: `delete/${row[1]}`, text: "Delete" },
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
