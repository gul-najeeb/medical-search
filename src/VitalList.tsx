 import React, { useState } from 'react';
 import { FaRegCheckCircle } from "react-icons/fa";

import { Form } from 'react-bootstrap';

const vitalData = [
  { id: 1, name: 'Blood Pressure' },
  { id: 2, name: 'Heart Rate' },
  { id: 3, name: 'Temperature' },
  { id: 4, name: 'Oxygen Saturation' },
  { id: 5, name: 'Respiration Rate' },
  // Add more vital items as needed
];

const VitalList = ({ selectedVitals, setSelectedVitals }) => {
  const toggleVital = (id) => {
    setSelectedVitals((prev) => {
      const alreadySelected = prev.find((item) => item.id === id);
      if (alreadySelected) {
        // Remove vital if already selected
        return prev.filter((item) => item.id !== id);
      } else {
        // Add vital with an empty detail field if not selected
        return [...prev, { id, detail: '' }];
      }
    });
  };

  const updateDetail = (id, detail) => {
    setSelectedVitals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, detail } : item
      )
    );
  };

  return (
    <div style={styles.vitalList}>
      <h5>Select Vitals:</h5>
      <div style={styles.vitalColumn}>
        {vitalData.map((vital) => {
          const isSelected = selectedVitals.some((item) => item.id === vital.id);
          const selectedVital = selectedVitals.find((item) => item.id === vital.id);

          return (
            <div
              key={vital.id}
              onClick={() => toggleVital(vital.id)}
              style={{
                ...styles.vitalItem,
                opacity: isSelected ? 0.84 : 1,
                backgroundColor: isSelected ? '#e0f7fa' : '#ffffff',
              }}
            >
                
                <div className="d-flex gap-2 align-items-center ">

{isSelected && <FaRegCheckCircle />}

<span>{vital.name}</span>
</div>  
              {/* Details text box appears only when vital is selected */}
              {isSelected && (
                <Form.Control
                  type="text"
                  value={selectedVital.detail}
                  placeholder="Enter Value"
                  onClick={(e) => e.stopPropagation()} // Prevent click from toggling selection
                  onChange={(e) => updateDetail(vital.id, e.target.value)}
                  style={styles.detailInput}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Styles for VitalList component
const styles = {
  vitalList: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f1f8e9',
  },
  vitalColumn: {
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    gap: '10px',
    marginTop: '10px',
  },
  vitalItem: {
    padding: '10px',
    border: '1px solid #00796b',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  detailInput: {
    marginTop: '5px',
    width: '100%',
    fontSize: '0.9em',
  },
};

export default VitalList;
