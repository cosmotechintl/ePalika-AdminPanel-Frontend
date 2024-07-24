import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./EventList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { truncateContents } from "../../../utils/truncateContents";
import Loader from "../../../components/Loader/Loader";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { trimDate } from "../../../utils/dateUtil";
const EventList = () => {
  const headers = ["Name", "Date", "Category", "Description"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await adminRequest.post(`${BASE_URL}/event/get`, {
          firstRow: 0,
          pageSize: 0,
        });
        const fetchedRows = event?.data.data.records.map((event) => [
          event.name,
          trimDate(event.eventDate),
          event.event_category.name,
          truncateContents(event.description, 10),
        ]);
        setRows(fetchedRows);
      } catch (error) {
        toast.error("Failed to fetch events");
      }
    };
    fetchEvent();
  }, []);

  updateAuthToken();

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
        <Loader />
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default EventList;
