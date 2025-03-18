// import React, { useState } from "react";
// import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";
// import axios from "axios";

// const containerStyle = { width: "100%", height: "500px" };
// const center = { lat: 19.0760, lng: 72.8777 };

// const MapComponent = () => {
//     const [directions, setDirections] = useState([]);
//     const [source, setSource] = useState("");
//     const [destination, setDestination] = useState("");
//     const [travelTime, setTravelTime] = useState("");
//     const [distance, setDistance] = useState("");
//     const [traffic, setTraffic] = useState("");
//     const [evStations, setEvStations] = useState([]);
//     const [bestRouteIndex, setBestRouteIndex] = useState(0);
//     const [routeSteps, setRouteSteps] = useState([]);

//     const fetchOptimizedRoute = async () => {
//         if (!source || !destination) return alert("Enter source and destination");

//         try {
//             const response = await axios.get("http://localhost:5000/optimize-route", {
//                 params: { source, destination }
//             });

//             const data = response.data;
//             setTraffic(data.traffic_conditions);
//             setEvStations(data.ev_stations);

//             const directionsService = new window.google.maps.DirectionsService();
//             directionsService.route(
//                 {
//                     origin: source,
//                     destination: destination,
//                     travelMode: window.google.maps.TravelMode.DRIVING,
//                     provideRouteAlternatives: true, // Get multiple routes
//                 },
//                 (result, status) => {
//                     if (status === "OK") {
//                         const routes = result.routes.map(route => ({ ...result, routes: [route] }));
//                         setDirections(routes);
//                         findBestRouteGA(routes); // Apply optimization algorithm
//                     } else {
//                         console.error(`Error fetching directions: ${status}`);
//                     }
//                 }
//             );

//         } catch (error) {
//             console.error("Error fetching route:", error);
//         }
//     };

//     const findBestRouteGA = (routes) => {
//         // Assign weights to different parameters
//         const weightDistance = 0.4;   // Prioritize shorter routes
//         const weightTime = 0.3;       // Prioritize faster routes
//         const weightEVStations = 0.2; // Prioritize routes with EV charging stations
//         const weightTraffic = 0.1;    // Penalize traffic congestion

//         const fitnessScores = routes.map((route, index) => {
//             const leg = route.routes[0].legs[0]; // Get route details
//             const routeDistance = parseFloat(leg.distance.text.replace(" km", ""));
//             const routeTime = parseFloat(leg.duration.text.replace(" mins", ""));
//             const evCount = evStations.filter(station => station.routeIndex === index).length;
//             const trafficPenalty = traffic === "High" ? 1.5 : traffic === "Medium" ? 1.2 : 1.0;

//             // Fitness function: Lower score is better
//             return (routeDistance * weightDistance) + 
//                    (routeTime * weightTime * trafficPenalty) - 
//                    (evCount * weightEVStations);
//         });

//         // Find index of best route
//         const optimalIndex = fitnessScores.indexOf(Math.min(...fitnessScores));
//         setBestRouteIndex(optimalIndex);

//         // Update distance & time with best route
//         const bestLeg = routes[optimalIndex].routes[0].legs[0];
//         setDistance(bestLeg.distance.text);
//         setTravelTime(bestLeg.duration.text);

//         // Extract step-by-step directions
//         const steps = bestLeg.steps.map((step, i) => ({
//             instruction: step.instructions.replace(/<[^>]+>/g, ""), // Remove HTML tags
//             distance: step.distance.text,
//             duration: step.duration.text,
//         }));

//         setRouteSteps(steps);
//     };

//     return (
//         <div>
//             <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
//             <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
//             <button onClick={fetchOptimizedRoute}>Find Best Route</button>

//             {distance && travelTime && (
//                 <div>
//                     <h3>Optimized Route Details:</h3>
//                     <p><strong>Distance:</strong> {distance}</p>
//                     <p><strong>Estimated Travel Time:</strong> {travelTime}</p>
//                     <p><strong>Traffic Conditions:</strong> {traffic}</p>
//                 </div>
//             )}

//             {/* Step-by-Step Route Instructions */}
//             {routeSteps.length > 0 && (
//                 <div>
//                     <h3>Turn-by-Turn Directions:</h3>
//                     <ul>
//                         {routeSteps.map((step, index) => (
//                             <li key={index}>
//                                 <strong>{step.instruction}</strong> - {step.distance}, {step.duration}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             <LoadScript googleMapsApiKey="AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA">
//                 <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
//                     {/* Render optimized route in blue, alternatives in other colors */}
//                     {directions.map((direction, index) => (
//                         <DirectionsRenderer 
//                             key={index} 
//                             directions={direction} 
//                             options={{
//                                 polylineOptions: {
//                                     strokeColor: index === bestRouteIndex ? "blue" : ["red", "green", "purple"][index % 3], 
//                                     strokeOpacity: 0.8,
//                                     strokeWeight: index === bestRouteIndex ? 6 : 4,
//                                 }
//                             }}
//                         />
//                     ))}

