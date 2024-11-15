import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const HospitalDetailsModal = ({ show, onHide, place }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Hospital Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {place.name}</p>
        <p><strong>Address:</strong> {place.address}</p>
        <p><strong>Rating:</strong> {place.rating} ⭐</p>
        <p><strong>Open Now:</strong> {place.isOpen ? 'Yes' : 'No'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={() => window.open(place.directionsUrl, '_blank')}>Get Directions</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HospitalDetailsModal;
