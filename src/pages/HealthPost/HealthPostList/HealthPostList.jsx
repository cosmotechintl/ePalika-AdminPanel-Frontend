import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./HealthPostList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
const HealthPostList = () => {
  const headers = ["Name", "Address", "Phone", "Bed Count", "Type", "Ward"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchHealthServices = async () => {
      try {
        const healthService = await adminRequest.post(
          `${BASE_URL}/healthService/get`,
          {
            firstRow: 1,
            pageSize: 3,
          }
        );
        const fetchedRows = healthService.data.data.records.map((hs) => [
          hs.name,
          hs.address,
          hs.phone,
          hs.bedCount,
          hs.healthCategory.name,
          hs.ward.wardNumber,
        ]);
        if (isMounted) {
          setRows(fetchedRows);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch health services");
        }
      }
    };
    fetchHealthServices();
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
    <div className="healthPostListContainer">
      {rows.length > 0 ? (
        <List
          title="Health Services Lists"
          createButtonLabel="Create Health Post"
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

export default HealthPostList;
