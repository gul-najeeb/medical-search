import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { Form } from "react-bootstrap";

const VitalList = ({ selectedVitals, setSelectedVitals, vitalData }) => {
  const [filterText, setFilterText] = useState("");

  const toggleVital = (id) => {
    setSelectedVitals((prev) => {
      const alreadySelected = prev.find((item) => item.id === id);
      if (alreadySelected) {
        return prev.filter((item) => item.id !== id);
      } else {
        return [...prev, { id, detail: "" }];
      }
    });
  };

  const updateDetail = (id, detail) => {
    setSelectedVitals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, detail } : item))
    );
  };

  // Filter unselected items based on the filter text
  const filteredUnselectedList = vitalData.filter(
    (vital) =>
      !selectedVitals.some((item) => item.id === vital.id) &&
      vital.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const selectedList = vitalData.filter((vital) =>
    selectedVitals.some((item) => item.id === vital.id)
  );

  return (
    <div style={styles.container}>
      {/* Unselected Vitals Container */}
      <div style={styles.vitalList}>
        <h5>Choose Vitals:</h5>
        <Form.Control
          type="text"
          placeholder="Search Vitals"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={styles.filterInput}
        />
        {filteredUnselectedList.length > 0 ? (
          <div style={styles.vitalColumn}>
            {filteredUnselectedList.map((vital) => (
              <div
                key={vital.id}
                onClick={() => toggleVital(vital.id)}
                style={{
                  ...styles.vitalItem,
                  backgroundColor: "#ffffff",
                  opacity: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.8rem",
                    // transform: "skew(4deg)",
                  }}
                >
                  <div>
                    <div className="d-flex gap-2 align-items-center">
                      <span>{vital.name}</span>
                    </div>
                  </div>
                  <IoIosAdd />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.emptyMessage}>No matching vitals found.</p>
        )}
      </div>

      {/* Selected Vitals Container */}
      <div style={styles.vitalList}>
        <h5>Selected Vitals:</h5>
        {selectedList.length > 0 ? (
          <div style={styles.vitalColumn}>
            {selectedList.map((vital) => {
              const selectedVital = selectedVitals.find(
                (item) => item.id === vital.id
              );

              return (
                <div
                  key={vital.id}
                  onClick={() => toggleVital(vital.id)}
                  style={{
                    ...styles.vitalItem,
                    opacity: 0.84,
                    backgroundColor: "#e0f7fa",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.8rem",
                      // transform: "skew(4deg)",
                    }}
                  >
                    <div>
                      <div className="d-flex gap-2 align-items-center">
                        <span>{vital.name}</span>
                      </div>
                      {/* Detail input */}
                      <Form.Control
                        type="text"
                        value={selectedVital.detail}
                        placeholder="Enter Value"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          updateDetail(vital.id, e.target.value)
                        }
                        style={styles.detailInput}
                      />
                    </div>
                    <FiMinus />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={styles.emptyMessage}>No vitals selected.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    height: "22rem",
    overflow: "hidden",
    marginTop: "20px",
  },
  vitalList: {
    flex: 1,
    overflowY: "scroll",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f1f8e9",
    border: "1px solid #00796b",
  },
  vitalColumn: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
    gap: "10px",
    marginTop: "10px",
  },
  vitalItem: {
    // transform: "skew(-8deg)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px",
    border: "1px solid #00796b",
    borderRadius: "5px",
    cursor: "pointer",
    position: "relative",
  },
  detailInput: {
    marginTop: "5px",
    width: "100%",
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

export default VitalList;
