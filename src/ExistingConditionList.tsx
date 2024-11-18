import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FiMinus } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";

const ExistingConditionList = ({
  selectedConditions,
  setSelectedConditions,
  conditionData,
}) => {
  const [filterText, setFilterText] = useState("");

  // Toggle condition between selected and unselected
  const toggleCondition = (id) => {
    setSelectedConditions((prev) =>
      prev.includes(id)
        ? prev.filter((conditionId) => conditionId !== id)
        : [...prev, id]
    );
  };

  // Filter unselected conditions based on the filter text
  const filteredUnselectedList = conditionData.filter(
    (condition) =>
      !selectedConditions.includes(condition.id) &&
      condition.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Separate selected conditions
  const selectedList = conditionData.filter((condition) =>
    selectedConditions.includes(condition.id)
  );

  return (
    <div style={styles.container}>
      {/* Unselected Conditions Container */}
      <div style={styles.conditionList}>
        <h5>Choose Conditions:</h5>
        <Form.Control
          type="text"
          className="mb-4"

          placeholder="Search Existing Conditions"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={styles.filterInput}
        />
        {filteredUnselectedList.length > 0 ? (
          <div style={styles.conditionColumn}>
            {filteredUnselectedList.map((condition) => (
              <div
                key={condition.id}
                onClick={() => toggleCondition(condition.id)}
                style={{
                  ...styles.conditionItem,
                  backgroundColor: "#ffffff",
                  opacity: 1,
                }}
              >
                <div className="d-flex gap-2 align-items-center">
                  <span>{condition.name}</span>
                  <IoIosAdd />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.emptyMessage}>No matching conditions found.</p>
        )}
      </div>

      {/* Selected Conditions Container */}
      <div style={styles.conditionList}>
        <h5>Selected Conditions:</h5>
        {selectedList.length > 0 ? (
          <div style={styles.conditionColumn}>
            {selectedList.map((condition) => (
              <div
                key={condition.id}
                onClick={() => toggleCondition(condition.id)}
                style={{
                  ...styles.conditionItem,
                  backgroundColor: "#c8e6c9",
                  opacity: 0.8,
                }}
              >
                <div className="d-flex gap-2 align-items-center">
                  <span>{condition.name}</span>
                  <FiMinus />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.emptyMessage}>No conditions selected.</p>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    gap: "20px",
    height: "22rem",
    overflow: "hidden",
    marginTop: "20px",
  },
  conditionList: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#e8f5e9",
    border: "1px solid #388e3c",
    overflowY: 'scroll',
  },
  conditionColumn: {
    display: "flex",
    flexWrap: 'wrap',
    flexDirection: "row",
    gap: "10px",
    marginTop: "10px",
  },
  conditionItem: {
    position: "relative",
    padding: "10px",
    border: "1px solid #388e3c",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  },
  filterInput: {
    marginBottom: "10px",
    fontSize: "0.9em",
    borderColor: "#00796b",
  },
  emptyMessage: {
    color: "#757575",
    fontStyle: "italic",
  },
};

export default ExistingConditionList;
