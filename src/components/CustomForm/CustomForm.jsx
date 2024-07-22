import React, { useRef, useState } from "react";
import "./CustomForm.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
const CustomForm = ({
  header = "Default Header",
  fields = [],
  flexDirection = "column",
  createButtonLabel = "Create",
  onSubmit,
  isSubmitting = false,
}) => {
  const editor = useRef(null);

  const config = {
    width: "1000px", // Ensure the editor uses the full width of its container
    height: "70vh",
    minHeight: 100,
  };
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="createPageContainer">
      <div className="createPageContents">
        <div className="top">
          <span className="backIcon" onClick={handleBackClick}>
            <FaArrowLeftLong />
          </span>
          <span className="headerTitle">{header}</span>
        </div>
        <div className="bottom">
          <form
            style={{ flexDirection: flexDirection }}
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            {fields.map((field, index) => (
              <div className="inputGroup" key={index}>
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    id={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    style={{
                      width: field.width || "310px",
                      height: field.height || "35px",
                    }}
                  >
                    {field.options.map((option, index) => (
                      <option value={option.value} key={index}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    id={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    style={{
                      width: field.width || "300px",
                      height: field.height || "100px",
                    }}
                  />
                ) : field.type === "file" ? (
                  <div className="fileInput">
                    <input
                      type="file"
                      name={field.name}
                      id={field.name}
                      onChange={handleImageChange}
                    />
                    {image && (
                      <img
                        src={image}
                        alt="Company Logo"
                        className="uploadedImage"
                      />
                    )}
                  </div>
                ) : field.type === "rich-text-editor" ? (
                  <JoditEditor
                    ref={editor}
                    config={config}
                    name={field.name}
                    id={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                ) : field.type === "nepali-date-picker" ? (
                  <NepaliDatePicker
                    inputClassName="form-control nepaliDatePicker"
                    value={field.value}
                    onChange={field.onChange}
                    options={{ calenderLocale: "en", valueLocale: "en" }}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={field.isDisabled}
                    style={{
                      width: field.width || "300px",
                      height: field.height || "25px",
                    }}
                  />
                )}
                <small className="tailText">{field.tail}</small>
              </div>
            ))}
            <div className="btn-group">
              <button
                type="submit"
                className="create-btn"
                disabled={isSubmitting}
              >
                {createButtonLabel}
              </button>
              <button
                type="button"
                className="cancel-btn"
                disabled={isSubmitting}
                onClick={handleBackClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomForm;
