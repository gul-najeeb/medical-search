

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const API_KEY = 'AIzaSyB7LKWE4Rr0Xl7Rmj6mohtUagGR93of60s';

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};
type Place = google.maps.places.PlaceResult;

const NearbyPlacesMap = ({ searchQuery = "Clinic" }) => {
  const [center, setCenter] = useState({ lat: '', lng: '' });
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [directions, setDirections] = useState(null);

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
        radius: '5000',
        keyword: searchQuery,
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
          console.log()
        }
      });
    }
  }, [map, center, searchQuery]);

  const handleLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleDirections = (destination:Place) => {
    let location = destination?.geometry?.location
    const directionsService = new window.google.maps.DirectionsService();
    
    if(!location) return;

    console.log(destination)
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
    <LoadScript googleMapsApiKey={API_KEY} libraries={['places']}>
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
            onClick={() => { setSelectedPlace(place); handleDirections(place) }}
          />
        ))}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default NearbyPlacesMap;
