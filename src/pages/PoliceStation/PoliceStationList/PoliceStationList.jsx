import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./PoliceStationList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PoliceStationList = () => {
  const headers = ["Name", "Address", "Contact Person", "Phone", "Ward"];
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
        Name: "Kathmandu Metropolitan Police",
        Address: "Gongabu, Kathmandu, Nepal",
        contactPerson: "Inspector Sita Sharma",
        Phone: "+977 1 1234567",
        Ward: "Kathmandu",
      },
      {
        Name: "Lalitpur District Police Office",
        Address: "Lalitpur, Nepal",
        contactPerson: "Sub-Inspector Ramesh Thapa",
        Phone: "+977 1 2345678",
        Ward: "Lalitpur",
      },
      {
        Name: "Bhaktapur Police Station",
        Address: "Bhaktapur, Nepal",
        contactPerson: "Officer Anil Kumar",
        Phone: "+977 1 3456789",
        Ward: "Bhaktapur",
      },
      {
        Name: "Pokhara Police Station",
        Address: "Pokhara, Kaski, Nepal",
        contactPerson: "Sergeant Maya Rai",
        Phone: "+977 61 234567",
        Ward: "Pokhara",
      },
      {
        Name: "Biratnagar Police Station",
        Address: "Biratnagar, Morang, Nepal",
        contactPerson: "Lieutenant Hari Prasad",
        Phone: "+977 21 456789",
        Ward: "Biratnagar",
      },
    ];
    const fetchedRows = mockData.map((police) => [
      police.Name,
      police.Address,
      police.contactPerson,
      police.Phone,
      police.Ward,
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
    <div className="policeStationListContainer">
      {rows.length > 0 ? (
        <List
          title="Police Station Lists"
          createButtonLabel="Create Police Station"
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

export default PoliceStationList;
