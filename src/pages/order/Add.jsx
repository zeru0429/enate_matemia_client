import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import AlertExample from '../../components/other/Alert';
import { server, imageserver } from '../../constants';
const Add = (props) => {
  const { selectedProduct, selectedKind, totalPrice, handleProductChange, handleKindChange } = props;
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  let cout = 3;
  useEffect(() => {
    // Set default values for input fields
    const defaultValues = {};
    props.columns.forEach((column) => {
      defaultValues[column.field] = column.defaultValue || '';
    });
    setForm(defaultValues);
  }, [props.columns]);

 
  const setField = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prevForm) => ({
      ...prevForm,
      profile: file,
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
          <AlertExample message={`Successfully Added`} variant='success' />;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(errors);
  };

  const validateForm = () => {
    let isValid = true;
    // Add your validation logic here
    return isValid;
  };

 

  return (
    <>
      <div className="add">
        <div className="modal1">
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
          {props.columns.map((column) => ({if(cout>=0) continue; } 
            
              <Form.Group key={column.field}>
                <Form.Label>{column.headerName}</Form.Label>
                {column.type === 'select' && (
                  <Form.Control
                    required
                    as="select"
                    name={column.field}
                    value={form[column.field] || ''}
                    onChange={(e) => setField(column.field, e.target.value)}
                  >
                    <option value="">None</option>
                    {column.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                )}
                {column.type === 'image' && (
                  <Form.Control
                    type="file"
                    name={column.field}
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                    isInvalid={!!errors[column.field]}
                    required={column.required}
                  />
                )}
                {column.type !== 'select' && column.type !== 'image' && (
                  <Form.Control
                    type={column.type}
                    name={column.field}
                    placeholder={column.field}
                    value={form[column.field] || ''}
                    onChange={(e) => setField(column.field, e.target.value)}
                    isInvalid={!!errors[column.field]}
                    required={column.required}
                  />
                )}
                {errors[column.field] && (
                  <Form.Control.Feedback type="invalid">
                    {errors[column.field]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            ))}
        </div>
      </div>
    </>
  );
};

export default Add;
