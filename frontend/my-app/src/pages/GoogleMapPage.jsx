// import React, { useState } from "react";
// import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";
// import axios from "axios";

// const containerStyle = { width: "100%", height: "500px" };
// const center = { lat: 19.076, lng: 72.8777 };

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
//     const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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
//                     provideRouteAlternatives: true,
//                 },
//                 (result, status) => {
//                     if (status === "OK") {
//                         const routes = result.routes.map(route => ({ ...result, routes: [route] }));
//                         setDirections(routes);
//                         findBestRouteGA(routes);
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
//         const weightDistance = 0.4;
//         const weightTime = 0.3;
//         const weightEVStations = 0.2;
//         const weightTraffic = 0.1;

//         const fitnessScores = routes.map((route, index) => {
//             const leg = route.routes[0].legs[0];
//             const routeDistance = parseFloat(leg.distance.text.replace(" km", ""));
//             const routeTime = parseFloat(leg.duration.text.replace(" mins", ""));
//             const evCount = evStations.filter(station => station.routeIndex === index).length;
//             const trafficPenalty = traffic === "High" ? 1.5 : traffic === "Medium" ? 1.2 : 1.0;

//             return (routeDistance * weightDistance) + 
//                    (routeTime * weightTime * trafficPenalty) - 
//                    (evCount * weightEVStations);
//         });

//         const optimalIndex = fitnessScores.indexOf(Math.min(...fitnessScores));
//         setBestRouteIndex(optimalIndex);

//         const bestLeg = routes[optimalIndex].routes[0].legs[0];
//         setDistance(bestLeg.distance.text);
//         setTravelTime(bestLeg.duration.text);

//         const steps = bestLeg.steps.map((step, i) => ({
//             instruction: step.instructions.replace(/<[^>]+>/g, ""),
//             distance: step.distance.text,
//             duration: step.duration.text,
//         }));

//         setRouteSteps(steps);
//     };

//     return (
//         <div>
//             {/* Inputs for Source & Destination */}
//             <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
//             <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
//             <button onClick={fetchOptimizedRoute}>Find Best Route</button>

//             {/* Map Container (Always Visible) */}
//             <LoadScript googleMapsApiKey="AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA">
//                 <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
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

//             {/* Route Info & "View Directions" Button */}
//             {distance && travelTime && (
//                 <div>
//                     <h3>Optimized Route Details:</h3>
//                     <p><strong>Distance:</strong> {distance}</p>
//                     <p><strong>Estimated Travel Time:</strong> {travelTime}</p>
//                     <p><strong>Traffic Conditions:</strong> {traffic}</p>
//                     <button onClick={() => setIsModalOpen(true)}>View Directions</button>
//                 </div>
//             )}

//             {/* Modal for Written Directions */}
//             {isModalOpen && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <button className="close-btn" onClick={() => setIsModalOpen(false)}>X</button>
//                         <h3>Turn-by-Turn Directions:</h3>
//                         <ul>
//                             {routeSteps.map((step, index) => (
//                                 <li key={index}>
//                                     <strong>{step.instruction}</strong> - {step.distance}, {step.duration}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             )}

//             {/* Basic CSS for Modal */}
//             <style>{`
//                 .modal-overlay {
//                     position: fixed;
//                     top: 0;
//                     left: 0;
//                     width: 100%;
//                     height: 100%;
//                     background: rgba(0, 0, 0, 0.5);
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                 }
//                 .modal-content {
//                     background: white;
//                     padding: 20px;
//                     border-radius: 10px;
//                     width: 50%;
//                     max-height: 70%;
//                     overflow-y: auto;
//                     text-align: left;
//                     position: relative;
//                 }
//                 .close-btn {
//                     position: absolute;
//                     top: 10px;
//                     right: 15px;
//                     background: red;
//                     color: white;
//                     border: none;
//                     padding: 5px 10px;
//                     cursor: pointer;
//                     border-radius: 5px;
//                 }
//                 .close-btn:hover {
//                     background: darkred;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default MapComponent;
// AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA

import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

