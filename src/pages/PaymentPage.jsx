import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiCheck } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Card from '../assets/card.png';
import Cash from '../assets/cash.png';

const PaymentPage = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({});
  const [orderId, setOrderId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentType, setPaymentType] = useState('');
  const [receivedAmount, setReceivedAmount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem('customerDetails')) || {};
    const orderID = localStorage.getItem('orderId') || '';
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    const total = items.reduce((acc, item) => acc + (item.amount || 0), 0);

    setCustomer(customerData);
    setOrderId(orderID);
    setDate(customerData.date || new Date().toISOString().slice(0, 10));

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTime(formattedTime);

    setTotalAmount(total);
  }, []);

  useEffect(() => {
    const balanceValue = receivedAmount ? receivedAmount - totalAmount : 0;
    setBalance(balanceValue.toFixed(2));
  }, [receivedAmount, totalAmount]);

  const handlePayment = () => {
    if (!paymentType) {
      toast.warn('Please select a payment method (Cash or Card).');
      return;
    }
    if (!receivedAmount) {
      toast.error('Please enter the amount received.');
      return navigate('/payment');
    }
    if (parseFloat(receivedAmount) < parseFloat(totalAmount)) {
      toast.error('Received amount must be greater than or equal to the collected amount.');
      return;
    }

    navigate('/order-complete');
  };

  const handleDraft = () => {
    const draft = {
      customer,
      orderId,
      date,
      time,
      paymentType,
      receivedAmount,
      balance,
      totalAmount,
    };
    console.log('Draft Saved:', draft);
    toast.success('Draft Saved Successfully!');
  };

  const handleSave = () => {
    const savedData = {
      customer,
      orderId,
      date,
      time,
      paymentType,
      receivedAmount,
      balance,
      totalAmount,
    };

    localStorage.setItem('savedPayment', JSON.stringify(savedData));
    toast.success('Payment data saved to localStorage!');
  };

  return (
    <div className="container p-4 border rounded shadow" style={{ maxWidth: '500px', background: '#fff' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="mb-1"><strong>DATE:</strong> {date}</p>
          <p className="mb-1"><strong>TIME:</strong> {time}</p>
          <p className="mb-1"><strong>BILL NO:</strong> {orderId}</p>
        </div>
        <button className="btn btn-sm btn-primary fw-bold" onClick={handleDraft}>📄 Draft</button>
      </div>

      <div className="row text-center mb-4">
        <div className="col">
          <div className="p-2 text-white rounded" style={{ backgroundColor: "#f77c3e" }}>
            <div className="fw-bold">Collected Amount</div>
            <div>{totalAmount}</div>
          </div>
        </div>
        <div className="col">
          <div className="p-2  border rounded text-dark" style={{ backgroundColor: "#ec9fff" }}>
            <div className="fw-bold">Balance</div>
            <div>{balance}</div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3 mb-4" style={{ maxWidth: '100%' }}>
        <div className="d-flex flex-column me-3 gap-3" style={{ flex: 1 }}>
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: '#fff066',
                width: '32px',
                height: '32px',
                border: '1px solid #ccc',
              }}
            >
              <img src={Cash} alt="cash" style={{ width: '16px', height: '16px' }} />
            </div>
            <button
              className="btn d-flex justify-content-between align-items-center flex-grow-1"
              style={{ border: "1px solid blue", color: "black" }}
              onClick={() => setPaymentType('CASH')}
            >
              <span>CASH</span>
              {paymentType === 'CASH' && <HiCheck className="ms-2 fs-4" style={{ color: "#f88e55" }} />}
            </button>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: '#fff066',
                width: '32px',
                height: '32px',
                border: '1px solid #ccc',
              }}
            >
              <img src={Card} alt="card" style={{ width: '16px', height: '16px' }} />
            </div>
            <button
              className="btn d-flex justify-content-between align-items-center flex-grow-1"
              style={{ border: "1px solid blue", color: "black" }}
              onClick={() => setPaymentType('CARD')}
            >
              <span>CARD</span>
              {paymentType === 'CARD' && <HiCheck className="ms-2 fs-4" style={{ color: "#f88e55" }} />}
            </button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <fieldset className="rounded px-3" style={{ border: "1px solid blue" }} >
            <legend className="float-none w-auto px-2 fs-6" >Received Amount</legend>
            <input
              type="number"
              id="receivedAmount"
              className="form-control border-0 received-input"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(parseFloat(e.target.value) || '')}
            />
          </fieldset>
        </div>
      </div>

      <div className="border-top pt-3">
        <div className="d-flex justify-content-between">
          <span>Sub Total</span>
          <span>{totalAmount - 30}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Tax</span>
          <span>30</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Round Off</span>
          <span>00</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>{totalAmount}</span>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn text-light fw-bold" style={{ backgroundColor: '#f88e55' }} onClick={handleSave}>Save</button>
        <button className="btn btn-primary fw-bold" onClick={handlePayment}>Payment</button>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default PaymentPage;
