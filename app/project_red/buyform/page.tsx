"use client";
import React, { useState } from 'react';

const BuyForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productType: '',
    productImage: null,
    productDescription: ''
  });
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      productImage: URL.createObjectURL(e.target.files[0]) // Convert to URL for display
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts(prevProducts => [...prevProducts, formData]);
    setMessage('Product added successfully');
    // Reset form
    setFormData({
      productName: '',
      productType: '',
      productImage: null,
      productDescription: ''
    });
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={headingStyle}>Sell Your Product</h2>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="productType">Product Type:</label>
            <input
              type="text"
              id="productType"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="productImage">Product Image:</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              accept="image/*"
              onChange={handleImageChange}
              required
              style={inputFileStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="productDescription">Product Description:</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              required
              style={textareaStyle}
            ></textarea>
          </div>
          <button type="submit" style={buttonStyle}>Submit</button>
          {message && <p style={messageStyle}>{message}</p>}
        </form>
      </div>

      <div style={marketplaceStyle}>
        {products.map((product, index) => (
          <div key={index} style={productCardStyle}>
            {product.productImage && (
              <img src={product.productImage} alt={product.productName} style={productImageStyle} />
            )}
            <h3 style={productNameStyle}>{product.productName}</h3>
            <p style={productTypeStyle}>{product.productType}</p>
            <p style={productDescriptionStyle}>{product.productDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  backgroundColor: '#eef2f7',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
};

const formContainerStyle = {
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
};

const formStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  width: '100%',
};

const formGroupStyle = {
  marginBottom: '20px',
};

const headingStyle = {
  marginBottom: '30px',
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  textAlign: 'left',
  color: '#555',
  fontSize: '14px',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '16px',
  outline: 'none',
  transition: 'border-color 0.3s',
};

const inputFileStyle = {
  width: '100%',
  padding: '5px',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

const textareaStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '16px',
  outline: 'none',
  transition: 'border-color 0.3s',
  resize: 'vertical',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s, transform 0.3s',
};

const messageStyle = {
  marginTop: '20px',
  color: 'green',
  fontSize: '14px',
};

const marketplaceStyle = {
  marginTop: '40px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
  width: '100%',
};

const productCardStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  width: '250px',
  textAlign: 'center',
};

const productImageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
};

const productNameStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '10px 0',
};

const productTypeStyle = {
  fontSize: '14px',
  color: '#777',
  margin: '10px 0',
};

const productDescriptionStyle = {
  fontSize: '14px',
  color: '#555',
  margin: '10px 0',
};

// Add styles using a style tag for pseudo-classes
const style = document.createElement('style');
style.textContent = `
  input:focus, textarea:focus {
    border-color: #007bff;
  }
  button:hover {
    background-color: #0056b3;
    transform: scale(1.02);
  }
`;
document.head.append(style);

export default BuyForm;
