import React, { useEffect, useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import SearchBar from '../components/SearchBar';
import ItemList from '../components/ItemList';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState({
    name: '',
    contact: '',
    address: '',
    date: '',
  });

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setItems(storedItems);

    const storedCustomer = JSON.parse(localStorage.getItem('customerDetails')) || {
      name: '',
      contact: '',
      address: '',
      date: '',
    };
    setCustomer(storedCustomer);
  }, []);

  const goToProductsPage = () => {
    navigate('/products');
  };

  const isCustomerValid = () => {
    const { name, contact, address, date } = customer;
    if (!name.trim() || !contact.trim() || !address.trim() || !date.trim()) {
      alert('Please fill all customer details before proceeding.');
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contact)) {
      alert('Contact number must be a valid 10-digit number.');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
      alert('Please add at least one product before proceeding to payment.');
      return;
    }

    if (!isCustomerValid()) return;

    navigate('/payment');
  };

  return (
    <div className="container py-4" style={{paddingLeft:"15%", paddingRight:"10%"}}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">

          <CustomerForm customer={customer} setCustomer={setCustomer} />

          <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mt-4 gap-3">
            <div className="flex-grow-1 ">
              <SearchBar />
            </div>
            <div>
              <button
                className="btn text-white fw-bold"
                style={{ backgroundColor: '#f77c3e' }}
                onClick={goToProductsPage}
              >
                ➕ Add Item
              </button>
            </div>
          </div>

          <ItemList items={items} />

          <div className="text-center mt-4">
            <button className="btn btn-primary px-4 py-2 fw-bold" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
