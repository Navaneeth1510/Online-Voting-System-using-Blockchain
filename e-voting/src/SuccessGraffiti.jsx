import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Success check icon
import Confetti from "react-confetti";
import "./SuccessGraffitiIcon.css"; // Custom CSS for additional styles

function SuccessGraffitiIcon({ showConfetti }) {
  return (
    <div className="graffiti-icon-container">
      {showConfetti && (
        <Confetti
        width={100}     // Full screen width
        height={100}    // Full screen height
        numberOfPieces={200}           // Adjust number of confetti pieces
        recycle={false}                // Only one burst of confetti
        gravity={0.5}                     // Set to false to prevent continuous confetti
        />
      )}
      <FaCheckCircle className="graffiti-icon" />
    </div>
  );
};

export default SuccessGraffitiIcon;
