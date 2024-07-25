import React, { useEffect, useState } from "react";
import List from "../../../../components/List/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../../utils/requestMethod";
import { BASE_URL } from "../../../../utils/config";
import Loader from "../../../../components/Loader/Loader";

const EducationOwnershipList = () => {
  const headers = ["Owned By", "Description"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const categories = await adminRequest.get(
          `${BASE_URL}/educationOwnedBy/get`
        );
        const fetchedRows = categories?.data.data.map((c) => [
          c.ownedBy,
          "Unavailable at the moment",
        ]);
        if (isMounted) {
          setRows(fetchedRows);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch education ownership");
        }
      }
    };
    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  const getMenuItems = (row) => [
    { link: `edit/${row[1]}`, text: "Edit" },
    { link: `delete/${row[1]}`, text: "Delete" },
  ];

  return (
    <div className="educationOwnershipListListContainer">
      {rows.length > 0 ? (
        <List
          title="Education Ownership Lists"
          createButtonLabel="Create Education Ownership"
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

export default EducationOwnershipList;
