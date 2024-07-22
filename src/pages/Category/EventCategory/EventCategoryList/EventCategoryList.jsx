import React, { useEffect, useState } from "react";
import List from "../../../../components/List/List";
import "./EventCategoryList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EventCategoryList = () => {
  const headers = ["Name", "Description"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        name: "Music",
        description:
          "Live performances, concerts, and music festivals featuring a variety of genres and artists.",
      },
      {
        name: "Art & Culture",
        description:
          "Exhibitions, gallery shows, cultural festivals, and events celebrating art and heritage.",
      },
      {
        name: "Sports",
        description:
          "Competitive sports events, tournaments, marathons, and recreational sports activities.",
      },
      {
        name: "Workshops & Classes",
        description:
          "Educational workshops, classes, and training sessions across different fields and interests.",
      },
      {
        name: "Food & Drink",
        description:
          "Food festivals, tasting events, culinary classes, and drink sampling events.",
      },
      {
        name: "Networking",
        description:
          "Business networking events, meetups, and professional gatherings to connect with like-minded individuals.",
      },
      {
        name: "Family & Kids",
        description:
          "Family-friendly events, activities for children, and fun outings suitable for all ages.",
      },
      {
        name: "Charity & Causes",
        description:
          "Fundraisers, charity events, and activities aimed at supporting various causes and nonprofit organizations.",
      },
      {
        name: "Theater & Performing Arts",
        description:
          "Live theater performances, dance shows, comedy acts, and other performing arts events.",
      },
      {
        name: "Conferences & Seminars",
        description:
          "Professional conferences, industry seminars, and expert-led talks covering various topics.",
      },
    ];

    const fetchedRows = mockData.map((eventCategory) => [
      eventCategory.name,
      eventCategory.description,
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
    <div className="eventCategoryListContainer">
      {rows.length > 0 ? (
        <List
          title="Event Category Lists"
          createButtonLabel="Create Event Category"
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

export default EventCategoryList;
