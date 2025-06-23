import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import SearchIcon from '../assets/search.png';
import BarCode from '../assets/bar code.png';
import Mic from '../assets/mic.png';

const productsList = [
  { name: "Dairy Milk", quantity: 1, rate: 100, tax: 20 },
  { name: "Millet Noodles", quantity: 1, rate: 30, tax: 10 },
  { name: "Wheat Flour", quantity: 1, rate: 100, tax: 20 },
  { name: "Maida", quantity: 1, rate: 30, tax: 10 },
  { name: "Chili Powder", quantity: 1, rate: 100, tax: 20 },
  { name: "Biryani Masala", quantity: 1, rate: 30, tax: 10 },
];

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [foundItem, setFoundItem] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const searchText = search.trim().toLowerCase();
    const matchedItem = productsList.find(
      (p) => p.name.trim().toLowerCase() === searchText
    );

    if (matchedItem) {
      setFoundItem(matchedItem);
      setNotFound(false);
    } else {
      setFoundItem(null);
      setNotFound(true);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingIndex = cart.findIndex(
      (item) => item.name.trim().toLowerCase() === foundItem.name.trim().toLowerCase()
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
      cart[existingIndex].amount =
        cart[existingIndex].quantity * cart[existingIndex].rate + cart[existingIndex].tax;
    } else {
      const newItem = {
        ...foundItem,
        amount: foundItem.quantity * foundItem.rate + foundItem.tax,
      };
      cart.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cart));
    alert(`${foundItem.name} added to item list.`);
    setSearch('');
    setFoundItem(null);
    setNotFound(false);
  };

  return (
    <div className="w-100">
      <div className="d-flex flex-wrap align-items-center gap-2">
        <div className="input-group flex-grow-1 shadow-sm rounded" style={{ minWidth: '250px' }}>
          <span className="input-group-text bg-white border-end-0">
            <img src={SearchIcon} alt="search" width="20" height="20" />
          </span>

          <input
            type="text"
            className="form-control border-start-0 border-end-0 p-2"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />

          <span className="input-group-text bg-white border-start-0 border-end-0">
            <img src={BarCode} alt="barcode" width="40" height="15" />
          </span>

          <span className="input-group-text bg-white border-start-0">
            <img src={Mic} alt="mic" width="20" height="20" />
          </span>
        </div>
      </div>

      {notFound && (
        <div className="text-danger mt-3 fw-semibold">
          No matching product found.
        </div>
      )}

      {foundItem && (
        <div className="mt-4 animate__animated animate__fadeIn">
          <div className="card shadow-sm border-0 bg-light-subtle">
            <div className="card-body">
              <h5 className="card-title text-primary fw-bold text-capitalize">{foundItem.name}</h5>
              <div className="d-flex gap-3 flex-wrap">
                <span className="badge bg-success">Rate: ₹{foundItem.rate}</span>
                <span className="badge bg-warning text-dark">Tax: ₹{foundItem.tax}</span>
                <span className="badge bg-secondary">Qty: {foundItem.quantity}</span>
              </div>
              <p className="mt-2 mb-0 text-muted">
                Total: ₹{foundItem.quantity * foundItem.rate + foundItem.tax}
              </p>
              <button
                className="btn btn-sm mt-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: '#f77c3e',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  transition: '0.3s',
                }}
                onClick={handleAddToCart}
                title="Add to Cart"
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
