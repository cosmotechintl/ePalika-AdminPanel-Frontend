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
  const headers = ["Title", "Category", "Author", "Published on", "Code"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await adminRequest.post(`${BASE_URL}/news/get`, {
          firstRow: 1,
          pageSize: 3,
        });
        const fetchedRows = news?.data.data.records
          .sort((a, b) => new Date(b.recordedDate) - new Date(a.recordedDate))
          .map((news) => [
            news.heading,
            news.newsCategory.name,
            news.author,
            trimDate(news.recordedDate),
            news.code,
          ]);
        setRows(fetchedRows);
      } catch (error) {
        toast.error("Failed to fetch news");
      }
    };
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
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to delete news item");
      }
    }
  };

  const getMenuItems = (row) => [
    { link: `view/${row[4]}`, text: "View" },
    { link: `edit/${row[4]}`, text: "Edit" },
    {
      link: "#",
      text: "Delete",
      onClick: (e) => {
        e.preventDefault();
        handleDelete(row[4]);
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

export default NewsList;
