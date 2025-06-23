import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { BsFillTrash3Fill } from "react-icons/bs";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
    window.addEventListener('storage', loadItems);
    const interval = setInterval(loadItems, 500);
    return () => {
      window.removeEventListener('storage', loadItems);
      clearInterval(interval);
    };
  }, []);

  const loadItems = () => {
    const stored = JSON.parse(localStorage.getItem('cartItems')) || [];
    setItems(stored);
  };

  const updateQuantity = (index, type) => {
    const updated = [...items];
    if (type === 'inc') {
      updated[index].quantity += 1;
    } else if (type === 'dec' && updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    }
    updated[index].amount = updated[index].quantity * updated[index].rate + updated[index].tax;
    setItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const deleteItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const headers = ['ITEM DETAILS', 'QUANTITY', 'RATE', 'TAX', 'AMOUNT', 'ACTION'];

  return (
    <div className="mt-4">
      <div className="d-none  d-md-flex border border-dark bg-light fw-bold text-center rounded" style={{color:"blue"}}>
        {headers.map((header, i) => (
          <div
            key={i}
            className={`p-3 d-flex justify-content-center align-items-center border-end border-dark `}
            style={{ flex: 1 }}
          >
            {header}
          </div>
        ))}
      </div>


      {items.length === 0 ? (
        <p className="text-muted mt-3 p-4 text-center">No items in cart.</p>
      ) : (
        items.map((item, index) => (
          <div
            key={index}
            className="d-flex flex-column flex-md-row align-items-center p-3 mt-3 bg-white rounded gap-3"
            style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',}}
          >
            <div className="text-center w-100 w-md-16">
              <strong className="d-md-none me-2">Item:</strong>
              {item.name}
              </div>

            <div className="d-flex justify-content-center align-items-center gap-3 w-100 w-md-16">
              <button
                className="btn btn-outline-primary rounded-circle p-1"
                onClick={() => updateQuantity(index, 'dec')}
              >
                <FaMinus />
              </button>
              <span> {item.quantity}</span>
              <button
                className="btn btn-outline-primary rounded-circle p-1"
                onClick={() => updateQuantity(index, 'inc')}
              >
                <FaPlus />
              </button>
            </div>

            <div className="text-center w-100 w-md-16">
               <strong className="d-md-none me-2">Rate:</strong>{item.rate}</div>
            <div className="text-center w-100 w-md-16">
               <strong className="d-md-none me-2">Tax:</strong>{item.tax}</div>
            <div className="text-center w-100 w-md-16">
               <strong className="d-md-none me-2">Amount:</strong>{item.amount}</div>

            <div className="text-center w-100 w-md-16">
              <BsFillTrash3Fill
                onClick={() => deleteItem(index)}
                style={{ cursor: 'pointer', color: 'red' }}
                title="Delete item"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ItemList;
