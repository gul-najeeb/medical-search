import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Places from "./Places";
import HospitalDetailsModal from "./HospitalDetailsModal";
import { Button, Modal } from "react-bootstrap";

const API_KEY = "AIzaSyB7LKWE4Rr0Xl7Rmj6mohtUagGR93of60s";

const mapContainerStyle = {
  width: "50%",
  height: "600px",
};
type Place = google.maps.places.PlaceResult;

const NearbyPlacesMap = ({ searchQuery = "Clinic" }) => {
  const [center, setCenter] = useState({ lat: "", lng: "" });
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [directions, setDirections] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMarkerClick = (place: Place) => {
    setSelectedPlace(place);
    console.log(place);

    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPlace(null);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    if (map && center && searchQuery) {
      const service = new window.google.maps.places.PlacesService(map);

      const request = {
        location: center,
        radius: "5000",
        keyword: searchQuery,
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
          console.log();
        }
      });
    }
  }, [map, center, searchQuery]);

  const handleLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleDirections = (destination: Place) => {
    let location = destination?.geometry?.location;
    const directionsService = new window.google.maps.DirectionsService();

    if (!location) return;

    console.log(destination);
    directionsService.route(
      {
        origin: { lat: center.lat, lng: center.lng },
        destination: location,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  if (!center) {
    return <p>Loading map and fetching your location...</p>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Places places={places || []} />
      <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          onLoad={handleLoad}
        >
          {places.map((place) => (
            <Marker
              key={place.place_id}
              position={place.geometry.location}
              onClick={() => handleMarkerClick(place)}
              // onClick={() => {
              //   setSelectedPlace(place);
              //   handleDirections(place);
              // }}
            />
          ))}

          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
      {/* Modal for displaying hospital details */}
 

      <Modal centered show={modalVisible} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        {selectedPlace && (
          <Modal.Body
            style={{
              padding: "20px",
              lineHeight: "1.5",
              fontFamily: "Arial, sans-serif",
              color: "#555",
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <img
                src={selectedPlace?.icon}
                alt={`${selectedPlace?.name} icon`}
                style={{
                  width: "40px",
                  height: "40px",
                  marginRight: "10px",
                  backgroundColor: selectedPlace.icon_background_color,
                  borderRadius: "50%",
                }}
              />
              <strong style={{ fontSize: "1.2rem", color: "#007bff" }}>
                {selectedPlace?.name}
              </strong>
            </div>
            <p style={{ margin: "8px 0" }}>
              <strong>Status:</strong> {selectedPlace?.business_status || ''}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Rating:</strong> {selectedPlace.rating || ''} ⭐ (
              {selectedPlace?.user_ratings_total || ''} reviews)
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Vicinity:</strong> {selectedPlace?.vicinity || ''}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Open Now:</strong>{" "}
              {selectedPlace?.opening_hours?.isOpen() ? "Yes" : "No"}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Type:</strong> {selectedPlace?.types && selectedPlace?.types.join(", ")}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Plus Code:</strong> {selectedPlace?.plus_code?.compound_code || ''}
            </p>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NearbyPlacesMap;
