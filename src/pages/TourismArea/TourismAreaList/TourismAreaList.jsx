import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./TourismAreaList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { truncateContents } from "../../../utils/truncateContents";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
const TourismAreaList = () => {
  const headers = ["Name", "Category", "Description", "Latitude", "Longitude"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // let isMounted = true;

    // const fetchTourismAreas = async () => {
    //   try {
    //     const tourismAreas = await adminRequest.post(
    //       `${BASE_URL}/tourismAreas`,
    //       {
    //         firstRow: 1,
    //         pageSize: 3,
    //       }
    //     );
    //     const fetchedRows = tourismAreas.data.data.map((t) => [
    //       t.name,
    //       t.tourismCategory.name,
    //       t.details,
    //       t.latitude,
    //       t.longitude,
    //     ]);
    //     if (isMounted) {
    //       setRows(fetchedRows);
    //     }
    //   } catch (error) {
    //     if (isMounted) {
    //       toast.error("Failed to fetch tourism areas");
    //     }
    //   }
    // };
    // fetchTourismAreas();
    // return () => {
    //   isMounted = false;
    // };
    const mockData = [
      {
        name: "Swayambhunath Stupa",
        category: "Historic Site",
        description:
          "A UNESCO World Heritage Site, also known as the Monkey Temple, offering panoramic views of Kathmandu Valley.",
        latitude: 27.7149,
        longitude: 85.2904,
      },
      {
        name: "Patan Durbar Square",
        category: "Historic Site",
        description:
          "A historic palace complex known for its intricate wood carvings and ancient temples, located in the city of Patan.",
        latitude: 27.6664,
        longitude: 85.324,
      },
      {
        name: "Pokhara Lakeside",
        category: "Natural Attraction",
        description:
          "A scenic area by Phewa Lake in Pokhara, known for its serene atmosphere and opportunities for boating.",
        latitude: 28.2096,
        longitude: 83.9856,
      },
      {
        name: "Everest Base Camp",
        category: "Adventure",
        description:
          "The starting point for treks to the summit of Mount Everest, offering stunning views of the world's highest peak.",
        latitude: 28.001,
        longitude: 86.8528,
      },
      {
        name: "Bhaktapur Durbar Square",
        category: "Historic Site",
        description:
          "A medieval city square known for its well-preserved temples and palaces, located in Bhaktapur.",
        latitude: 27.6717,
        longitude: 85.429,
      },
    ];

    const fetchedRows = mockData.map((tourismArea) => [
      tourismArea.name,
      tourismArea.category,
      truncateContents(tourismArea.description, 10),
      tourismArea.latitude,
      tourismArea.longitude,
    ]);

    setRows(fetchedRows);
  }, []);

  updateAuthToken();

  const getMenuItems = (row) => [
    { link: `view/${row[1]}`, text: "View" },
    { link: `edit/${row[1]}`, text: "Edit" },
    { link: `delete/${row[1]}`, text: "Delete" },
  ];

  return (
    <div className="tourismAreaListContainer">
      {rows.length > 0 ? (
        <List
          title="Tourism Area Lists"
          createButtonLabel="Create Tourism Area"
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

export default TourismAreaList;
