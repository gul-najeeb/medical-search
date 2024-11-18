import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { Form } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";

const SymptomsList = ({ selectedSymptoms, setSelectedSymptoms, symptomsData }) => {
  const [filterText, setFilterText] = useState(""); // State for filter input

  const toggleSymptom = (id) => {
    setSelectedSymptoms((prev) => {
      const alreadySelected = prev.find((item) => item.id === id);
      if (alreadySelected) {
        return prev.filter((item) => item.id !== id);
      } else {
        return [...prev, { id, severity: 1 }];
      }
    });
  };

  const updateSeverity = (id, severity) => {
    setSelectedSymptoms((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, severity: parseInt(severity, 10) } : item
      )
    );
  };

  // Separate selected and unselected symptoms
  const selectedList = symptomsData.filter((symptom) =>
    selectedSymptoms.some((item) => item.id === symptom.id)
  );
  const unselectedList = symptomsData.filter(
    (symptom) => !selectedSymptoms.some((item) => item.id === symptom.id)
  );

  // Filter unselected symptoms based on filterText
  const filteredUnselectedList = unselectedList.filter((symptom) =>
    symptom.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Unselected Symptoms Container */}
      <div style={styles.symptomsList}>
        <h5>Choose Symptoms:</h5>


        <Form.Control
          type="text"
          placeholder="Search Symptoms"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={styles.filterInput}
          className="mb-4"

        />
        {filteredUnselectedList.length > 0 ? (
          <div style={styles.symptomsColumn}>
            {filteredUnselectedList.map((symptom) => (
              <div
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                style={{
                  ...styles.symptomItem,
                  backgroundColor: "#ffffff",
                  opacity: 1,
                }}
              >
                <div className="d-flex gap-2 align-items-center">
                  <span>{symptom.name}</span>
                  <IoIosAdd />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.emptyMessage}>No symptoms Found</p>
        )}
      </div>

      {/* Selected Symptoms Container */}
      <div style={styles.symptomsList}>
        <h5>Selected Symptoms:</h5>
        {selectedList.length > 0 ? (
          <div style={styles.symptomsColumn}>
            {selectedList.map((symptom) => {
              const selectedSymptom = selectedSymptoms.find(
                (item) => item.id === symptom.id
              );

              return (
                <div
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  style={{
                    ...styles.symptomItem,
                    opacity: 0.87,
                    backgroundColor: "#e0e0ff",
                  }}
                >
                  <div className="d-flex flex-column gap-2 align-items-center">
                    <span>{symptom.name}</span>
                    <div className="d-flex gap-2 align-items-center">
                      <span>Severity: </span>
                      <Form.Select
                        value={selectedSymptom.severity}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          updateSeverity(symptom.id, e.target.value)
                        }
                        style={styles.severityDropdown}
                      >
                        <option value="1">1 - Lowest</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10 - Highest</option>
                      </Form.Select>
                      <FiMinus />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={styles.emptyMessage}>No symptoms selected.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    height: "22rem",
    overflow: "hidden",
  },
  symptomsList: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#e9ecef",
    border: "1px solid #007bff",
    overflowY: "scroll",
  },
  symptomsColumn: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginTop: "10px",
  },
  symptomItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    border: "1px solid #007bff",
    borderRadius: "5px",
    cursor: "pointer",
    position: "relative",
    // transform: "skew(-8deg)",
  },
  severityDropdown: {
    marginTop: "5px",
    maxWidth: "130px",
    fontSize: "0.9em",
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

export default SymptomsList;
