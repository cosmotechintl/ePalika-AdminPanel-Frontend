import React, { useState, useEffect } from "react";
import "./CreateAccessGroup.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { BASE_URL } from "../../../utils/config";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethod";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateAccessGroup = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const { data, error, loading } = useFetch(`${BASE_URL}/roles`, adminRequest);
  console.log(data);
  updateAuthToken();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    // Reset selected roles when data changes
    setSelectedRoles([]);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/accessGroup/create`, {
          name,
          description,
          roles: selectedRoles.map((roleId) => ({ roleId })),
        }),
        {
          pending: "Processing your request",
        }
      );
      if (response.data.code == 0) {
        toast.success(response.data.message, {
          autoClose: 500,
          onClose: () => navigate(-1),
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRoleChange = (roleId, parentId, childRoles = []) => {
    const isSelected = selectedRoles.includes(roleId);
    let updatedSelectedRoles;

    if (isSelected) {
      // Deselect the role and all its child roles recursively
      const rolesToDeselect = new Set([roleId]);
      const rolesToCheck = [...childRoles]; // Start with the direct child roles

      // Loop through all child roles and their child roles recursively
      while (rolesToCheck.length > 0) {
        const role = rolesToCheck.pop();
        rolesToDeselect.add(role.id);
        if (role.childRoles) {
          rolesToCheck.push(...role.childRoles);
        }
      }

      updatedSelectedRoles = selectedRoles.filter(
        (id) => !rolesToDeselect.has(id)
      );
    } else {
      // Select the role and all its child roles recursively
      updatedSelectedRoles = [...selectedRoles, roleId];

      const addAllChildRoles = (roles) => {
        roles.forEach((role) => {
          updatedSelectedRoles.push(role.id);
          if (role.childRoles && role.childRoles.length > 0) {
            addAllChildRoles(role.childRoles);
          }
        });
      };

      if (childRoles.length > 0) {
        addAllChildRoles(childRoles);
      }

      // Also select the parent role if it's not already selected
      if (parentId && !selectedRoles.includes(parentId)) {
        updatedSelectedRoles.push(parentId);
      }
    }

    setSelectedRoles(updatedSelectedRoles);
  };

  const renderRoles = (roles, parentId = null) => {
    return roles.map((role) => (
      <div key={role.id} className="roleGroup">
        <div className="parentRole">
          <input
            className="parentRole__checkbox"
            type="checkbox"
            id={role.id}
            checked={selectedRoles.includes(role.id)}
            onChange={() =>
              handleRoleChange(role.id, parentId, role.childRoles || [])
            }
          />
          <label htmlFor={role.id}>{role.name}</label>
        </div>
        {role.childRoles && role.childRoles.length > 0 && (
          <div className="childRoles">
            {renderChildRoles(role.childRoles, role.id)}
          </div>
        )}
      </div>
    ));
  };

  const renderChildRoles = (childRoles, parentId) => {
    return childRoles.map((childRole) => (
      <div key={childRole.id} className="childRoleInner">
        <input
          type="checkbox"
          id={childRole.id}
          checked={selectedRoles.includes(childRole.id)}
          onChange={() =>
            handleRoleChange(childRole.id, parentId, childRole.childRoles || [])
          }
        />
        <label htmlFor={childRole.id}>{childRole.name}</label>
        {childRole.childRoles && childRole.childRoles.length > 0 && (
          <div className="childRolesInner">
            {renderChildRoles(childRole.childRoles, childRole.id)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="createAccessGroupContainer">
      <div className="createAccessGroupContents">
        <div className="accessGroupTop">
          <span className="accessGroupBackIcon" onClick={handleBackClick}>
            <FaArrowLeftLong />
          </span>
          <span className="accessGroupHeaderTitle">Create Access Group</span>
        </div>
        <div className="accessGroupBottom">
          {loading && <Loader />}
          {!loading && (!data || !data.data) && error && <p>Not Found!</p>}
          {data && data.data && (
            <form onSubmit={handleSubmit}>
              <div className="inputGroup">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              {/* <div className="inputGroup">
                <label htmlFor="type">Type</label>
                <select
                  name="type"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="admin">Admin</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div> */}
              <div className="rolesContainer">{renderRoles(data.data)}</div>
              <div className="btn-group">
                <button type="submit" className="create-btn">
                  Create Access Group
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleBackClick}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateAccessGroup;
