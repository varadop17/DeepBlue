from flask import Flask, request, jsonify
from flask_cors import CORS
import googlemaps
import requests

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

GOOGLE_MAPS_API_KEY = "AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA"
gmaps = googlemaps.Client(key=GOOGLE_MAPS_API_KEY)

@app.route("/optimize-route", methods=["GET"])
def optimize_route():
    source = request.args.get("source")
    destination = request.args.get("destination")

    if not source or not destination:
        return jsonify({"error": "Source and destination are required"}), 400

    # Fetch routes from Google Maps API
    routes = gmaps.directions(source, destination, mode="driving", alternatives=True, departure_time="now")
    if not routes:
        return jsonify({"error": "No route found"}), 404

    # Process each route
    route_data = []
    for i, route in enumerate(routes):
        route_info = route['legs'][0]
        distance = route_info['distance']['text']
        duration = route_info['duration']['text']
        traffic_duration = route_info.get('duration_in_traffic', {}).get('text', "N/A")
        tolls = any("toll" in step['html_instructions'].lower() for step in route_info['steps'])

        route_coords = [(step['start_location']['lat'], step['start_location']['lng']) for step in route_info['steps']]
        route_coords.append((route_info['end_location']['lat'], route_info['end_location']['lng']))

        route_data.append({
            "index": i,
            "distance": distance,
            "duration": duration,
            "traffic_duration": traffic_duration,
            "tolls": tolls,
            "coords": route_coords
        })

    # Find best route (least traffic duration)
    best_route = min(route_data, key=lambda r: int(r["traffic_duration"].split()[0]) if "min" in r["traffic_duration"] else float('inf'))

    # Fetch EV Charging Stations
    ev_stations = []
    for coord in best_route["coords"]:
        lat, lon = coord
        places_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lon}&radius=5000&type=charging_station&key={GOOGLE_MAPS_API_KEY}"
        response = requests.get(places_url)
        places_data = response.json()

        if "results" in places_data:
            for place in places_data["results"]:
                ev_stations.append((place["name"], place["geometry"]["location"]["lat"], place["geometry"]["location"]["lng"]))

    return jsonify({
        "best_route": best_route,
        "estimated_time": best_route["duration"],
        "traffic_conditions": best_route["traffic_duration"],
        "ev_stations": ev_stations
    })

if __name__ == "__main__":
    app.run(debug=True)



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import googlemaps
# import logging

# app = Flask(__name__)
# CORS(app)  # Fix CORS

# GOOGLE_MAPS_API_KEY = "AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA"
# gmaps = googlemaps.Client(key=GOOGLE_MAPS_API_KEY)

# logging.basicConfig(level=logging.DEBUG)


# @app.route("/optimize-route", methods=["GET"])
# def optimize_route():
#     source = request.args.get("source")
#     destination = request.args.get("destination")

#     if not source or not destination:
#         return jsonify({"error": "Source and destination are required"}), 400

#     logging.debug(f"Received request for route optimization: {source} -> {destination}")

#     try:
#         routes = gmaps.directions(source, destination, mode="driving", alternatives=True, departure_time="now")

#         if not routes:
#             return jsonify({"error": "No route found"}), 404

#         route_data = []
#         for i, route in enumerate(routes):
#             route_info = route['legs'][0]
#             distance = route_info['distance']['text']
#             duration = route_info['duration']['text']
#             traffic_duration = route_info.get('duration_in_traffic', {}).get('text', duration)
#             tolls = any("toll" in step['html_instructions'].lower() for step in route_info['steps'])

#             route_coords = [(step['start_location']['lat'], step['start_location']['lng']) for step in route_info['steps']]
#             route_coords.append((route_info['end_location']['lat'], route_info['end_location']['lng']))

#             route_data.append({
#                 "index": i,
#                 "distance": distance,
#                 "duration": duration,
#                 "traffic_duration": traffic_duration,
#                 "tolls": tolls,
#                 "coords": route_coords
#             })

#         best_route = min(route_data, key=lambda r: int(r["traffic_duration"].split()[0]) if "min" in r["traffic_duration"] else float('inf'))

#         return jsonify({
#             "best_route": best_route,
#             "estimated_time": best_route["duration"],
#             "traffic_conditions": best_route["traffic_duration"]
#         })

#     except Exception as e:
#         logging.error(f"Error optimizing route: {str(e)}")
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(debug=True, port=5000)
