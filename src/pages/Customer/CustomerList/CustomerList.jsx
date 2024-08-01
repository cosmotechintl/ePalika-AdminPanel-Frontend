import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";

const CustomerList = () => {
  const headers = ["Name", "Address", "Phone", "Email", "Ward", "Status"];
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const list = await adminRequest.post(`${BASE_URL}/customer/get`, {
        firstRow: 1,
        pageSize: 3,
      });
      const fetchedRows = list.data.data.records.map((l) => ({
        displayData: [
          l.fullName,
          l.address,
          l.mobileNumber,
          l.email,
          l.ward.wardNumber,
          l.status.name,
        ],
        code: l.email,
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
    { link: `block/${row.code}`, text: "Block" },
  ];

  return (
    <div className="customerListContainer">
      {rows.length > 0 ? (
        <List
          title="Customer List"
          headers={headers}
          rows={rows.map((row) => row.displayData)}
          link="create"
          showCreateButtonLabel={false}
          showEyeViewIcon={false}
          showFilterIcon={true}
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

export default CustomerList;
