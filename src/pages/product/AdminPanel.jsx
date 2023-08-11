import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { imageserver,server } from '../../constants';
const AdminPanel = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [subDivisionName, setSubDivisionName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [subDivisions, setSubDivisions] = useState([]);

  useEffect(() => {
    // Fetch products from the database
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${server}api/products`);
        setSubDivisions(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSubmit = async (event) => {
    event.preventDefault();

    // Perform product insertion logic
    try {
      const response = await axios.post(`${server}/api/product`, {
        name: productName,
        description: productDescription,
      });

      setProductName('');
      setProductDescription('');
      setSelectedProduct(response.data.id);
      setSubDivisions(response.data.subDivisions);
    } catch (error) {
      console.error('Error inserting product:', error);
    }
  };

  const handleSubDivisionSubmit = async (event) => {
    event.preventDefault();

    // Perform sub-division insertion logic
    try {
      await axios.post(`${server}/api/subdivisions`, {
        productId: selectedProduct,
        name: subDivisionName,
      });

      setSubDivisionName('');
      setSubDivisions([...subDivisions, { name: subDivisionName }]);
    } catch (error) {
      console.error('Error inserting sub-division:', error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Add Product</h3>
        <form onSubmit={handleProductSubmit}>
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="productDescription">Product Description:</label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
      
      <div>
        <h3>Add Sub-Division</h3>
        <form onSubmit={handleSubDivisionSubmit}>
          <div>
            <label htmlFor="productSelect">Select Product:</label>
            <select
              id="productSelect"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select a product</option>
              {subDivisions.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="subDivisionName">Sub-Division Name:</label>
            <input
              type="text"
              id="subDivisionName"
              value={subDivisionName}
              onChange={(e) => setSubDivisionName(e.target.value)}
            />
          </div>
          <button type="submit">Add Sub-Division</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;