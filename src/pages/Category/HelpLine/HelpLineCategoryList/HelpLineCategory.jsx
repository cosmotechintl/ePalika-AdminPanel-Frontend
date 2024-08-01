import React, { useEffect, useState } from "react";
import List from "../../../../components/List/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../../utils/requestMethod";
import { BASE_URL } from "../../../../utils/config";
import Loader from "../../../../components/Loader/Loader";

const HelpLineCategory = () => {
  const headers = ["Name", "Description"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchNewsCategories = async () => {
      try {
        const categories = await adminRequest.get(
          `${BASE_URL}/helplineCategory/get`
        );
        const fetchedRows = categories?.data.data.map((c) => [
          c.name,
          c.description,
        ]);
        if (isMounted) {
          setRows(fetchedRows);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch helpline categories");
        }
      }
    };
    fetchNewsCategories();
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
    <div className="categoryListContainer">
      {rows.length > 0 ? (
        <List
          title="Helpline Category List"
          createButtonLabel="Create Helpline Category"
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

export default HelpLineCategory;