const GoogleMapPage = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [scoreInfo, setScoreInfo] = useState("");
  const [directions, setDirections] = useState(null);

  const calculateScoreWithBreakdown = (distance, duration, traffic, stopsCount, evStationsCount) => {
    let score = 100;
    let breakdown = `Base Score: 100\n`;

    if (distance.includes("km")) {
      const distNum = parseFloat(distance.split(" ")[0]);
      const distPenalty = distNum * 0.1;
      score -= distPenalty;
      breakdown += `Distance Penalty (-0.1 * ${distNum}km): -${distPenalty.toFixed(1)}\n`;
    }

    if (duration.includes("hour") || duration.includes("hr")) {
      score -= 5;
      breakdown += `Duration Penalty (hour-based): -5\n`;
    }

    if (traffic === "High") {
      score -= 10;
      breakdown += `Traffic Penalty (High traffic): -10\n`;
    }

    const stopBonus = stopsCount * 0.5;
    score += stopBonus;
    breakdown += `Stops Bonus (+0.5 * ${stopsCount}): +${stopBonus}\n`;

    const evBonus = evStationsCount * 1;
    score += evBonus;
    breakdown += `EV Stations Bonus (+1 * ${evStationsCount}): +${evBonus}\n`;

    breakdown += `\nTotal Score: ${Math.round(score)}\n`;
    return { score: Math.round(score), breakdown };
  };

  const handleOptimizeRoute = async () => {
    try {
      const response = await axios.get("http://localhost:5000/optimize-route", {
        params: { source, destination },
      });
      const { routes } = response.data;
      setRoutes(routes);

      if (routes.length > 0) {
        const googleRoute = routes[0];
        const bestRoute = routes.reduce((best, current) => {
          const currentScore = calculateScoreWithBreakdown(
            current.distance,
            current.duration,
            current.traffic,
            current.sample_spots.length,
            current.ev_stations.length
          ).score;
          const bestScore = calculateScoreWithBreakdown(
            best.distance,
            best.duration,
            best.traffic,
            best.sample_spots.length,
            best.ev_stations.length
          ).score;
          return currentScore > bestScore ? current : best;
        });

        const googleBreakdown = calculateScoreWithBreakdown(
          googleRoute.distance,
          googleRoute.duration,
          googleRoute.traffic,
          googleRoute.sample_spots.length,
          googleRoute.ev_stations.length
        );
        const gaBreakdown = calculateScoreWithBreakdown(
          bestRoute.distance,
          bestRoute.duration,
          bestRoute.traffic,
          bestRoute.sample_spots.length,
          bestRoute.ev_stations.length
        );

        setScoreInfo(
          `🔎 What does this score mean?\n` +
          `- The route score is calculated based on distance, duration, traffic, availability of stops, and EV stations.\n` +
          `- Higher score = better route.\n` +
          `- The GA optimized route aims to pick safer and more reliable paths for logistics and EV vehicles.\n\n` +
          `🚗 Google Maps Suggested Route:\n${googleBreakdown.breakdown}\n` +
          `🧬 GA Optimized Route:\n${gaBreakdown.breakdown}\n` +
          `📢 Reason: GA chooses routes not just based on distance and duration, but also on the availability of stops, EV stations, and traffic conditions — ensuring reliability for long-haul logistics.\n`
        );
        

        const directionsResult = await new window.google.maps.DirectionsService().route({
          origin: source,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
        setDirections(directionsResult);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Score Report</title></head><body>');
    printWindow.document.write(`<pre>${scoreInfo}</pre>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Fleet Route Optimizer (Google Maps + GA)</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleOptimizeRoute} style={styles.button}>
          Optimize Route
        </button>
      </div>

      <LoadScript googleMapsApiKey="AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
          {directions && <DirectionsRenderer directions={directions} />}

          {/* EV Stations along route */}
          {routes.length > 0 &&
            routes[selectedRouteIndex].ev_stations.map((station, index) => (
              <Marker
                key={`ev-${index}`}
                position={{ lat: station.lat, lng: station.lng }}
                icon={{
                  url: "/deepblue presentation (1).png", // Add your custom icon in public folder
                  scaledSize: new window.google.maps.Size(35, 35),
                }}
                title={`EV Station: ${station.name}`}
              />
            ))}

          {/* Sample Stops */}
          {routes.length > 0 &&
            routes[selectedRouteIndex].sample_spots.map((spot, index) => (
              <Marker
                key={`spot-${index}`}
                position={{
                  lat: spot.location.lat,
                  lng: spot.location.lng,
                }}
                icon={{
                  url: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                title={`Sample Stop: ${spot.name}`}
              />
            ))}
        </GoogleMap>
      </LoadScript>

      <div style={styles.scoreSection}>
        <h3>Scoring Breakdown & Reasoning</h3>
        <pre style={{ whiteSpace: "pre-wrap" }}>{scoreInfo}</pre>
        {scoreInfo && (
          <button style={styles.printBtn} onClick={handlePrint}>
            Print Score Report (PDF)
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f7fa",
  },
  heading: {
    color: "#2a5da9",
    marginBottom: "20px",
  },
  inputContainer: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "200px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#2a5da9",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  scoreSection: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.05)",
  },
  printBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default GoogleMapPage;
