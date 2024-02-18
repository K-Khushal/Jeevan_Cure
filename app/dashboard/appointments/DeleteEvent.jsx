import React from "react";

const DeleteEvent = ({ onDelete, eventText, onClose }) => {
  return (
    <>
      <div id="deleteEvent">
        <h2>Event</h2>

        <p id="eventText">{eventText}</p>

        <button onClick={onDelete} id="deleteButton">
          Delete
        </button>
        <button onClick={onClose} id="closeButton">
          Close
        </button>
      </div>

      <div id="BackDrop"></div>
    </>
  );
};

export default DeleteEvent;