require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Route Optimization API
app.get("/optimize-route", async (req, res) => {
    const { source, destination } = req.query;

    if (!source || !destination) {
        return res.status(400).json({ error: "Source and destination are required" });
    }

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
            params: {
                origin: source,
                destination: destination,
                key: GOOGLE_MAPS_API_KEY,
                mode: "driving",
                departure_time: "now",
                traffic_model: "best_guess",
            }
        });

        const routes = response.data.routes;
        if (!routes.length) {
            return res.status(404).json({ error: "No routes found" });
        }

        let bestRoute = null;
        let minTime = Infinity;

        routes.forEach(route => {
            const duration = route.legs[0].duration_in_traffic.value;
            if (duration < minTime) {
                minTime = duration;
                bestRoute = route;
            }
        });

        res.json({
            best_route: bestRoute.summary,
            estimated_time: `${Math.round(minTime / 60)} minutes`,
            traffic_conditions: bestRoute.legs[0].duration_in_traffic.text,
            route_points: bestRoute.overview_polyline.points
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch route data" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
