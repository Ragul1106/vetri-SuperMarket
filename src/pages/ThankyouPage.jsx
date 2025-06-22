import React from 'react';
import ThankyouImage from '../assets/thank you.png';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center mt-5 px-3">
      <img
        src={ThankyouImage}
        alt="Thank You"
        className="img-fluid mb-4"
        style={{ maxWidth: '400px', width: '100%' }}
      />

      <h2 className="text-success fw-bold">Thank you for your purchase!</h2>
      <p className="text-muted">Your order has been placed successfully.</p>

      <button
        className="btn btn-primary mt-3 px-4 py-2"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ThankYouPage;