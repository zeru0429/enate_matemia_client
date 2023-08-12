import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import AlertExample from '../../components/other/Alert';
import { server, imageserver } from '../../constants';

const Add = (props) => {
  const { selectedProduct, selectedKind, totalPrice, handleProductChange, handleKindChange } = props;
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

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
    <>
      <div className="add">
        <div className="modal1">
          {/* ... (your existing JSX) */}
          <Form.Group key="product_name">
            <Form.Label>product_name</Form.Label>
            <Form.Control
              required
              as="select"
              name="product_name"
              value={selectedProduct ? selectedProduct.id : ''}
              onChange={(e) => handleProductChange(Number(e.target.value))}
              disabled={false} // You can adjust the disabled attribute as needed
            >
              <option value="">None</option>
              {props.columns[0].options.map((option) => (
                <option key={option.value} value={option.id}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group key="kind_of_product">
            <Form.Label>kind_of_product</Form.Label>
            <Form.Control
              required
              as="select"
              name="kind_of_product"
              value={selectedKind || ''}
              onChange={(e) => handleKindChange(e.target.value)}
              disabled={!selectedProduct} // Disable if no product is selected
            >
              <option value="">None</option>
              {props.columns[1].options
                .filter((option) => option.id === selectedProduct?.id)
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group key="total_price">
            <Form.Label>total_price</Form.Label>
            <Form.Control
              type="number"
              name="total_price"
              value={totalPrice}
              disabled
            />
          </Form.Group>
          {/* ... (rest of your JSX) */}
        </div>
      </div>
    </>
  );
};

export default Add;