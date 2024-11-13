// HealthFactorsForm.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs, Form, Button, Row, Col } from "react-bootstrap";
import SymptomsList from "./SymptomsList";
import VitalList from "./VitalList";
import ExistingConditionList from "./ExistingConditionList";
import SearchBox from "./SearchBox";

const HealthFactorsForm = () => {
  const [selectedTab, setSelectedTab] = useState("allFactors");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [smoker, setSmoker] = useState("No");
  const [obese, setObese] = useState("No");
  const [showSymptoms, setShowSymptoms] = useState(true);

  const [selectedConditions, setSelectedConditions] = useState([]);

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedVitals, setSelectedVitals] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSymptoms(true); // Show symptoms list after submitting

    location.href =`https://www.google.com/search?q=hospital&sca_esv=1e8c9acc3ca5315c&sxsrf=ADLYWII0b6mCg7LpTKorbUD9ri-hiCV0XA%3A1731526733834&source=hp&ei=TQA1Z5yJMYj4kdUP24fAoAI&iflsig=AL9hbdgAAAAAZzUOXc9_PyCA3oD6domobgvah41swmJR&ved=0ahUKEwjc44zfh9qJAxUIfKQEHdsDECQQ4dUDCBY&uact=5&oq=hospital&gs_lp=Egdnd3Mtd2l6Ighob3NwaXRhbDILEAAYgAQYsQMYyQMyBRAAGIAEMggQABiABBixAzILEAAYgAQYkgMYigUyCxAAGIAEGJIDGIoFMggQABiABBixAzIIEAAYgAQYsQMyBRAAGIAEMggQLhiABBixAzIFEAAYgARImQ5Q5wJYgwpwAXgAkAEAmAHxAaAByw2qAQUwLjIuNrgBA8gBAPgBAZgCCaACqw6oAgrCAgcQIxgnGOoCwgIKECMYgAQYJxiKBcICBBAjGCfCAgsQABiABBiRAhiKBcICBRAuGIAEwgIOEAAYgAQYsQMYgwEYigXCAgsQABiABBixAxiDAcICERAuGIAEGLEDGNEDGIMBGMcBmAMRkgcFMS4wLjigB8c_&sclient=gws-wiz`
    // Logging for demonstration
    console.log("Selected Symptoms with Severity:", selectedSymptoms);
  };

  return (
    <div className="p-4" style={styles.container}>
      <Tabs
        activeKey={selectedTab}
        onSelect={(k) => setSelectedTab(k)}
        className="mb-3"
        justify
      >
        <Tab eventKey="allFactors" title="All Factors">
          <Form onSubmit={handleSubmit}>
            {/* Gender Dropdown */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Gender
              </Form.Label>
              <Col sm="9">
                <Form.Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={styles.dropdown}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Col>
            </Form.Group>

            {/* Age Dropdown */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Age
              </Form.Label>
              <Col sm="9">
                <Form.Select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  style={styles.dropdown}
                >
                  <option value="">Select Age Range</option>
                  <option value="20-29">20-29</option>
                  <option value="30-39">30-39</option>
                  <option value="40-59">40-59</option>
                  <option value="60-79">60-79</option>
                  <option value="80+">80+</option>
                </Form.Select>
              </Col>
            </Form.Group>

            {/* Smoker Radio Buttons */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Smoker
              </Form.Label>
              <Col sm="9">
                <Form.Check
                  inline
                  label="Yes"
                  name="smoker"
                  type="radio"
                  id="smoker-yes"
                  value="Yes"
                  checked={smoker === "Yes"}
                  onChange={(e) => setSmoker(e.target.value)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="smoker"
                  type="radio"
                  id="smoker-no"
                  value="No"
                  checked={smoker === "No"}
                  onChange={(e) => setSmoker(e.target.value)}
                />
              </Col>
            </Form.Group>

            {/* Obese Radio Buttons */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Obese
              </Form.Label>
              <Col sm="9">
                <Form.Check
                  inline
                  label="Yes"
                  name="obese"
                  type="radio"
                  id="obese-yes"
                  value="Yes"
                  checked={obese === "Yes"}
                  onChange={(e) => setObese(e.target.value)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="obese"
                  type="radio"
                  id="obese-no"
                  value="No"
                  checked={obese === "No"}
                  onChange={(e) => setObese(e.target.value)}
                />
              </Col>
            </Form.Group>
             {/* Submit Button */}
      {showSymptoms && (
        <>
          <SymptomsList
            selectedSymptoms={selectedSymptoms}
            setSelectedSymptoms={setSelectedSymptoms}
          />
          <VitalList
            selectedVitals={selectedVitals}
            setSelectedVitals={setSelectedVitals}
          />
            <ExistingConditionList
              selectedConditions={selectedConditions}
              setSelectedConditions={setSelectedConditions}
            />
        </>
      )}
            <Button variant="primary" type="submit" style={styles.submitButton}>
              Submit
            </Button>
          </Form>
        </Tab>

        <Tab eventKey="symptomsOnly" title="Symptoms Only">
          <p>Select symptoms and provide details here...</p>
        </Tab>
      </Tabs>

      {/* Symptoms List */}
    </div>
  );
};

// Inline styling
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  dropdown: {
    borderRadius: "5px",
  },
  submitButton: {
    width: "100%",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default HealthFactorsForm;