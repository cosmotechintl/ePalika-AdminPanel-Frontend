import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./NewsList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";
import { truncateContents } from "../../../utils/truncateContents";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { trimDate } from ".././../../utils/dateUtil";
import parse from "html-react-parser";
const NewsList = () => {
  const headers = [
    "Title",
    "Category",
    "Content",
    "Author",
    "Published on",
    "Code",
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await adminRequest.post(`${BASE_URL}/news/get`, {
          firstRow: 1,
          pageSize: 3,
        });
        const fetchedRows = news?.data.data.records.map((news) => [
          news.heading,
          news.newsCategory.name,
          parse(truncateContents(news.details, 10)),
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

  const getMenuItems = (row) => [
    { link: `view/${row[5]}`, text: "View" },
    { link: `edit/${row[5]}`, text: "Edit" },
    { link: `delete/${row[5]}`, text: "Delete" },
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
