import styles from "../styles/MoreDropdown.module.css";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router";

// This code is based on the Code Institute's walkthrough project and modified for my project

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className={`fas fa-ellipsis-v ${styles.Dots}`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="down">
      <Dropdown.Toggle as={ThreeDots} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>

      <Dropdown.Menu
        popperConfig={{ strategy: "fixed" }}
        className="text-center"
      >
        <Dropdown.Item className={styles.Press} onClick={handleEdit}>
          Edit
        </Dropdown.Item>
        <Dropdown.Item className={styles.Press} onClick={handleDelete}>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className="ml-auto px-3 pt-3" drop="down">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
          className={styles.Press}
        >
          Add Picture
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
          className={styles.Press}
        >
          Change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
          className={styles.Press}
        >
          Change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
