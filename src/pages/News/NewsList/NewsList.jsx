import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./NewsList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { trimDate } from ".././../../utils/dateUtil";
import Swal from "sweetalert2";

const NewsList = () => {
  const headers = ["Title", "Category", "Author", "Published on", "Status"];
  const [rows, setRows] = useState([]);

  const fetchNews = async () => {
    try {
      const newsResponse = await adminRequest.post(`${BASE_URL}/news/get`, {
        firstRow: 1,
        pageSize: 3,
      });
      const fetchedRows = newsResponse.data.data.records.map((news) => ({
        displayData: [
          news.heading,
          news.newsCategory.name,
          news.author,
          trimDate(news.recordedDate),
          news.status.name,
        ],
        code: news.code,
      }));
      setRows(fetchedRows);
    } catch (error) {
      console.log("Failed to fetch news");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);
  updateAuthToken();

  const handleDelete = async (code) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this news item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00425A",
      cancelButtonColor: "#FC0000",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const response = await adminRequest.post(`${BASE_URL}/news/delete`, {
          code: code,
        });
        if (response.data.code == 0) {
          toast.success(response.data.message);
          fetchNews();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to delete news item");
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
    <div className="newsListContainer">
      {rows.length > 0 ? (
        <List
          title="News Lists"
          createButtonLabel="Create News"
          headers={headers}
          rows={rows.map((row) => row.displayData)}
          link="create"
          showEyeViewIcon={false}
          showFilterIcon={false}
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

export default NewsList;
