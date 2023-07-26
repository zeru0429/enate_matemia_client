import React, { useState } from 'react';
import './add.css';
import { Form, Button } from 'react-bootstrap';

const Add = (props) => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateFormData(formData);
    if (Object.keys(errors).length === 0) {
      props.setOpen(false);
      console.log(formData);
    } else {
      setFormErrors(errors);
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    props.columns.forEach((column) => {
      if (column.required && !data[column.field]) {
        errors[column.field] = `${column.headerName} is required`;
      }
      if (column.type === 'email' && data[column.field] && !isValidEmail(data[column.field])) {
        errors[column.field] = 'Invalid email address';
      }
      // Add more validation rules as needed
    });
    return errors;
  };

  const isValidEmail = (email) => {
    // Use a regular expression to validate email address format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="add">
        <div className="modal1">
          <span className="close" onClick={() => {props.setOpen(false)}}>
            X
          </span>

          <h1>Add new {props.name}</h1>

          <Form onSubmit={handleSubmit}>
            {props.columns.map((column) => (
              <Form.Group key={column.field}>
                <Form.Label >{column.headerName}</Form.Label>
                {column.type === 'select' && (
                  <Form.Control
                    as="select"
                    name={column.field}
                    value={formData[column.field] || ''}
                    onChange={handleChange}
                  >
                    <option value="">None</option>
                    {column.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                )}
                {column.type !== 'select' && (
                  <Form.Control
                    type={column.type}
                    name={column.field}
                    placeholder={column.field}
                    value={formData[column.field] || ''}
                    onChange={handleChange}
                    isInvalid={Boolean(formErrors[column.field])}
                    required={column.required}
                  />
                )}
                {formErrors[column.field] && (
                  <Form.Control.Feedback type="invalid">
                    {formErrors[column.field]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            ))}
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Add;