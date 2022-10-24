import styles from "../styles/MoreDropdown.module.css";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

// This code is from the code Institute's walkthrough project

const ThreeDots = React.forwardRef(({ children, onClick }, ref) => (
  <i
    className={`fas fa-ellipsis-v ${styles.Dots}`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({handleEdit, handleDelete}) => {
  return (
    <Dropdown className="ml-auto" drop="down">
      <Dropdown.Toggle as={ThreeDots} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>

      <Dropdown.Menu popperConfig={{ strategy: "fixed" }} className="text-center">
        <Dropdown.Item className={styles.Press} onClick={handleEdit}>Edit</Dropdown.Item>
        <Dropdown.Item className={styles.Press} onClick={handleDelete}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
