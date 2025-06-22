import React, { useState } from 'react';
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

  const handleSearch = () => {
    const searchText = search.trim().toLowerCase();
    const matchedItem = productsList.find(
      (p) => p.name.trim().toLowerCase() === searchText
    );

    setFoundItem(matchedItem || null);
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
  };

  return (
    <div className="w-100">
      <div className="d-flex flex-wrap align-items-center gap-2">
        <div className="input-group flex-grow-1" style={{ minWidth: '250px' }}>
          <span className="input-group-text bg-white border-end-0">
            <img src={SearchIcon} alt="search" width="20" height="20" />
          </span>

          <input
            type="text"
            className="form-control border-start-0 border-end-0 p-2"
            placeholder="Search"
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

      {foundItem && (
        <div className="mt-3 border rounded p-3 bg-light">
          <h6 className="fw-bold text-success">{foundItem.name}</h6>
          <p className="mb-1">Rate: ₹{foundItem.rate}</p>
          <p className="mb-1">Tax: ₹{foundItem.tax}</p>
          <button className="btn btn-sm btn-primary mt-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;