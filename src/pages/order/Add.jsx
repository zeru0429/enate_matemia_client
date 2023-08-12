import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import AlertExample from '../../components/other/Alert';
import { server, imageserver } from '../../constants';

const Add = (props) => {
  const [products, setProducts] = useState([]);
  const { selectedProduct, selectedKind, amount, paid_price, handleProductChange, handleKindChange, full_name } = props;
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [kindOptions, setKindOptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [remainPrice, setRemainPrice] = useState(0);

  const pro_name = [];
  const productsKind = [];
  const productsMunit = [];

  // ... the rest of your code


  useEffect(() => {
    const defaultValues = {};
    props.columns.forEach((column) => {
      defaultValues[column.field] = column.defaultValue || '';
    });
    setForm(defaultValues);
  }, [props.columns]);

  useEffect(() => {
    if (selectedProduct) {
      const filteredKinds = props.columns[1].options.filter(option => option.id === selectedProduct.id);
      setKindOptions(filteredKinds);
    }
  }, [props.columns, selectedProduct]);

  const calculateTotalPrice = () => {
    if (selectedProduct && selectedKind) {
      const priceColumn = selectedKind === 'home_made' ? 'home_price' : 'out_price';
      const selectedProductData = props.columns[0].options.find(option => option.id === selectedProduct.id);
      return amount * selectedProductData[priceColumn];
    }
    return 0;
  };

  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalPrice(calculatedTotalPrice);
    setRemainPrice(calculatedTotalPrice - paid_price);
  }, [amount, selectedProduct, selectedKind, paid_price]);

  const setField = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      axios
        .post(`${imageserver}addNew${props.name}/`, formData)
        .then((response) => {
          props.setOpen(false);
          // Show success message or handle response as needed
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const validateForm = () => {
    // Implement your form validation logic
    return true; // Placeholder, replace with your validation
  };

  return (
    <div className="add container">
      <div className="modal1">
        <span className="close" onClick={() => {props.setOpen(false)}}>
          X
        </span>
        <h1>new {props.name}</h1>
        <Form onSubmit={handleSubmit}>
          {/* Rest of your form inputs */}
          {/* Example: */}
          <Form.Group key="product_name">
            <Form.Label>product_name</Form.Label>
            <Form.Control
              required
              as="select"
              name="product_name"
              value={selectedProduct ? selectedProduct.id : ''}
              onChange={(e) => handleProductChange(Number(e.target.value))}
              disabled={false}
            >
              {/* Your options here */}
            </Form.Control>
          </Form.Group>

          {/* ... (other form fields) */}
          
          <Form.Group key="type_of_order">
            <Form.Label>type_of_order</Form.Label>
            <Form.Control
              required
              as="select"
              name="type_of_order"
              value={selectedKind || ''}
              onChange={(e) => handleKindChange(e.target.value)}
              disabled={!selectedProduct}
            >
              {/* Your options here */}
            </Form.Control>
          </Form.Group>

          {/* ... (rest of your form) */}

          <Form.Group key="total_price">
            <Form.Label>total_price</Form.Label>
            <Form.Control
              type="number"
              name="total_price"
              value={totalPrice}
              disabled
            />
          </Form.Group>
          <Form.Group key="remain_price">
            <Form.Label>remain_price</Form.Label>
            <Form.Control
              type="number"
              name="remain_price"
              value={remainPrice}
              disabled
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Add;
