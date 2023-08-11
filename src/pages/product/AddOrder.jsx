import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { imageserver, server } from '../../constants';

const AddOrder = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSubDivision1, setSelectedSubDivision1] = useState('');
  const [selectedSubDivision2, setSelectedSubDivision2] = useState('');
  const [selectedSubDivision3, setSelectedSubDivision3] = useState('');
  const [subDivisions1, setSubDivisions1] = useState([]);
  const [subDivisions2, setSubDivisions2] = useState([]);
  const [subDivisions3, setSubDivisions3] = useState([]);

  useEffect(() => {
    // Fetch products from the database
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${server}api/product`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    setSelectedProduct(selectedProductId);

    // Filter sub-divisions level 1 based on the selected product
    const selectedProductData = products.find((product) => product.id === selectedProductId);
    if (selectedProductData) {
      setSubDivisions1(selectedProductData.subDivisions1);
    } else {
      setSubDivisions1([]);
    }

    // Reset sub-divisions level 2 and level 3
    setSelectedSubDivision1('');
    setSelectedSubDivision2('');
    setSelectedSubDivision3('');
    setSubDivisions2([]);
    setSubDivisions3([]);
  };

  const handleSubDivision1Change = (event) => {
    const selectedSubDivision1Id = event.target.value;
    setSelectedSubDivision1(selectedSubDivision1Id);

    // Filter sub-divisions level 2 based on the selected sub-division level 1
    const selectedSubDivision1Data = subDivisions1.find((subDivision1) => subDivision1.id === selectedSubDivision1Id);
    if (selectedSubDivision1Data) {
      setSubDivisions2(selectedSubDivision1Data.subDivisions2);
    } else {
      setSubDivisions2([]);
    }

    // Reset sub-division level 3
    setSelectedSubDivision2('');
    setSelectedSubDivision3([]);
  };

  const handleSubDivision2Change = (event) => {
    const selectedSubDivision2Id = event.target.value;
    setSelectedSubDivision2(selectedSubDivision2Id);

    // Filter sub-divisions level 3 based on the selected sub-division level 2
    const selectedSubDivision2Data = subDivisions2.find((subDivision2) => subDivision2.id === selectedSubDivision2Id);
    if (selectedSubDivision2Data) {
      setSubDivisions3(selectedSubDivision2Data.subDivisions3);
    } else {
      setSubDivisions3([]);
    }

    // Reset sub-division level 3
    setSelectedSubDivision3([]);
  };

  const handleSubDivision3Change = (event) => {
    const selectedSubDivision3Id = event.target.value;
    setSelectedSubDivision3(selectedSubDivision3Id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form submission logic (saving to database, etc.)
    // Access selectedProduct, selectedSubDivision1, selectedSubDivision2, selectedSubDivision3 state variables here
    // ...
  };

  return (
    <div>
      <h2>Add Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product">Product:</label>
          <select id="product" value={selectedProduct} onChange={handleProductChange}>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subDivision1">Sub-Division Level 1:</label>
          <select id="subDivision1" value={selectedSubDivision1} onChange={handleSubDivision1Change}>
            <option value="">Select a sub-division (Level 1)</option>
            {subDivisions1.map((subDivision1) => (
              <option key={subDivision1.id} value={subDivision1.id}>
                {subDivision1.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subDivision2">Sub-Division Level 2:</label>
          <select id="subDivision2" value={selectedSubDivision2} onChange={handleSubDivision2Change}>
            <option value="">Select a sub-division (Level 2)</option>
            {subDivisions2.map((subDivision2) => (
              <option key={subDivision2.id} value={subDivision2.id}>
                {subDivision2.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subDivision3">Sub-Division Level 3:</label>
          <select id="subDivision3" value={selectedSubDivision3} onChange={handleSubDivision3Change}>
            <option value="">Select a sub-division (Level 3)</option>
            {subDivisions3.map((subDivision3) => (
              <option key={subDivision3.id} value={subDivision3.id}>
                {subDivision3.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddOrder;