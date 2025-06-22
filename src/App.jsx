import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage'; 
import OrderConfirmation from './pages/OrderConfirmation';
import InvoiceGenerator from './components/InvoiceGenerator'; 
import Sidebar from './components/Sidebar';
import PaymentPage from './pages/PaymentPage';
import ThankYouPage from './pages/ThankyouPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />

        <div className="flex-grow-1 pt-5" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
         <Route path="/products" element={<ProductsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
         <Route path="/order-complete" element={<OrderConfirmation />} />
         <Route path="/invoice" element={<InvoiceGenerator />} />
         <Route path="/thankyou" element={<ThankYouPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
