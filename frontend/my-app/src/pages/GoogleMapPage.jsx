import React from "react";
import { APIProvider, Map} from "@vis.gl/react-google-maps";

const GoogleMapPage = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>Sample Google Map</h2>
      <APIProvider apiKey="AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA">
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          onCameraChanged={(ev) =>
            console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)
          }
          style={{ width: "100%", height: "80vh" }}
        />
      </APIProvider>
    </div>
  );
};

export default GoogleMapPage;
