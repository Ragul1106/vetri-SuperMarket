import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.avif';
import homeIcon from '../assets/Home.png';
import productsIcon from '../assets/products.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const commonRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 0',
    marginBottom: '16px',
  };

  const iconStyle = {
    width: '25px',
    height: '25px',
  };

  const iconStyleLarge = {
    width: '40px',
    height: '40px',
  };

  const textStyle = {
    margin: 0,
    fontWeight: '500',
    fontSize: '16px',
  };

  const SidebarContent = () => (
    <div
      className="p-3 d-flex flex-column"
      style={{ width: '220px', backgroundColor: '#B3D9FF   ', minHeight: '100vh' }}
    >
      <div style={commonRowStyle}>
        <img src={logo} alt="Logo" className="rounded-circle" style={iconStyleLarge} />
        <h6 style={{ ...textStyle, fontWeight: 'bold' }}>Vetri Market</h6>
      </div>

      <NavLink
        to="/"
        style={({ isActive }) => ({
          ...commonRowStyle,
          textDecoration: 'none',
          color: isActive ? '#f88e55' : '#000',
          fontWeight: isActive ? 'bold' : 'normal',
        })}
        onClick={() => setShow(false)}
      >
        <img src={homeIcon} alt="Home" style={iconStyle} />
        <span style={textStyle} className="ms-3">Home</span>
      </NavLink>

      <NavLink
        to="/products"
        style={({ isActive }) => ({
          ...commonRowStyle,
          textDecoration: 'none',
          color: isActive ? '#f88e55' : '#000',
          fontWeight: isActive ? 'bold' : 'normal',
        })}
        onClick={() => setShow(false)}
      >
        <img src={productsIcon} alt="Products" style={iconStyle} />
        <span style={textStyle} className="ms-3">Products</span>
      </NavLink>
    </div>
  );

  return (
    <>
      <div className="d-md-none bg-light border-bottom p-2 shadow-sm fixed-top" style={{ zIndex: 1050 }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <img src={logo} alt="Logo" className="rounded-circle" style={{ width: '32px', height: '32px' }} />
            <strong>Vetri Market</strong>
          </div>
          <button className="btn btn-outline-info" onClick={() => setShow(true)}>
            ☰ Menu
          </button>
        </div>
      </div>

      <div className="d-none d-md-block position-fixed top-0 start-0" style={{ height: '100vh', zIndex: 1040 }}>
        <SidebarContent />
      </div>

      {show && (
        <div
          className="offcanvas-backdrop show d-md-none"
          style={{ zIndex: 1050 }}
          onClick={() => setShow(false)}
        />
      )}
      <div
        className={`offcanvas offcanvas-start d-md-none ${show ? 'show' : ''}`}
        style={{
          visibility: show ? 'visible' : 'hidden',
          height: '100vh',
          backgroundColor: 'skyblue',
          zIndex: 1055,
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={() => setShow(false)}
          ></button>
        </div>
        <div className="offcanvas-body p-0 overflow-auto">
          <SidebarContent />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
