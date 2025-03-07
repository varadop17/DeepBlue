// import React, { useState , useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db, provider} from "../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import './Signup.css';
// import {signInWithPopup} from "firebase/auth";
// // import LandingPage from "./pages/LandingPage";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [value,setValue] = useState("")
//   const handleClick =() => {
//     signInWithPopup(auth, provider).then((data)=>{
//       setValue(data.user.email)
//       localStorage.setItem("email",data.user.email)
//     })
//   }

//   useEffect(()=>{
//     setValue(localStorage.getItem("email"))
//   })

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     // Basic validation
//     if (!role) {
//       setError("Please select a role");
//       setLoading(false);
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save the user's role in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         email: user.email,
//         role: role,
//         createdAt: new Date().toISOString(),
//       });

//       toast.success("Account created successfully!");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       setRole("");
//       setTimeout(() => {
//         navigate("/"); // Navigate to a welcome page or dashboard
//       }, 2000);
//     } catch (err) {
//       console.error("Error creating account:", err);
//       if (err.code === "auth/email-already-in-use") {
//         setError("Email already in use. Please use a different email.");
//       } else if (err.code === "auth/weak-password") {
//         setError("Password is too weak. Please use a stronger password.");
//       } else {
//         setError("Failed to create account. Try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
    
//     <div className="signup-container">
//       <ToastContainer />
//       <div>
//         {value ? <p>Logged in as: {value}</p> : 
//         <button onClick={handleClick}>Sign in with Google</button>
//         }
//       </div>
//       <div className="card">
//         <h2 className="card-title">Signup</h2>
//         {error && <p className="error-text">{error}</p>}
//         <form onSubmit={handleSignup} className="signup-form">
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>

//           <div className="form-group">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               placeholder="Confirm password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>

//           <div className="form-group">
//             <label>Role</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//               className="form-input"
//             >
//               <option value="">Select role</option>
//               <option value="customer">Customer</option>
//               <option value="admin">Admin</option>
//               <option value="business">Business</option>
//             </select>
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Signing up..." : "Signup"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db, provider } from "../firebase";
// import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPopup, signInWithPhoneNumber } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import './Signup.css';
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import TextField from '@mui/material/TextField';
// // import {RecaptchaVerifier, } from "firebase/auth";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [value, setValue] = useState("");
//   const [phone, setPhone] = useState("");
//   const [user, setUser] = useState(null);
//   const [otp,setOtp]=useState("");
  
//   const sendOtp = async() => {
//     try{
//     new RecaptchaVerifier = new RecaptchaVerifier(auth,"recaptcha",{});
//     const confirmation = signInWithPhoneNumber(auth, phone, recaptchaVerifier);
//     setUser(confirmation);
//     console.log(confirmation);
//   }catch(err){
//     console.error(err);
// }
// }

//   const verifyOtp = async() => {
//     try{
//       const data=await user.confirm(otp);
//       console.log(data);
//     }catch(err){
//       console.error(err);
//     }
//   }
//   const handleClick = () => {
//     signInWithPopup(auth, provider).then((data) => {
//       setValue(data.user.email);
//       localStorage.setItem("email", data.user.email);
//       localStorage.setItem("name", data.user.displayName);
//       navigate("/");
//     });
//   };

//   useEffect(() => {
//     setValue(localStorage.getItem("email"));
//   }, []);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     // Basic validation
//     if (!role) {
//       setError("Please select a role");
//       setLoading(false);
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save the user's role in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         email: user.email,
//         role: role,
//         createdAt: new Date().toISOString(),
//       });

