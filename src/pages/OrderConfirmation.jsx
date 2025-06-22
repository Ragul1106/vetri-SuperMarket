import React, { useEffect, useState } from 'react';
import orderImage from '../assets/completed.png';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './orderConfirmation.css';

const OrderConfirmation = () => {
  const [customer, setCustomer] = useState({});
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let details = JSON.parse(localStorage.getItem('customerDetails')) || {};

    if (!details.email && details.name) {
      const randomNum = Math.floor(Math.random() * 900 + 100);
      details.email = `${details.name.replace(/\s+/g, '').toLowerCase()}${randomNum}@gmail.com`;
      localStorage.setItem('customerDetails', JSON.stringify(details)); 
    }

    setCustomer(details);

    let id = localStorage.getItem('orderId');
    if (!id) {
      id = Math.floor(100 + Math.random() * 900);
      localStorage.setItem('orderId', id);
    }
    setOrderId(id);
  }, []);

  const handleDownloadInvoice = () => {
    navigate('/invoice');
  };

  return (
    <div className="container text-center mt-5 order-container ps-md-5" style={{ marginLeft: '10%' }}>
      <div>
      <img
        src={orderImage}
        alt="Order Confirmation"
        style={{ width: '180px', marginBottom: '30px' }}
      />

      <h2 className="fw-bold">Your Order Completed</h2>
      <p className="text-muted">Thank you. Your order has been received</p>
      </div>
<div>
      <div
        className="order-confirm "
        // d-flex flex-wrap justify-content-between align-items-start mt-4 p-3 px-4 rounded

        // style={{ backgroundColor: '#d9f6dc', maxWidth: '900px', margin: '30px auto' }}
      >
        <div className="info-box" style={{ flex: '1 1 10px', marginBottom: '15px' }}>
          <div className="fw-bold text-start">Order ID</div>
          <div className="fw-normal text-start">{orderId}</div>
        </div>
        <div className="info-box" style={{ flex: '1 1 10px', marginBottom: '15px' }}>
          <div className="fw-bold text-start">Name</div>
          <div className="fw-normal text-start">{customer.name}</div>
        </div>
        <div className="info-box" style={{ flex: '1 1 10px', marginBottom: '15px' }}>
          <div className="fw-bold text-start">Phone Number</div>
          <div className="fw-normal text-start">{customer.contact}</div>
        </div>
        <div className="info-box" style={{ flex: '1 1 20px', marginBottom: '15px' }}>
          <div className="fw-bold text-start">Email Id</div>
          <div className="fw-normal text-start">{customer.email}</div>
        </div>
        <div className="info-box text-end" style={{ flex: '1 1 20px', marginBottom: '15px' }}>
          <button
            className="btn"
            style={{
              backgroundColor: '#f77c3e',
              color: '#fff',
              fontWeight: 'bold',
              padding: '6px 14px',
              borderRadius: '6px',
            }}
            onClick={handleDownloadInvoice}
          >
            Download Invoice
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