//                     {/* EV Charging Station Markers */}
//                     {evStations.map((station, index) => (
//                         <Marker 
//                             key={index} 
//                             position={{ lat: station[1], lng: station[2] }} 
//                             label={{
//                                 text: "⚡",  
//                                 fontSize: "18px",
//                                 color: "blue",
//                             }}
//                         />
//                     ))}
//                 </GoogleMap>
//             </LoadScript>
//         </div>
//     );
// };

// export default MapComponent;



import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = { width: "100%", height: "500px" };
const center = { lat: 19.076, lng: 72.8777 };

const MapComponent = () => {
    const [directions, setDirections] = useState([]);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [travelTime, setTravelTime] = useState("");
    const [distance, setDistance] = useState("");
    const [traffic, setTraffic] = useState("");
    const [evStations, setEvStations] = useState([]);
    const [bestRouteIndex, setBestRouteIndex] = useState(0);
    const [routeSteps, setRouteSteps] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    const fetchOptimizedRoute = async () => {
        if (!source || !destination) return alert("Enter source and destination");

        try {
            const response = await axios.get("http://localhost:5000/optimize-route", {
                params: { source, destination }
            });

            const data = response.data;
            setTraffic(data.traffic_conditions);
            setEvStations(data.ev_stations);

            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: source,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                    provideRouteAlternatives: true,
                },
                (result, status) => {
                    if (status === "OK") {
                        const routes = result.routes.map(route => ({ ...result, routes: [route] }));
                        setDirections(routes);
                        findBestRouteGA(routes);
                    } else {
                        console.error(`Error fetching directions: ${status}`);
                    }
                }
            );

        } catch (error) {
            console.error("Error fetching route:", error);
        }
    };

    const findBestRouteGA = (routes) => {
        const weightDistance = 0.4;
        const weightTime = 0.3;
        const weightEVStations = 0.2;
        const weightTraffic = 0.1;

        const fitnessScores = routes.map((route, index) => {
            const leg = route.routes[0].legs[0];
            const routeDistance = parseFloat(leg.distance.text.replace(" km", ""));
            const routeTime = parseFloat(leg.duration.text.replace(" mins", ""));
            const evCount = evStations.filter(station => station.routeIndex === index).length;
            const trafficPenalty = traffic === "High" ? 1.5 : traffic === "Medium" ? 1.2 : 1.0;

            return (routeDistance * weightDistance) + 
                   (routeTime * weightTime * trafficPenalty) - 
                   (evCount * weightEVStations);
        });

        const optimalIndex = fitnessScores.indexOf(Math.min(...fitnessScores));
        setBestRouteIndex(optimalIndex);

        const bestLeg = routes[optimalIndex].routes[0].legs[0];
        setDistance(bestLeg.distance.text);
        setTravelTime(bestLeg.duration.text);

        const steps = bestLeg.steps.map((step, i) => ({
            instruction: step.instructions.replace(/<[^>]+>/g, ""),
            distance: step.distance.text,
            duration: step.duration.text,
        }));

        setRouteSteps(steps);
    };

    return (
        <div>
            {/* Inputs for Source & Destination */}
            <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
            <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <button onClick={fetchOptimizedRoute}>Find Best Route</button>

            {/* Map Container (Always Visible) */}
            <LoadScript googleMapsApiKey="AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                    {directions.map((direction, index) => (
                        <DirectionsRenderer 
                            key={index} 
                            directions={direction} 
                            options={{
                                polylineOptions: {
                                    strokeColor: index === bestRouteIndex ? "blue" : ["red", "green", "purple"][index % 3], 
                                    strokeOpacity: 0.8,
                                    strokeWeight: index === bestRouteIndex ? 6 : 4,
                                }
                            }}
                        />
                    ))}
                    {evStations.map((station, index) => (
                        <Marker 
                            key={index} 
                            position={{ lat: station[1], lng: station[2] }} 
                            label={{
                                text: "⚡",  
                                fontSize: "18px",
                                color: "blue",
                            }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>

            {/* Route Info & "View Directions" Button */}
            {distance && travelTime && (
                <div>
                    <h3>Optimized Route Details:</h3>
                    <p><strong>Distance:</strong> {distance}</p>
                    <p><strong>Estimated Travel Time:</strong> {travelTime}</p>
                    <p><strong>Traffic Conditions:</strong> {traffic}</p>
                    <button onClick={() => setIsModalOpen(true)}>View Directions</button>
                </div>
            )}

            {/* Modal for Written Directions */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setIsModalOpen(false)}>X</button>
                        <h3>Turn-by-Turn Directions:</h3>
                        <ul>
                            {routeSteps.map((step, index) => (
                                <li key={index}>
                                    <strong>{step.instruction}</strong> - {step.distance}, {step.duration}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Basic CSS for Modal */}
            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 50%;
                    max-height: 70%;
                    overflow-y: auto;
                    text-align: left;
                    position: relative;
                }
                .close-btn {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: red;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .close-btn:hover {
                    background: darkred;
                }
            `}</style>
        </div>
    );
};

export default MapComponent;
