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
import Swal from "sweetalert2";
const EventList = () => {
  const headers = ["Name", "Date", "Category", "Description", "Status"];
  const [rows, setRows] = useState([]);

  const fetchEvent = async () => {
    try {
      const event = await adminRequest.post(`${BASE_URL}/event/get`, {
        firstRow: 0,
        pageSize: 0,
      });
      const fetchedRows = event?.data.data.records.map((event) => ({
        displayData: [
          event.name,
          trimDate(event.eventDate),
          event.eventCategory.name,
          truncateContents(event.description, 10),
          event.status.name,
        ],
        code: event.code,
      }));
      setRows(fetchedRows);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  updateAuthToken();
  const handleDelete = async (code) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00425A",
      cancelButtonColor: "#FC0000",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const response = await adminRequest.post(`${BASE_URL}/event/delete`, {
          code: code,
        });
        if (response.data.code == 0) {
          toast.success("Event deleted successfully");
          fetchEvent();
        } else {
          toast.error("Failed to delete event");
        }
      } catch (error) {
        toast.error("Failed to delete event");
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
    <div className="eventListListContainer">
      {rows.length > 0 ? (
        <List
          title="Event Lists"
          createButtonLabel="Create Event"
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

export default EventList;
