
import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  flex: "1", // Ensures it fills available space
  height: "600px",
  minWidth: "60%",
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

      <div style={styles.mapAndScoreContainer}>
        <LoadScript googleMapsApiKey="AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
            {directions && <DirectionsRenderer directions={directions} />}
            {routes.length > 0 &&
              routes[selectedRouteIndex].ev_stations.map((station, index) => (
                <Marker
                  key={`ev-${index}`}
                  position={{ lat: station.lat, lng: station.lng }}
                  icon={{
                    url: "/ev-icon.png",
                    scaledSize: new window.google.maps.Size(35, 35),
                  }}
                  title={`EV Station: ${station.name}`}
                />
              ))}
          </GoogleMap>
        </LoadScript>

        <div style={styles.scoreSection}>
          <h3>Scoring Breakdown & Reasoning</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{scoreInfo}</pre>
        </div>
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
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
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
  mapAndScoreContainer: {
    display: "flex",
    gap: "20px",
  },
  scoreSection: {
    width: "35%",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.05)",
  },
};

export default GoogleMapPage;
