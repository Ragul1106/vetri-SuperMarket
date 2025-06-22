import React, { useState } from 'react';
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const initialProducts = [
  { name: "Dairy Milk", quantity: 2, rate: 100, tax: 20 },
  { name: "Millet Noodles", quantity: 1, rate: 30, tax: 10 },
  { name: "Wheat Flour", quantity: 2, rate: 100, tax: 20 },
  { name: "Maida", quantity: 1, rate: 30, tax: 10 },
  { name: "Chili Powder", quantity: 2, rate: 100, tax: 20 },
  { name: "Biryani Masala", quantity: 1, rate: 30, tax: 10 },
];

const ProductsPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const navigate = useNavigate();

  const handleNext = () => navigate('/');

  const updateQuantity = (index, type) => {
    const updated = [...products];
    if (type === 'inc') updated[index].quantity += 1;
    if (type === 'dec' && updated[index].quantity > 1) updated[index].quantity -= 1;
    setProducts(updated);
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const index = cart.findIndex(item => item.name.toLowerCase() === product.name.toLowerCase());

    if (index !== -1) {
      cart[index].quantity += product.quantity;
      cart[index].amount = cart[index].quantity * cart[index].rate + cart[index].tax;
    } else {
      const newItem = {
        ...product,
        amount: product.quantity * product.rate + product.tax,
      };
      cart.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cart));
    alert(`${product.name} added to item list.`);
  };

  return (
    <div className="container" style={{ paddingLeft: "25%", paddingRight: "10%"}}>
      <h3 className="fw-bold mb-4">Products</h3>

      <div
  className="d-none d-md-flex bg-light border border-black rounded fw-bold text-center align-items-stretch"
  style={{ minHeight: '60px', color: "blue", marginBottom: "50px" }}
>
  <div className="col-md-2 border-end border-black d-flex align-items-center justify-content-center">
    Item
  </div>
  <div className="col-md-2 border-end border-black d-flex align-items-center justify-content-center">
    Quantity
  </div>
  <div className="col-md-2 border-end border-black d-flex align-items-center justify-content-center">
    Rate
  </div>
  <div className="col-md-2 border-end border-black d-flex align-items-center justify-content-center">
    Tax
  </div>
  <div className="col-md-2 d-flex align-items-center justify-content-end text-center">
    Amount
  </div>
</div>


      {products.map((product, index) => {
        const amount = product.quantity * product.rate + product.tax;

        return (
          <div
            key={index}
            className="row align-items-center bg-white border-none rounded py-3 my-2 p-2 gx-2"
            style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',}}
          >
            <div className="col-12  col-md-2 text-center text-md-start">
              <strong><strong className="d-md-none me-2">Item:</strong> {product.name}</strong>
            </div>

            <div className="col-12 col-md-2 d-flex justify-content-center align-items-center gap-2">

              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  width: '20px',
                  height: '20px',
                  border: '1px solid #0d6efd',
                  color: '#0d6efd',
                  cursor: 'pointer',
                }}
                onClick={() => updateQuantity(index, 'dec')}
              >
                <FaMinus />
              </div>

              <span className=" text-muted"> {product.quantity}kg</span>

              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  width: '20px',
                  height: '20px',
                  border: '1px solid #0d6efd',
                  color: '#0d6efd',
                  cursor: 'pointer',
                }}
                onClick={() => updateQuantity(index, 'inc')}
              >
                <FaPlus />
              </div>
            </div>


            <div className="col-6 col-md-2 text-center">
              <strong className="d-md-none me-2">Rate:</strong>{product.rate}</div>
            <div className="col-6 col-md-2 text-center">
              <strong className="d-md-none me-2">Tax:</strong>{product.tax}</div>
            <div className="col-6 col-md-2 text-center">
              <strong className="d-md-none me-2">Amount:</strong>{amount}</div>

            <div className="col-6 col-md-2 text-center">
              <button
                className="btn btn-sm rounded-circle"
                style={{ backgroundColor: '#f77c3e', color: 'white' }}
                onClick={() => handleAddToCart(product)}
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
        );
      })}

      <div className="text-center mt-4">
        <button
          className="btn px-5 py-2 fw-bold"
          style={{ backgroundColor: '#f77c3e', color: 'white', marginBottom:"20px" }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
