import React, { useEffect, useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";

const CustomerForm = ({ customer, setCustomer }) => {
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customerDetails"));
    if (stored) {
      setCustomer(stored);
      setIsEditable(false);
    }
  }, [setCustomer]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    const { name, contact, address, date } = customer;
    if (!name.trim() || !contact.trim() || !address.trim() || !date.trim()) {
      alert("All fields are required.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contact)) {
      alert("Contact number must be a valid 10-digit number.");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateFields()) return;
    localStorage.setItem("customerDetails", JSON.stringify(customer));
    setIsEditable(false);
  };

  const handleEdit = () => setIsEditable(true);

  const handleDelete = () => {
    localStorage.removeItem("customerDetails");
    setCustomer({ name: "", contact: "", address: "", date: "" });
    setIsEditable(true);
  };

  return (
    <div className="border-bottom pb-3 px-2 px-md-0" style={{ maxWidth: "100%" }}>
      <h5 className="mb-3">Customer Details</h5>

      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-5">
          <label className="form-label">CUSTOMER NAME:</label>
          <input
            name="name"
            value={customer.name}
            onChange={handleChange}
            disabled={!isEditable}
            className="form-control bg-transparent border-0 border-bottom rounded-0"
          />
        </div>
        <div className="col-12 col-md-5">
          <label className="form-label">CONTACT NO:</label>
          <input
            name="contact"
            value={customer.contact}
            onChange={handleChange}
            disabled={!isEditable}
            className="form-control bg-transparent border-0 border-bottom rounded-0"
            maxLength={10}
          />
        </div>
        <div className="col-12 col-md-2 text-end">
          {!isEditable ? (
            <button
              onClick={handleEdit}
              className="btn btn-outline-primary rounded-circle p-2"
              style={{ width: "40px", height: "40px" }}
            >
              <BsPencil />
            </button>
          ) : (
            <button onClick={handleSave} className="btn btn-primary w-100 w-md-auto">
              Save
            </button>
          )}
        </div>
      </div>

      <hr className="my-3" />

      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-5">
          <label className="form-label">ADDRESS:</label>
          <input
            name="address"
            value={customer.address}
            onChange={handleChange}
            disabled={!isEditable}
            className="form-control bg-transparent border-0 border-bottom rounded-0"
          />
        </div>
        <div className="col-12 col-md-5">
          <label className="form-label">DATE:</label>
          <input
            type="date"
            name="date"
            value={customer.date}
            onChange={handleChange}
            disabled={!isEditable}
            className="form-control bg-transparent border-0 border-bottom rounded-0"
          />
        </div>
        <div className="col-12 col-md-2 text-end">
          <button
            onClick={handleDelete}
            className="btn btn-outline-primary rounded-circle p-2"
            style={{ width: "40px", height: "40px" }}
          >
            <BsTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;