import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./PoliceStationList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
const PoliceStationList = () => {
  const headers = ["Name", "Address", "Contact Person", "Phone", "Ward"];
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

  const getMenuItems = (row) => [
    { link: `view/${row[1]}`, text: "View" },
    { link: `edit/${row[1]}`, text: "Edit" },
    { link: `delete/${row[1]}`, text: "Delete" },
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
