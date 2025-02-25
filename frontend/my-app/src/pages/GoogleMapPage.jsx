import React, { useState, useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const GoogleMapPage = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch("/api/getSelectedDestination"); // Adjust the API route
        const data = await response.json();
        if (data && data.lat && data.lng) {
          setSelectedDestination({ lat: data.lat, lng: data.lng });
        }
      } catch (error) {
        console.error("Error fetching destination:", error);
      }
    };

    fetchDestination();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>Selected Destination Map</h2>
      <APIProvider apiKey="AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA">
        {selectedDestination ? (
          <Map
            defaultZoom={13}
            defaultCenter={selectedDestination}
            onCameraChanged={(ev) =>
              console.log("Camera changed:", ev.detail.center, "Zoom:", ev.detail.zoom)
            }
            style={{ width: "100%", height: "80vh" }}
          />
        ) : (
          <p style={{ textAlign: "center" }}>Loading map...</p>
        )}
      </APIProvider>
    </div>
  );
};

export default GoogleMapPage;
