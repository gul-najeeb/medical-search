// HealthFactorsForm.js
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs, Form, Button, Row, Col, Modal } from "react-bootstrap";
import SymptomsList from "./SymptomsList";
import VitalList from "./VitalList";
import ExistingConditionList from "./ExistingConditionList";
import SearchBox from "./SearchBox";
import {
  getPreExistingConditions,
  getSymptoms,
  getVitals,
  postHealthAssessment,
} from "./api";
import NearbyPlacesMap from "./NearbyPlacesMap";

const recommendationData = {
  message: "",
  recommendedFacility: "",
  Symptom_Severity_Score: 0,
  Recommendation_Factor: "",
};
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
  const [Symptoms, setSymptoms] = useState(null);
  const [PreExistingConditions, setPreExistingConditions] = useState(null);
  const [Vitals, setVitals] = useState(null);
  const [Error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for Modal visibility
  const [modalSize, setModalSize] = useState<'sm' | 'xl' | 'lg' | ''>('')

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    window.location.reload()
    setShowModal(false)
  };
  const [recommendation, setRecommendation] = useState(recommendationData);
  const [showFacilitiesOnMap, setShowFacilitiesOnMap] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      try {
        // Use Promise.all to fetch data from all three endpoints concurrently
        const [symptomsData, conditionsData, vitalsData] = await Promise.all([
          getSymptoms(),
          getPreExistingConditions(),
          getVitals(),
        ]);

        // Set the data to state
        // console.log(symptomsData?.symptoms?.map(_ => ({id: _?.Symptom_id, name: _?.Symptom_name })), '')

        setSymptoms(
          symptomsData?.symptoms?.map((_) => ({
            id: _?.symptom_id,
            name: _?.symptom_name,
          })) || []
        );
        setPreExistingConditions(
          conditionsData?.conditions?.map((_) => ({
            id: _?.condition_id,
            name: _?.condition_name,
          })) || []
        );
        setVitals(
          vitalsData?.vitals?.map((_) => ({
            id: _?.vital_id,
            name: _?.vital_name,
          })) || []
        );
      } catch (err) {
        // Handle any errors that occur during the API calls
        setError("Failed to fetch data");
        console.error("Error fetching health data:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSymptoms(true); // Show symptoms list after submitting

    // * API_RESPONSE FROM BE
    const facility = "http://localhost:5173/";
    // handleShowModal();

    // {
    //   "gender": "string",
    //   "ageRange": "string",
    //   "isSmoker": true,
    //   "isObese": true,
    //   "Onlysymptom": true,
    //   "symptoms": [
    //     {
    //       "Symptom_ID": 0,
    //       "Severity_Number": 0
    //     }
    //   ],
    //   "vitals": [
    //     {
    //       "Vital_ID": 0,
    //       "Vital_Value": "Blood Pressure"
    //     }
    //   ],
    //   "preExistingConditionIDs": [
    //     0
    //   ]
    // }
    console.log(
      "Selected Symptoms:",
      selectedSymptoms,
      selectedVitals,
      selectedConditions
    );
    postHealthAssessment({
      gender: gender,
      ageRange: age,
      isSmoker: smoker || false,
      isObese: obese || false,
      Onlysymptom: true,
      symptoms: [
        ...selectedSymptoms.map((symptom) => ({
          Symptom_ID: symptom.id,
          Severity_Number: symptom.severity,
        })),
      ],
      vitals: [
        ...selectedVitals.map((vital) => ({
          Vital_ID: vital.id,
          Vital_Value: vital.detail,
        })),
      ],
      preExistingConditionIDs: selectedConditions,
    }).then((_) => {
      handleShowModal();
      setRecommendation(_);
      console.log(" Hey this which hama", _);
    });

    // location.href =`https://www.google.com/search?q=${facility}&sca_esv=1e8c9acc3ca5315c&sxsrf=ADLYWII0b6mCg7LpTKorbUD9ri-hiCV0XA%3A1731526733834&source=hp&ei=TQA1Z5yJMYj4kdUP24fAoAI&iflsig=AL9hbdgAAAAAZzUOXc9_PyCA3oD6domobgvah41swmJR&ved=0ahUKEwjc44zfh9qJAxUIfKQEHdsDECQQ4dUDCBY&uact=5&oq=${facility}&gs_lp=Egdnd3Mtd2l6Ighob3NwaXRhbDILEAAYgAQYsQMYyQMyBRAAGIAEMggQABiABBixAzILEAAYgAQYkgMYigUyCxAAGIAEGJIDGIoFMggQABiABBixAzIIEAAYgAQYsQMyBRAAGIAEMggQLhiABBixAzIFEAAYgARImQ5Q5wJYgwpwAXgAkAEAmAHxAaAByw2qAQUwLjIuNrgBA8gBAPgBAZgCCaACqw6oAgrCAgcQIxgnGOoCwgIKECMYgAQYJxiKBcICBBAjGCfCAgsQABiABBiRAhiKBcICBRAuGIAEwgIOEAAYgAQYsQMYgwEYigXCAgsQABiABBixAxiDAcICERAuGIAEGLEDGNEDGIMBGMcBmAMRkgcFMS4wLjigB8c_&sclient=gws-wiz`
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
                  symptomsData={Symptoms || []}
                  selectedSymptoms={selectedSymptoms}
                  setSelectedSymptoms={setSelectedSymptoms}
                />
                <VitalList
                  vitalData={Vitals || []}
                  selectedVitals={selectedVitals}
                  setSelectedVitals={setSelectedVitals}
                />
                <ExistingConditionList
                  conditionData={PreExistingConditions || []}
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
      {/* Modal for Showing Recommendation */}
      <Modal show={showModal} size={modalSize} onHide={handleCloseModal} centered>
        <Modal.Header
          closeButton
          style={{
            padding: "20px 30px",
            backgroundColor: "#007bff",
          }}
        >
          <Modal.Title
            style={{ fontSize: "1.5rem", fontWeight: "600", color: "white" }}
          >
            Recommendation Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            padding: "20px 30px",
            fontSize: "1rem",
            lineHeight: "1.6",
            backgroundColor: "#f9fafc",
            color: "#333",
            // borderTop: "1px solid #e9ecef",
            // borderBottom: "1px solid #e9ecef",
          }}
        >
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: "500",
              color: "#0056b3",
              marginBottom: "15px",
            }}
          >
            <strong>Message:</strong> {recommendation.message}
          </p>

          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              fontWeight: "500",
              color: "#495057",
            }}
          >
            <span>
              <strong>Recommend Facility:</strong>
            </span>
            <span style={{ color: "#007bff", fontWeight: "600" }}>
              {recommendation.recommendedFacility}
            </span>
          </p>

          {recommendation?.Symptom_Severity_Score && (
            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontWeight: "500",
                color: "#495057",
              }}
            >
              <span>
                <strong>Symptom Severity Score:</strong>
              </span>
              <span style={{ color: "#007bff", fontWeight: "600" }}>
                {recommendation.Symptom_Severity_Score}
              </span>
            </p>
          )}
          {recommendation?.risk_factor_score && (
            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontWeight: "500",
                color: "#495057",
              }}
            >
              <span>
                <strong>Risk Factor Score:</strong>
              </span>
              <span style={{ color: "#007bff", fontWeight: "600" }}>
                {recommendation.risk_factor_score}
              </span>
            </p>
          )}
          {recommendation?.Wieghtage && (
            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontWeight: "500",
                color: "#495057",
              }}
            >
              <span>
                <strong>Wieghtage:</strong>
              </span>
              <span style={{ color: "#007bff", fontWeight: "600" }}>
                {recommendation.Wieghtage * 100}%
              </span>
            </p>
          )}
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "500",
              color: "#495057",
            }}
          >
            <span>
              <strong>Recommendation Factor:</strong>
            </span>
            <span style={{ color: "#007bff", fontWeight: "600" }}>
              {recommendation.Recommendation_Factor}
            </span>
          </p>
          <NearbyPlacesMap showFacilitiesOnMap={showFacilitiesOnMap} searchQuery={recommendation?.recommendedFacility} />
        </Modal.Body>

        <Modal.Footer>
          <Button
            hidden={showFacilitiesOnMap}
            // variant=""
            onClick={() => {
              // alert(`Navigating to ${recommendationData.recommendedFacility}`)
              setModalSize('xl')
              setShowFacilitiesOnMap(true)
              return;

              // * On Recommendation (We Should Trigger the Maps and near by places!)
              if (recommendation?.recommendedFacility)
                window.open(
                  `https://www.google.com/search?q=${'Near By ' + recommendation.recommendedFacility}&sca_esv=1e8c9acc3ca5315c&sxsrf=ADLYWII0b6mCg7LpTKorbUD9ri-hiCV0XA%3A1731526733834&source=hp&ei=TQA1Z5yJMYj4kdUP24fAoAI&iflsig=AL9hbdgAAAAAZzUOXc9_PyCA3oD6domobgvah41swmJR&ved=0ahUKEwjc44zfh9qJAxUIfKQEHdsDECQQ4dUDCBY&uact=5&oq=${'Near By ' + recommendationData.recommendedFacility}&gs_lp=Egdnd3Mtd2l6Ighob3NwaXRhbDILEAAYgAQYsQMYyQMyBRAAGIAEMggQABiABBixAzILEAAYgAQYkgMYigUyCxAAGIAEGJIDGIoFMggQABiABBixAzIIEAAYgAQYsQMyBRAAGIAEMggQLhiABBixAzIFEAAYgARImQ5Q5wJYgwpwAXgAkAEAmAHxAaAByw2qAQUwLjIuNrgBA8gBAPgBAZgCCaACqw6oAgrCAgcQIxgnGOoCwgIKECMYgAQYJxiKBcICBBAjGCfCAgsQABiABBiRAhiKBcICBRAuGIAEwgIOEAAYgAQYsQMYgwEYigXCAgsQABiABBixAxiDAcICERAuGIAEGLEDGNEDGIMBGMcBmAMRkgcFMS4wLjigB8c_&sclient=gws-wiz`,
                  "_blank"
                );
            }}
          >
            Click To See Recommended Facility
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Inline styling
const styles = {
  container: {
    maxWidth: "900px",
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
