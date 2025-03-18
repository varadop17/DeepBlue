// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './QuotePage.css';

// const QuotePage = () => {
//   const navigate = useNavigate();

//   const handleCalculate = () => {
//     // Redirect to the logistics company calculator
//     window.location.href = 'https://www.verizonconnect.com/roi-calculator/';
//   };

//   return (
//     <div className="quote-page">
//       <div className="quote-container">
//         <h1 className="quote-title">Get a Quote</h1>
//         <p>Use our logistics company calculator to get an instant quote for your delivery needs.</p>
//         <button className="btn-primary" onClick={handleCalculate}>Calculate Now</button>
//       </div>
//     </div>
//   );
// };

// export default QuotePage;


import React from 'react';
import './QuotePage.css';

const QuotePage = () => {
  const handleCalculate = () => {
    window.open('https://www.verizonconnect.com/roi-calculator/', '_blank');
  };

  return (
    <div className="quote-page">
      <div className="quote-container">
        <h1 className="quote-title">Get a Quote</h1>
        <p>Use our logistics company calculator to get an instant quote for your delivery needs.</p>
        <button className="btn-primary" onClick={handleCalculate}>Calculate Now</button>
      </div>
    </div>
  );
};

export default QuotePage;