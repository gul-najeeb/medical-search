import axios from 'axios';

// Base URL of the API
const BASE_URL = 'http://65.109.166.116:3000/api';

// 1. Get Symptoms
const getSymptoms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/symptoms`);
    console.log('Symptoms Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    throw error;  // You can handle this error in the calling function
  }
};

// 2. Get Pre-existing Conditions
const getPreExistingConditions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pre-existing-conditions`);
    console.log('Pre-existing Conditions Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching pre-existing conditions:', error);
    throw error;  // You can handle this error in the calling function
  }
};

// 3. Get Vitals
const getVitals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/vitals`);
    console.log('Vitals Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching vitals:', error);
    throw error;  // You can handle this error in the calling function
  }
};


// 4. Post Health Assessment Data
const postHealthAssessment = async (assessmentData) => {
  try {
    // Send the POST request with the provided data
    const response = await axios.post(`${BASE_URL}/health-assessment-allfactors`, assessmentData);
    console.log('Health Assessment Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting health assessment:', error);
    throw error; // You can handle this error in the calling function
  }
};



export { getSymptoms, getPreExistingConditions, getVitals, postHealthAssessment };
