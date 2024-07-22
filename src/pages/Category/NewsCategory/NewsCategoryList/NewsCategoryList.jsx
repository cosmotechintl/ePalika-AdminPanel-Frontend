import React, { useEffect, useState } from "react";
import List from "../../../../components/List/List";
import "./NewsCategoryList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewsCategoryList = () => {
  const headers = ["Name", "Description"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        name: "World News",
        description:
          "Latest updates and breaking news from around the globe, covering international politics, events, and more.",
      },
      {
        name: "Local News",
        description:
          "News and updates from local communities, including city developments, local events, and neighborhood stories.",
      },
      {
        name: "Sports",
        description:
          "Comprehensive coverage of national and international sports events, including live scores, analyses, and athlete profiles.",
      },
      {
        name: "Entertainment",
        description:
          "The latest news on movies, TV shows, music, celebrities, and cultural events, keeping you up-to-date with the entertainment industry.",
      },
      {
        name: "Business",
        description:
          "Insights and updates on the business world, including market trends, economic news, and financial advice.",
      },
      {
        name: "Technology",
        description:
          "Coverage of the latest technological advancements, gadget releases, software updates, and tech industry news.",
      },
      {
        name: "Health",
        description:
          "News and information on health topics, medical breakthroughs, wellness tips, and public health updates.",
      },
      {
        name: "Science",
        description:
          "Discoveries, research findings, and updates from the world of science, including space, environment, and innovative technologies.",
      },
    ];

    const fetchedRows = mockData.map((newsCategory) => [
      newsCategory.name,
      newsCategory.description,
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
        // <Loader />
        <p>Loading</p>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default NewsCategoryList;
