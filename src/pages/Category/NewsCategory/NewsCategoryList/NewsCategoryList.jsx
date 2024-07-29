import React, { useEffect, useState } from "react";
import List from "../../../../components/List/List";
import "./NewsCategoryList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../../utils/requestMethod";
import { BASE_URL } from "../../../../utils/config";
import Loader from "../../../../components/Loader/Loader";

const NewsCategoryList = () => {
  const headers = ["Name", "Description"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchNewsCategories = async () => {
      try {
        const categories = await adminRequest.get(
          `${BASE_URL}/newsCategory/get`
        );
        const fetchedRows = categories?.data.data.map((news) => [
          news.name,
          news.description,
        ]);
        if (isMounted) {
          console.log(categories?.data.message);
          setRows(fetchedRows);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch news categories");
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
    <div className="newsCategoryListContainer">
      {rows.length > 0 ? (
        <List
          title="News Category Lists"
          createButtonLabel="Create News Category"
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

export default NewsCategoryList;
