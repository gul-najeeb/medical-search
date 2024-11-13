 import React, { useState } from "react";
 import { FaRegCheckCircle } from "react-icons/fa";
  
import { Form } from "react-bootstrap";

const symptomsData = [
  { id: 1, name: "Cough" },
  { id: 2, name: "Fever" },
  { id: 3, name: "Headache" },
  { id: 4, name: "Sore Throat" },
  { id: 5, name: "Fatigue" },
];

const SymptomsList = ({ selectedSymptoms, setSelectedSymptoms }) => {
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

  return (
    <div style={styles.symptomsList}>
      <h5>Select Symptoms:</h5>
      <div style={styles.symptomsColumn}>
        {symptomsData.map((symptom) => {
          const isSelected = selectedSymptoms.some(
            (item) => item.id === symptom.id
          );
          const selectedSymptom = selectedSymptoms.find(
            (item) => item.id === symptom.id
          );

          return (
            <div
              key={symptom.id}
              onClick={() => toggleSymptom(symptom.id)}
              style={{
                ...styles.symptomItem,
                opacity: isSelected ? 0.87 : 1,
                backgroundColor: isSelected ? "#e0e0ff" : "#ffffff",
              }}
            >
              
              <div className="d-flex gap-2 align-items-center ">

              {isSelected && <FaRegCheckCircle />}
              
              <span>{symptom.name}</span>
</div>  
              {/* Severity dropdown appears only when symptom is selected */}
              {isSelected && (
                <div className="d-flex gap-2 align-items-center">
                  <span>Severity: </span>
                  <Form.Select
                    value={selectedSymptom.severity}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateSeverity(symptom.id, e.target.value)}
                    style={styles.severityDropdown}
                  >
                    <option value="1"> 1 - Lowest</option>
                    <option value="2"> 2</option>
                    <option value="3"> 3</option>
                    <option value="4"> 4</option>
                    <option value="5"> 5</option>
                    <option value="6"> 6</option>
                    <option value="7"> 7</option>
                    <option value="8"> 8</option>
                    <option value="9"> 9</option>
                    <option value="10">10 - Highest</option>
                  </Form.Select>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  symptomsList: {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#e9ecef",
  },
  symptomsColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },
  symptomItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    border: "1px solid #007bff",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    position: "relative",
  },
  severityDropdown: {
    marginTop: "5px",
    maxWidth: "130px",
    fontSize: "0.9em",
  },
};

export default SymptomsList;
