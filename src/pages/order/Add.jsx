import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import AlertExample from '../../components/other/Alert';
import { server, imageserver } from '../../constants';
const Add = (props) => {
  const { selectedProduct, selectedKind,amount,remain_price,paid_price, totalPrice,state_of_order,phone, handleProductChange, handleKindChange,full_name } = props;
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
    <div className="add container">
          <div className="modal1">
            <span className="close" onClick={() => {props.setOpen(false)}}>
            X
          </span>
            <h1>new {props.name}</h1>
      <Form onSubmit={handleSubmit}>
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
         <Form.Group key="type_of_order">
          <Form.Label>type_of_order</Form.Label>
          <Form.Control
            required
            as="select"
            name="type_of_order"
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
        <Form.Group key="state_of_order">
          <Form.Label>state_of_order</Form.Label>
          <Form.Control
            required
            as="select"
            name="state_of_order"
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
        <Form.Group key="amount">
          <Form.Label>amount</Form.Label>
              <Form.Control
            placeholder='amount'
            type="number"
            name="amount"
            value={amount}
          />
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
        <Form.Group key="paid_price">
          <Form.Label>paid_price</Form.Label>
          <Form.Control
            type="number"
            placeholder='paid_price'
            name="paid_price"
            value={paid_price}
          />
        </Form.Group>
        <Form.Group key="remain_price">
          <Form.Label>remain_price</Form.Label>
          <Form.Control
            type="number"
            placeholder='remain_price'
            name="remain_price"
            value={remain_price}
            disabled='true'
          />
        </Form.Group>
        <Form.Group key="full_name">
          <Form.Label>full_name</Form.Label>
          <Form.Control
                type="text"
                placeholder='full_name'
            name="full_name"
            value={full_name}
          />
        </Form.Group>
        <Form.Group key="phone">
          <Form.Label>phone</Form.Label>
          <Form.Control
                type="text"
                placeholder='phone'
            name="phone"
            value={phone}
          />
        </Form.Group>
        <Form.Group className="item">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </Form.Group>
      </Form>
      </div>
    </div>
  </>
);
}
export default Add;