//       toast.success("Account created successfully!");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       setRole("");
//       setTimeout(() => {
//         navigate("/"); // Navigate to the landing page
//       }, 2000);
//     } catch (err) {
//       console.error("Error creating account:", err);
//       if (err.code === "auth/email-already-in-use") {
//         setError("Email already in use. Please use a different email.");
//       } else if (err.code === "auth/weak-password") {
//         setError("Password is too weak. Please use a stronger password.");
//       } else {
//         setError("Failed to create account. Try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <ToastContainer />
//       <div>
//         {value ? <p>Logged in as: {value}</p> : 
//         <button onClick={handleClick}>Sign in with Google</button>
//         }
//       </div>
//       <br></br>
//       <div className="phone-signin">
//         <div className="phone-content">
//         <PhoneInput
//           country={"us"}
//           value={phone}
//           onChange={(phone)=>setPhone('+' + phone)}
//         />
//         <Button onClick={sendOtp} sx={{marginTop:"10px"}} >Send OTP</Button>
//         <div x={{marginTop:"10px"}} id="recaptcha" ></div>
//         <br/>
//         <TextField onChange={(e)=> setOtp(e.target.value)} sx={{marginTop:"10px", width:"300px"}} id="outlined-basic" label="Enter OTP" size="small"/>
//         <br/>
//         <Button onClick={verifyOtp} sx={{marginTop:"10px"}} color="success" >Verify OTP</Button>
//       </div>
//       </div>
//       <div className="card">
//         <h2 className="card-title">Signup</h2>
//         {error && <p className="error-text">{error}</p>}
//         <form onSubmit={handleSignup} className="signup-form">
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>

//           <div className="form-group">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               placeholder="Confirm password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>

//           <div className="form-group">
//             <label>Role</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//               className="form-input"
//             >
//               <option value="">Select role</option>
//               <option value="customer">Customer</option>
//               <option value="admin">Admin</option>
//               <option value="business">Business</option>
//             </select>
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Signing up..." : "Signup"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// export default Signup;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase";
import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPopup, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Signup.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // ✅ Send OTP
  // const sendOtp = async () => {
  //   try {
  //     if (!window.recaptchaVerifier) {
  //       window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
  //         size: "normal",
  //         callback: (response) => {
  //           console.log("reCAPTCHA verified:", response);
  //         },
  //         "expired-callback": () => {
  //           console.log("reCAPTCHA expired. Please try again.");
  //         },
  //       });
  //     }

  //     const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
  //     setUser(confirmation);
  //     console.log("OTP sent successfully");
  //   } catch (err) {
  //     console.error("Error sending OTP:", err);
  //     setError("Failed to send OTP. Try again.");
  //   }
  // };

  // // ✅ Verify OTP
  // const verifyOtp = async () => {
  //   try {
  //     const data = await user.confirm(otp);
  //     console.log("OTP verified successfully:", data);
  //     toast.success("Phone number verified successfully!");
  //   } catch (err) {
  //     console.error("Error verifying OTP:", err);
  //     setError("Failed to verify OTP. Please try again.");
  //   }
  // };

  // ✅ Google Authentication
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("name", data.user.displayName);
        navigate("/");
      })
      .catch((err) => {
        console.error("Google Auth Error:", err);
        setError("Failed to sign in with Google.");
      });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  // ✅ Handle Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!role) {
      setError("Please select a role");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
        createdAt: new Date().toISOString(),
      });

      toast.success("Account created successfully!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Error creating account:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use. Please use a different email.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use a stronger password.");
      } else {
        setError("Failed to create account. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      
      {/* ✅ Google Sign-In */}
      <div>
        {value ? (
          <p>Logged in as: {value}</p>
        ) : (
          <button onClick={handleClick}>Sign in with Google</button>
        )}
      </div>
      
      {/* ✅ Phone Authentication */}
      <br />
      {/* <div className="phone-signin">
        <div className="phone-content">
          <PhoneInput
            country={"us"}
            value={phone}
            onChange={(phone) => setPhone('+' + phone)}
          />
          <Button onClick={sendOtp} style={{ marginTop: "10px" }}>Send OTP</Button>
          <div id="recaptcha" style={{ marginTop: "10px" }}></div>
          <br />
          <TextField
            onChange={(e) => setOtp(e.target.value)}
            style={{ marginTop: "10px", width: "300px" }}
            id="outlined-basic"
            label="Enter OTP"
            size="small"
          />
          <br />
          <Button onClick={verifyOtp} style={{ marginTop: "10px" }} variant="success">Verify OTP</Button>
        </div>
      </div> */}
      
      {/* ✅ Email/Password Signup */}
      <div className="card">
        <h2 className="card-title">Signup</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="form-input"
            >
              <option value="">Select role</option>
              <option value="customer">Customer</option>
              <option value="business">Business</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
