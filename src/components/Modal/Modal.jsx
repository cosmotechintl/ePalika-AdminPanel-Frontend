import React from "react";
import "./Modal.scss";
import { AiOutlineClose } from "react-icons/ai";
const Modal = ({ onClose, fields = [], onSubmit, receiverName }) => {
  return (
    <div className="bottomRightModal">
      <div className="modalContent">
        <div className="modalContentHeader">
          <span className="headerText">Compose Reply</span>
          <span className="headerButtons">
            <AiOutlineClose onClick={onClose} className="closeBtn" />
          </span>
        </div>
        <div className="modalContentBody">
          <span className="replyTo">
            <span className="toLeft">To: </span>
            <span className="toRight">{receiverName}</span>
          </span>
          <hr />
          <span className="messageBox">
            <form onSubmit={onSubmit}>
              {fields.map((field, index) => (
                <div className="inputGroup" key={index}>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      id={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Type message"
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
                </div>
              ))}
              <div className="btn-group">
                <button type="submit" className="create-btn">
                  Send
                </button>
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
