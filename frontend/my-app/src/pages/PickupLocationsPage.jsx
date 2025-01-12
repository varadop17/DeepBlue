import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PickupLocationsPage = () => {
  const [pickupLocations, setPickupLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPickupLocations = async () => {
      try {
        const response = await axios.get(
          "https://api.dhl.com/location-finder/v1/find-by-address",
          {
            params: {
              countryCode: "IN", // Country code for India
              addressLocality: "Mumbai", // Locality (adjust as needed)
            },
            headers: {
              "DHL-API-Key": import.meta.env.VITE_DHL_API_KEY, // Use the Vite environment variable
            },
          }
        );

        // Log the response for debugging
        console.log('API Response:', response.data);

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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Pickup Locations</h1>
      <ul>
        {pickupLocations.length > 0 ? (
          pickupLocations.map((location, index) => (
            <li key={index}>{location.name}</li>  // Adjust this based on actual data
          ))
        ) : (
          <p>No pickup locations found.</p>
        )}
      </ul>
    </div>
  );
};

export default PickupLocationsPage;

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




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { LatLng } from 'leaflet'; // For Marker Position
// import 'leaflet/dist/leaflet.css'; // Import Leaflet styles

// const PickupLocationsPage = () => {
//   const [pickupLocations, setPickupLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userLocation, setUserLocation] = useState(null); // Store user's location

//   useEffect(() => {
//     // Function to get the user's location
//     const getUserLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             setUserLocation({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             });
//           },
//           (error) => {
//             setError(error.message);
//           }
//         );
//       } else {
//         setError("Geolocation is not supported by this browser.");
//       }
//     };

//     // Fetch pickup locations from DHL API
//     const fetchPickupLocations = async () => {
//       try {
//         const apiKey = import.meta.env.VITE_DHL_API_KEY;
//         const response = await axios.get(
//           "https://api.dhl.com/location-finder/v1/find-by-address",
//           {
//             params: {
//               countryCode: "IN", // Country code for India
//               addressLocality: "Mumbai", // Locality
//             },
//             headers: {
//               "DHL-API-Key": apiKey, // Pass the API key from the environment variable
//             },
//           }
//         );

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

//     // Get user location and fetch pickup locations
//     getUserLocation();
//     fetchPickupLocations();
//   }, []); // Empty dependency array means this effect runs once after initial render

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div style={{ color: 'red' }}>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Pickup Locations</h1>
//       {userLocation ? (
//         <div>
//           <p><strong>Your Current Location:</strong> Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}</p>
//         </div>
//       ) : (
//         <div><p>Loading your location...</p></div>
//       )}
      
//       <ul>
//         {pickupLocations.length > 0 ? (
//           pickupLocations.map((location, index) => {
//             // Check if latitude and longitude are defined
//             const { latitude, longitude, name } = location;
//             if (latitude && longitude) {
//               return (
//                 <li key={index}>
//                   <p>{name}</p>
//                 </li>
//               );
//             }
//             return null; // Skip rendering if coordinates are invalid
//           })
//         ) : (
//           <p>No pickup locations found.</p>
//         )}
//       </ul>

//       {/* OpenStreetMap using Leaflet */}
//       {userLocation && (
//         <div style={{ height: '400px', width: '100%' }}>
//           <MapContainer 
//             center={new LatLng(userLocation.latitude, userLocation.longitude)} 
//             zoom={14} 
//             style={{ height: '100%', width: '100%' }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             {/* Adding Marker for User Location */}
//             <Marker position={new LatLng(userLocation.latitude, userLocation.longitude)}>
//               <Popup>Your Current Location</Popup>
//             </Marker>
//             {/* Render Pickup Locations */}
//             {pickupLocations.map((location, index) => {
//               // Ensure valid latitude and longitude before adding a Marker
//               const { latitude, longitude, name } = location;
//               if (latitude && longitude) {
//                 return (
//                   <Marker key={index} position={new LatLng(latitude, longitude)}>
//                     <Popup>{name}</Popup>
//                   </Marker>
//                 );
//               }
//               return null; // Skip invalid locations
//             })}
//           </MapContainer>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PickupLocationsPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { LatLng } from 'leaflet'; // For Marker Position
// import 'leaflet/dist/leaflet.css'; // Import Leaflet styles

// const PickupLocationsPage = () => {
//   const [pickupLocations, setPickupLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userLocation, setUserLocation] = useState(null); // Store user's location

//   useEffect(() => {
//     // Function to get the user's location
//     const getUserLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             setUserLocation({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             });
//           },
//           (error) => {
//             setError(error.message);
//           }
//         );
//       } else {
//         setError("Geolocation is not supported by this browser.");
//       }
//     };

//     // Function to convert address to LatLng using Nominatim (OpenStreetMap)
//     const convertAddressToLatLng = async (address) => {
//       try {
//         const response = await axios.get(
//           `https://nominatim.openstreetmap.org/search`,
//           {
//             params: {
//               q: address,
//               format: 'json',
//             },
//           }
//         );
//         const data = response.data;
//         if (data && data.length > 0) {
//           return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
//         }
//         return null;
//       } catch (err) {
//         console.error('Error geocoding address:', err);
//         return null;
//       }
//     };

//     // Fetch pickup locations from DHL API
//     const fetchPickupLocations = async () => {
//       try {
//         const apiKey = import.meta.env.VITE_DHL_API_KEY;
//         const response = await axios.get(
//           "https://api.dhl.com/location-finder/v1/find-by-address",
//           {
//             params: {
//               countryCode: "IN", // Country code for India
//               addressLocality: "Mumbai", // Locality
//             },
//             headers: {
//               "DHL-API-Key": apiKey, // Pass the API key from the environment variable
//             },
//           }
//         );

//         console.log('API Response:', response.data);

//         if (response.data && Array.isArray(response.data.locations)) {
//           const locationsWithCoordinates = await Promise.all(
//             response.data.locations.map(async (location) => {
//               const { address, name } = location;
//               const coordinates = await convertAddressToLatLng(address);
//               return coordinates
//                 ? { ...location, latitude: coordinates.lat, longitude: coordinates.lon }
//                 : null;
//             })
//           );
//           setPickupLocations(locationsWithCoordinates.filter(Boolean));
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

//     // Get user location and fetch pickup locations
//     getUserLocation();
//     fetchPickupLocations();
//   }, []); // Empty dependency array means this effect runs once after initial render

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div style={{ color: 'red' }}>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Pickup Locations</h1>
//       {userLocation ? (
//         <div>
//           <p><strong>Your Current Location:</strong> Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}</p>
//         </div>
//       ) : (
//         <div><p>Loading your location...</p></div>
//       )}
      
//       <ul>
//         {pickupLocations.length > 0 ? (
//           pickupLocations.map((location, index) => {
//             // Check if latitude and longitude are defined
//             const { latitude, longitude, name } = location;
//             if (latitude && longitude) {
//               return (
//                 <li key={index}>
//                   <p>{name}</p>
//                 </li>
//               );
//             }
//             return null; // Skip rendering if coordinates are invalid
//           })
//         ) : (
//           <p>No pickup locations found.</p>
//         )}
//       </ul>

//       {/* OpenStreetMap using Leaflet */}
//       {userLocation && (
//         <div style={{ height: '400px', width: '100%' }}>
//           <MapContainer 
//             center={new LatLng(userLocation.latitude, userLocation.longitude)} 
//             zoom={14} 
//             style={{ height: '100%', width: '100%' }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             {/* Adding Marker for User Location */}
//             <Marker position={new LatLng(userLocation.latitude, userLocation.longitude)}>
//               <Popup>Your Current Location</Popup>
//             </Marker>
//             {/* Render Pickup Locations */}
//             {pickupLocations.map((location, index) => {
//               // Ensure valid latitude and longitude before adding a Marker
//               const { latitude, longitude, name } = location;
//               if (latitude && longitude) {
//                 return (
//                   <Marker key={index} position={new LatLng(latitude, longitude)}>
//                     <Popup>{name}</Popup>
//                   </Marker>
//                 );
//               }
//               return null; // Skip invalid locations
//             })}
//           </MapContainer>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PickupLocationsPage;
