import React from "react";

export default function Places({
  places = [
    {
      name: "St. Elizabeth Hospital",
      address: "99F4+3GM, Hyderabad, Pakistan",
      rating: "3.9",
    },
    {
      name: "Maa Jee Hospital",
      address: "99F7+GCF, Hyderabad, Pakistan",
      rating: "4.0",
    },
    {
      name: "American Hospital",
      address: "99J9+MQ8, Hyderabad, Pakistan",
      rating: "3.0",
    },
  ],
}) {
  const styles = {
    container: {
        overflowY: 'scroll',
        height: '40rem',
      maxWidth: "470px",
      
    //   margin: "auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f7f7f7",
      color: "#333",
    },
    header: {
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "20px",
      textAlign: "center",
      color: "#333",
    },
    placeItem: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "16px",
      marginBottom: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "transform 0.3s ease",
      cursor: "pointer",
    },
    placeDetails: {
      maxWidth: "70%",
    },
    placeName: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#333",
    },
    placeAddress: {
      fontSize: "14px",
      color: "#777",
      margin: "5px 0",
    },
    placeRating: {
      fontSize: "14px",
      color: "#777",
      margin: "5px 0",
    },
    ratingHighlight: {
      color: "#f4b400",
      fontWeight: "600",
    },
    directionsButton: {
      fontSize: "14px",
      padding: "8px 12px",
      backgroundColor: "#007bff",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Nearby Hospitals</h2>
      {places.map((place, index) => (
        <div
          key={index}
          style={{
            ...styles.placeItem,
            transform: place.hover ? "translateY(-3px)" : "none",
          }}
          onMouseEnter={() => (place.hover = true)}
          onMouseLeave={() => (place.hover = false)}
        >
          <div style={styles.placeDetails}>
            <h3 style={styles.placeName}>{place.name}</h3>
            <p style={styles.placeAddress}>{place.address}</p>
            <p style={styles.placeRating}>
              Rating: <span style={styles.ratingHighlight}>{place.rating}</span>{" "}
              ⭐
            </p>
          </div>
          <button style={styles.directionsButton}>Directions</button>
        </div>
      ))}
    </div>
  );
}

// Sample usage of NearbyHospitalsList component
const samplePlaces = [
  {
    name: "St. Elizabeth Hospital",
    address: "99F4+3GM, Hyderabad, Pakistan",
    rating: "3.9",
  },
  {
    name: "Maa Jee Hospital",
    address: "99F7+GCF, Hyderabad, Pakistan",
    rating: "4.0",
  },
  {
    name: "American Hospital",
    address: "99J9+MQ8, Hyderabad, Pakistan",
    rating: "3.0",
  },
];
