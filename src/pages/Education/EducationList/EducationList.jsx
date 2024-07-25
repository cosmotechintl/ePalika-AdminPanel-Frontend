import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
const EducationList = () => {
  const headers = ["Name", "Address", "Phone", "Email", "Level", "Ownership"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await adminRequest.post(`${BASE_URL}/education`, {
          firstRow: 1,
          pageSize: 3,
        });
        const fetchedRows = data.data.data.records.map((e) => [
          e.name,
          e.address,
          e.phone,
          e.email,
          e.educationType.type,
          e.educationOwnedBy.ownedBy,
        ]);
        if (isMounted) {
          setRows(fetchedRows);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to education institutions");
        }
      }
    };
    fetchData();
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
    <div className="educationListContainer">
      {rows.length > 0 ? (
        <List
          title="Educational Institution Lists"
          createButtonLabel="Create Education"
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

export default EducationList;
