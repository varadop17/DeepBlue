import React, { useEffect, useState } from "react";
import axios from "axios";

const DHLDataPage = () => {
  const [data, setData] = useState(null); // State to store API response
  const [error, setError] = useState(null); // State to store error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call
        const response = await axios.get(
          "https://api.dhl.com/location-finder/v1/find-by-address",
          {
            params: {
              countryCode: "IN", // Country code for India
              addressLocality: "Mumbai", // Locality for the query
            },
            headers: {
              "DHL-API-Key": process.env.REACT_APP_DHL_API_KEY, // Use the environment variable
            },
          }
        );
        setData(response.data); // Store the response in state
      } catch (err) {
        setError(err.message); // Handle errors
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this runs once after the component mounts

  return (
    <div style={{ padding: "20px" }}>
      <h1>DHL Data Page</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>} {/* Display errors */}
      {data ? (
        <pre style={{ background: "#f4f4f4", padding: "10px" }}>
          {JSON.stringify(data, null, 2)} {/* Pretty-print the API response */}
        </pre>
      ) : (
        <p>Loading...</p> // Show a loading message while fetching data
      )}
    </div>
  );
};

export default DHLDataPage;
