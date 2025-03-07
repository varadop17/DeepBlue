// import React, { useState } from "react";
// import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
// import axios from "axios";

// const containerStyle = { width: "100%", height: "500px" };
// const center = { lat: 19.0760, lng: 72.8777 };

// const MapComponent = () => {
//     const [directions, setDirections] = useState(null);
//     const [source, setSource] = useState("");
//     const [destination, setDestination] = useState("");
//     const [travelTime, setTravelTime] = useState("");
//     const [distance, setDistance] = useState("");
//     const [traffic, setTraffic] = useState("");

//     const fetchOptimizedRoute = async () => {
//         if (!source || !destination) return alert("Enter source and destination");

//         try {
//             // Fetch route from your backend
//             const response = await axios.get("http://localhost:5000/optimize-route", {
//                 params: { source, destination }
//             });

//             console.log("Best Route:", response.data.best_route);
//             console.log("Estimated Time:", response.data.estimated_time);
//             console.log("Traffic Conditions:", response.data.traffic_conditions);

//             // Set traffic conditions received from backend
//             setTraffic(response.data.traffic_conditions);

//             // Google Maps Directions API
//             const directionsService = new window.google.maps.DirectionsService();
//             directionsService.route(
//                 {
//                     origin: source,
//                     destination: destination,
//                     travelMode: window.google.maps.TravelMode.DRIVING
//                 },
//                 (result, status) => {
//                     if (status === "OK") {
//                         setDirections(result);
                        
//                         // Extract Distance & Duration
//                         const route = result.routes[0].legs[0];
//                         setDistance(route.distance.text);
//                         setTravelTime(route.duration.text);
//                     } else {
//                         console.error(`Error fetching directions: ${status}`);
//                     }
//                 }
//             );

//         } catch (error) {
//             console.error("Error fetching route:", error);
//         }
//     };

//     return (
//         <div>
//             <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
//             <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
//             <button onClick={fetchOptimizedRoute}>Find Best Route</button>

//             {/* Display Route Details */}
//             {distance && travelTime && (
//                 <div>
//                     <h3>Route Details:</h3>
//                     <p><strong>Distance:</strong> {distance}</p>
//                     <p><strong>Estimated Travel Time:</strong> {travelTime}</p>
//                     <p><strong>Traffic Conditions:</strong> {traffic}</p>
//                 </div>
//             )}

//             <LoadScript googleMapsApiKey="AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA">
//                 <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//                     {directions && <DirectionsRenderer directions={directions} />}
//                 </GoogleMap>
//             </LoadScript>
//         </div>
//     );
// };

// export default MapComponent;

import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = { width: "100%", height: "500px" };
const center = { lat: 19.0760, lng: 72.8777 };

const MapComponent = () => {
    const [directions, setDirections] = useState(null);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [travelTime, setTravelTime] = useState("");
    const [distance, setDistance] = useState("");
    const [traffic, setTraffic] = useState("");
    const [evStations, setEvStations] = useState([]);

    const fetchOptimizedRoute = async () => {
        if (!source || !destination) return alert("Enter source and destination");

        try {
            // Fetch route details from Python backend
            const response = await axios.get("http://localhost:5000/optimize-route", {
                params: { source, destination }
            });

            const data = response.data;

            console.log("Best Route:", data.best_route);
            console.log("Estimated Time:", data.estimated_time);
            console.log("Traffic Conditions:", data.traffic_conditions);
            console.log("EV Charging Stations:", data.ev_stations);

            setTraffic(data.traffic_conditions);
            setEvStations(data.ev_stations);

            // Fetch route on Google Maps
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: source,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING
                },
                (result, status) => {
                    if (status === "OK") {
                        setDirections(result);

                        // Extract Distance & Duration
                        const route = result.routes[0].legs[0];
                        setDistance(route.distance.text);
                        setTravelTime(route.duration.text);
                    } else {
                        console.error(`Error fetching directions: ${status}`);
                    }
                }
            );

        } catch (error) {
            console.error("Error fetching route:", error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
            <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <button onClick={fetchOptimizedRoute}>Find Best Route</button>

            {/* Display Route Details */}
            {distance && travelTime && (
                <div>
                    <h3>Route Details:</h3>
                    <p><strong>Distance:</strong> {distance}</p>
                    <p><strong>Estimated Travel Time:</strong> {travelTime}</p>
                    <p><strong>Traffic Conditions:</strong> {traffic}</p>
                </div>
            )}

            {/* Display EV Charging Stations */}
            {evStations.length > 0 && (
                <div>
                    <h3>EV Charging Stations Along the Route:</h3>
                    <ul>
                        {evStations.map((station, index) => (
                            <li key={index}>{station[0]} (Lat: {station[1]}, Lng: {station[2]})</li>
                        ))}
                    </ul>
                </div>
            )}

            <LoadScript googleMapsApiKey="AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapComponent;
