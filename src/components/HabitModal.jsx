import React, { useState } from "react";

function HabitModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    if (title.trim() === "") return;
    onSave({ title });
    onClose();
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center">
      <div className="bg-white p-4 rounded" style={{ width: "300px" }}>
        <h5 className="mb-3">Add New Habit</h5>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter habit name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-warning" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitModal;
