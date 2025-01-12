// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PickupLocationsPage = () => {
//   const [pickupLocations, setPickupLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPickupLocations = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.dhl.com/location-finder/v1/find-by-address",
//           {
//             params: {
//               countryCode: "IN", // Country code for India
//               addressLocality: "Mumbai", // Locality (adjust as needed)
//             },
//             headers: {
//               "DHL-API-Key": import.meta.env.VITE_DHL_API_KEY, // Use the Vite environment variable
//             },
//           }
//         );

//         // Log the response for debugging
//         console.log('API Response:', response.data);

//         if (response.data && Array.isArray(response.data.locations)) {
//           setPickupLocations(response.data.locations);
//         } else {
//           setError('Unexpected data format.');
//         }
//       } catch (err) {
//         console.error('Error fetching pickup locations:', err);
//         setError(err.response ? err.response.data.description : 'Error fetching data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPickupLocations();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div style={{ color: 'red' }}>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Pickup Locations</h1>
//       <ul>
//         {pickupLocations.length > 0 ? (
//           pickupLocations.map((location, index) => (
//             <li key={index}>{location.name}</li>  // Adjust this based on actual data
//           ))
//         ) : (
//           <p>No pickup locations found.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default PickupLocationsPage;

// // // #final code which showed 5 pickup locations


// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const PickupLocationsPage = () => {
// //   const [pickupLocations, setPickupLocations] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [userLocation, setUserLocation] = useState(null); // Store user's location

// //   useEffect(() => {
// //     // Function to get the user's location
// //     const getUserLocation = () => {
// //       if (navigator.geolocation) {
// //         navigator.geolocation.getCurrentPosition(
// //           (position) => {
// //             setUserLocation({
// //               latitude: position.coords.latitude,
// //               longitude: position.coords.longitude,
// //             });
// //           },
// //           (error) => {
// //             setError(error.message);
// //           }
// //         );
// //       } else {
// //         setError("Geolocation is not supported by this browser.");
// //       }
// //     };

// //     // Fetch pickup locations from DHL API
// //     const fetchPickupLocations = async () => {
// //       try {
// //         // Fetching API key from environment variable (Vite specific)
// //         const apiKey = import.meta.env.VITE_DHL_API_KEY;

// //         // Make the API request
// //         const response = await axios.get(
// //           "https://api.dhl.com/location-finder/v1/find-by-address",
// //           {
// //             params: {
// //               countryCode: "IN", // Country code for India
// //               addressLocality: "Mumbai", // Locality (you can change this)
// //             },
// //             headers: {
// //               "DHL-API-Key": apiKey, // Pass the API key from the environment variable
// //             },
// //           }
// //         );

// //         // Log the response for debugging purposes
// //         console.log('API Response:', response.data);

// //         // Assuming the API returns the locations in response.data.locations
// //         if (response.data && Array.isArray(response.data.locations)) {
// //           setPickupLocations(response.data.locations);
// //         } else {
// //           setError('Unexpected data format.');
// //         }
// //       } catch (err) {
// //         console.error('Error fetching pickup locations:', err);
// //         setError(err.response ? err.response.data.description : 'Error fetching data.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     // Get user location and fetch pickup locations
// //     getUserLocation();
// //     fetchPickupLocations();
// //   }, []); // Empty dependency array means this effect runs once after initial render

// //   // Loading state
// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   // Error handling state
// //   if (error) {
// //     return <div style={{ color: 'red' }}>Error: {error}</div>;
// //   }

// //   // Render the page
// //   return (
// //     <div>
// //       <h1>Pickup Locations</h1>
// //       {userLocation ? (
// //         <div>
// //           <p><strong>Your Current Location:</strong> Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}</p>
// //         </div>
// //       ) : (
// //         <div><p>Loading your location...</p></div>
// //       )}
// //       <ul>
// //         {pickupLocations.length > 0 ? (
// //           pickupLocations.map((location, index) => (
// //             <li key={index}>
// //               <p>{location.name}</p> {/* Adjust the data to match the API response */}
// //             </li>
// //           ))
// //         ) : (
// //           <p>No pickup locations found.</p>
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default PickupLocationsPage;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation to MapPage
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles

const PickupLocationsPage = () => {
  const [pickupLocations, setPickupLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate(); // For navigation to the MapPage

  useEffect(() => {
    const fetchPickupLocations = async () => {
      try {
        const response = await axios.get(
          "https://api.dhl.com/location-finder/v1/find-by-address",
          {
            params: {
              countryCode: "IN",
              addressLocality: "Mumbai",
            },
            headers: {
              "DHL-API-Key": import.meta.env.VITE_DHL_API_KEY,
            },
          }
        );

        if (response.data && Array.isArray(response.data.locations)) {
          setPickupLocations(response.data.locations);
        } else {
          setError('Unexpected data format.');
        }
      } catch (err) {
        console.error('Error fetching pickup locations:', err);
        setError(err.response ? err.response.data.description : 'Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPickupLocations();

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleViewMap = () => {
    navigate('/map'); // Navigate to the map page after loading pickup locations
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Pickup Locations</h1>
      <button onClick={handleViewMap}>View on Map</button> {/* Button to view map */}
      <ul>
        {pickupLocations.length > 0 ? (
          pickupLocations.map((location, index) => (
            <li key={index}>{location.name}</li> // Adjust based on actual data
          ))
        ) : (
          <p>No pickup locations found.</p>
        )}
      </ul>
    </div>
  );
};

export default PickupLocationsPage;
