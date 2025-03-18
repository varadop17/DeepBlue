// import React, { useState } from "react";
// import "./LoginPage.css";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     userType: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleUserTypeChange = (type) => {
//     setFormData({ ...formData, userType: type });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setErrorMessage("Please enter a valid email address.");
//       return;
//     }

//     if (!formData.userType) {
//       setErrorMessage("Please select a user type.");
//       return;
//     }

//     setErrorMessage("");

//     // Submit data to the backend
//     try {
//       const response = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//         alert("Login details submitted successfully!");
//         setFormData({
//           username: "",
//           email: "",
//           password: "",
//           userType: "",
//         });
//       } else {
//         alert("Failed to submit data. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className="login-page">
//       <h2>Login Page</h2>
//       <form className="login-form" onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Email Address:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <div className="user-type">
//           <p>Select User Type:</p>
//           <label>
//             <input
//               type="radio"
//               name="userType"
//               checked={formData.userType === "Regular Customer"}
//               onChange={() => handleUserTypeChange("Regular Customer")}
//             />
//             Regular Customer
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="userType"
//               checked={formData.userType === "Business"}
//               onChange={() => handleUserTypeChange("Business")}
//             />
//             Business
//           </label>
//         </div>
//         {errorMessage && <p className="error">{errorMessage}</p>}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;






import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (type) => {
    setFormData({ ...formData, userType: type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.userType) {
      setErrorMessage("Please select a user type.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Login details submitted successfully!");
        setFormData({ username: "", email: "", password: "", userType: "" });
      } else {
        alert("Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:<input type="text" name="username" value={formData.username} onChange={handleChange} required /></label>
        <label>Email:<input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
        <label>Password:<input type="password" name="password" value={formData.password} onChange={handleChange} required /></label>

        <div className="user-type">
          <label><input type="radio" checked={formData.userType === "Regular Customer"} onChange={() => handleUserTypeChange("Regular Customer")} /> Regular Customer</label>
          <label><input type="radio" checked={formData.userType === "Business"} onChange={() => handleUserTypeChange("Business")} /> Business</label>
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
