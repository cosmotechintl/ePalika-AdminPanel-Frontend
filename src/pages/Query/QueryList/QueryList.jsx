import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
import { trimDate } from "../../../utils/dateUtil";
const QueryList = () => {
  const headers = [
    "Customer",
    "Subject",
    "Mobile No.",
    "Recorded Date",
    "Status",
  ];
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const list = await adminRequest.post(`${BASE_URL}/queries/get`, {
        firstRow: 1,
        pageSize: 3,
      });
      const fetchedRows = list.data.data.records.map((l) => ({
        displayData: [
          l.customer.fullName,
          l.subject,
          l.customer.mobileNumber,
          trimDate(l.recordedDate),
          l.replied ? "Replied" : "Not Replied",
        ],
        code: l.code,
      }));
      setRows(fetchedRows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  updateAuthToken();

  const getMenuItems = (row) => [
    { link: `view/${row.code}`, text: "View" },
    { link: `reply/${row.code}`, text: "Reply" },
  ];

  return (
    <div className="queryListContainer">
      {rows.length > 0 ? (
        <List
          title="Customer Queries"
          createButtonLabel="Create Financial Institution"
          headers={headers}
          rows={rows.map((row) => row.displayData)}
          link="create"
          showEyeViewIcon={false}
          showCreateButtonLabel={false}
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

export default QueryList;
