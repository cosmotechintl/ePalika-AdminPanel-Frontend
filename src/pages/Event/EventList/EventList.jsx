import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./EventList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { truncateContents } from "../../../utils/truncateContents";
const EventList = () => {
  const headers = ["Name", "Date", "Category", "Description"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        name: "Kathmandu Cultural Festival",
        date: "2024-08-15",
        category: "Festival",
        description:
          "A vibrant celebration of Nepali culture with traditional music, dance, and food, held in Kathmandu.",
      },
      {
        name: "Pokhara Mountain Marathon",
        date: "2024-09-05",
        category: "Sports",
        description:
          "An exciting marathon event through the scenic trails of Pokhara, attracting runners from all over the world.",
      },
      {
        name: "Bhaktapur Artisan Fair",
        date: "2024-10-10",
        category: "Market",
        description:
          "A market showcasing traditional Nepali crafts, handmade goods, and local art, taking place in Bhaktapur.",
      },
      {
        name: "Everest Base Camp Trek Briefing",
        date: "2024-07-20",
        category: "Adventure",
        description:
          "An informative session for trekkers planning to embark on the Everest Base Camp trek, covering safety, preparation, and tips.",
      },
      {
        name: "Nepal Food Expo",
        date: "2024-11-01",
        category: "Expo",
        description:
          "A culinary event featuring a variety of Nepali and international cuisines, cooking demonstrations, and food tastings.",
      },
    ];

    const fetchedRows = mockData.map((event) => [
      event.name,
      event.date,
      event.category,
      truncateContents(event.description, 10),
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
    <div className="eventListListContainer">
      {rows.length > 0 ? (
        <List
          title="Event Lists"
          createButtonLabel="Create Event"
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

export default EventList;
