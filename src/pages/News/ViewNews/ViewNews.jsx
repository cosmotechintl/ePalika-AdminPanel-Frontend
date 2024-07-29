import React, { useEffect, useState } from "react";
import "./ViewNews.scss";
import { adminRequest } from "../../../utils/requestMethod";
import { BASE_URL } from "../../../utils/config";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { truncateContents } from "../../../utils/truncateContents";
import parse from "html-react-parser";
const ViewNews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeURL = location.pathname.split("/")[3];
  const [data, setData] = useState(null); // Initially set to null

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/news/detail`, {
          code: activeURL,
        });
        setData(response.data);
      } catch (error) {
        console.log("Failed to fetch news at the moment");
      }
    };
    fetchNews();
  }, [activeURL]);

  console.log("news", data);

  if (!data) {
    return <Loader />;
  }
  const { data: newsData } = data;
  if (!newsData) {
    return <Loader />;
  }

  const { heading, newsCategory, details, image, author, recordedDate } =
    newsData;
  return (
    <div className="viewNewsContainer">
      <div className="contentWrapper">
        <div className="newsPageContent">
          {newsCategory && (
            <span className="category">
              {newsCategory.name}
              <hr className="cat-hr" />
            </span>
          )}
          <span className="title">{heading}</span>
          <span className="newsSummary">
            {parse(truncateContents(details, 10))}
          </span>
          <img src={image} alt="newsImage" className="newsImage" />
          <span className="author">By: {author}</span>
          <span className="publishedDetails">
            <span>
              Published at : {new Date(recordedDate).toLocaleString()}
            </span>
            <span>Updated at : {new Date(recordedDate).toLocaleString()}</span>
            <span>Epalika</span>
          </span>
          <span className="content">{parse(details)}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewNews;
