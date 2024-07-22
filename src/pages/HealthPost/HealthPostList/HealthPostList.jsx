import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./HealthPostList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HealthPostList = () => {
  const headers = ["Name", "Address", "Phone", "Bed Count", "Ward", "Type"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        name: "Sundar Health Post",
        address: "Sundar Municipality, Kathmandu, Nepal",
        phone: "+977 1 1122334",
        bedCount: 10,
        ward: "Sundar",
        type: "Primary Health Care",
      },
      {
        name: "Patan Health Center",
        address: "Patan, Lalitpur, Nepal",
        phone: "+977 1 2233445",
        bedCount: 20,
        ward: "Patan",
        type: "General Health",
      },
      {
        name: "Pokhara Community Health Post",
        address: "Pokhara, Kaski, Nepal",
        phone: "+977 61 334455",
        bedCount: 15,
        ward: "Pokhara",
        type: "Community Health",
      },
      {
        name: "Biratnagar Health Clinic",
        address: "Biratnagar, Morang, Nepal",
        phone: "+977 21 445566",
        bedCount: 8,
        ward: "Biratnagar",
        type: "Basic Health Service",
      },
      {
        name: "Bhaktapur Health Post",
        address: "Bhaktapur, Nepal",
        phone: "+977 1 5566778",
        bedCount: 12,
        ward: "Bhaktapur",
        type: "Primary Health Care",
      },
    ];

    const fetchedRows = mockData.map((hP) => [
      hP.name,
      hP.address,
      hP.phone,
      hP.bedCount,
      hP.ward,
      hP.type,
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
    <div className="healthPostListContainer">
      {rows.length > 0 ? (
        <List
          title="Health Post Lists"
          createButtonLabel="Create Health Post"
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

export default HealthPostList;
