import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./NewsList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Loader from "../../../components/Loader/Loader";
import { truncateContents } from "../../../utils/truncateContents";
const NewsList = () => {
  const headers = ["Title", "Content", "Category", "Author", "Published on"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await adminRequest.post(`${BASE_URL}/adminUser`, {
    //       firstRow: 1,
    //       pageSize: 3,
    //     });
    //     const fetchedRows = response.data.data.records.map((user) => [
    //       user.name,
    //       user.email,
    //       user.mobileNumber,
    //       user.accessGroup.name,
    //       user.status.name,
    //     ]);
    //     setRows(fetchedRows);
    //   } catch (error) {
    //     toast.error(error.message || "Failed to fetch data");
    //   }
    // };
    // fetchData();
    const mockData = [
      {
        title: "Global Warming Impact Intensifies",
        details:
          "Scientists report that global warming is accelerating at an unprecedented rate, causing more severe weather patterns.",
        category: "Environment",
        author: "Jane Doe",
        created: "2024-07-21",
      },
      {
        title: "Breakthrough in AI Technology",
        details:
          "A new AI model has surpassed previous records in natural language processing, promising advancements in various sectors.",
        category: "Technology",
        author: "John Smith",
        created: "2024-07-20",
      },
      {
        title: "Stock Markets Reach New Highs",
        details:
          "The stock markets hit new highs today, driven by positive earnings reports and economic data.",
        category: "Finance",
        author: "Mary Johnson",
        created: "2024-07-19",
      },
    ];
    const fetchedRows = mockData.map((news) => [
      news.title,
      truncateContents(news.details, 10),
      news.category,
      news.author,
      news.created,
    ]);

    setRows(fetchedRows);
  }, []);

  //   updateAuthToken();

  const getMenuItems = (row) => [
    { link: `view/${row[1]}`, text: "View" },
    { link: `edit/${row[1]}`, text: "Edit" },
    { link: `delete/${row[1]}`, text: "Delete" },
  ];

  return (
    <div className="adminListContainer">
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
        // <Loader />
        <p>Loading</p>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default NewsList;
