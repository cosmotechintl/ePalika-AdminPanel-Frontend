import React, { useEffect, useState } from "react";
import List from "../../../../components/List/List";
import "./TourismAreaCategoryList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TourismAreaCategoryList = () => {
  const headers = ["Name", "Description"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        name: "Historic Sites",
        description:
          "Landmarks and locations of historical significance, including ancient ruins, monuments, and cultural heritage sites.",
      },
      {
        name: "Natural Attractions",
        description:
          "Scenic landscapes, natural parks, mountains, lakes, and other natural wonders perfect for outdoor exploration and adventure.",
      },
      {
        name: "Museums & Galleries",
        description:
          "Institutions that preserve and display artifacts, artworks, and exhibits related to various fields such as history, art, and science.",
      },
      {
        name: "Adventure Activities",
        description:
          "Thrilling activities like trekking, rock climbing, paragliding, and other adrenaline-pumping experiences.",
      },
      {
        name: "Beaches & Coastal Areas",
        description:
          "Beautiful beaches, coastal regions, and seaside resorts ideal for relaxation, water sports, and enjoying the ocean.",
      },
      {
        name: "Wildlife Sanctuaries",
        description:
          "Protected areas for observing wildlife in their natural habitat, including national parks and conservation reserves.",
      },
      {
        name: "Religious Sites",
        description:
          "Temples, monasteries, churches, and other places of worship significant to various religious traditions.",
      },
      {
        name: "Urban Attractions",
        description:
          "Popular city destinations such as iconic buildings, markets, entertainment districts, and urban parks.",
      },
      {
        name: "Cultural Villages",
        description:
          "Villages and communities that offer a glimpse into traditional lifestyles, crafts, and local customs.",
      },
      {
        name: "Resorts & Retreats",
        description:
          "Luxury resorts, wellness retreats, and spa destinations designed for relaxation and rejuvenation.",
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
    <div className="tourismAreaCategoryListContainer">
      {rows.length > 0 ? (
        <List
          title="Tourism Area Category Lists"
          createButtonLabel="Create Tourism Area Category"
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

export default TourismAreaCategoryList;
