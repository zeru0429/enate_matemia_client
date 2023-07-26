import React, { useState } from 'react';
import './add.css';
import { Form, Button } from 'react-bootstrap';

const Add = (props) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

 const setField = (field, value) => {
  console.log(value);
  setForm({
    ...form,
    [field]: value
  });

  const regex = /^[a-zA-Z ]+$/; // regex for name fields
  const phoneRegex = /^\+251\d{9}$/; // regex for phone number field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex for email field
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // regex for password field

  // Validate input fields
  if (field === 'f_name' || field === 'm_name' || field === 'l_name') { // validate name fields
    if (!value || !regex.test(value)) {
      setErrors(errors => ({
        ...errors,
        [field]: `Please enter a valid ${field === 'f_name' ? 'first' : field === 'm_name' ? 'middle' : 'last'} name`
      }));
    } else {
      setErrors(errors => ({
        ...errors,
        [field]: null
      }));
    }
  } else if (field === 'phone') { // validate phone number field
    if (!value || !phoneRegex.test(value)) {
      setErrors(errors => ({
        ...errors,
        [field]: 'Please enter a valid Ethiopian phone number (+251)'
      }));
    } else {
      setErrors(errors => ({
        ...errors,
        [field]: null
      }));
    }
  } else if (field === 'email') { // validate email field
    if (!value || !emailRegex.test(value)) {
      setErrors(errors => ({
        ...errors,
        [field]: 'Please enter a valid email address'
      }));
    } else {
      setErrors(errors => ({
        ...errors,
        [field]: null
      }));
    }
  } else if (field === 'password' || field === 'c_password') { // validate password fields
    if (!value || !passRegex.test(value)) {
      setErrors(errors => ({
        ...errors,
        [field]: 'Password must be at least 8 characters with uppercase, lowercase, digit, and special character'
      }));
    } else {
      setErrors(errors => ({
        ...errors,
        [field]: null
      }));
    }
  } else { // for all other fields
    if (!value) {
      setErrors(errors => ({
        ...errors,
        [field]: `Please enter a valid ${field}`
      }));
    } else {
      setErrors(errors => ({
        ...errors,
        [field]: null
      }));
    }
  }
};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(form);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const nameRegex = /^[a-zA-Z ]+$/
    const phoneRegex = /^09\d{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  
    // Validate first name
    if (!form.f_name || !nameRegex.test(form.f_name)) {
      setErrors({
        ...errors,
        f_name: 'Please enter a valid first name'
      });
      isValid = false;
    }
  
    // Validate middle name
    if (!form.m_name || !nameRegex.test(form.m_name)) {
      setErrors({
        ...errors,
        m_name: 'Please enter a valid middle name'
      });
      isValid = false;
    }
  
    // Validate last name
    if (!form.l_name || !nameRegex.test(form.l_name)) {
      setErrors({
        ...errors,
        l_name: 'Please enter a valid last name'
      });
      isValid = false;
    }
  
    // Validate phone number
    if (!form.phone || !phoneRegex.test(form.phone)) {
      setErrors({
        ...errors,
        phone: 'Please enter a valid Ethiopian number (09)'
      });
      isValid = false;
    }
  
    // Validate profile picture
    if (!form.profile) {
      setErrors({
        ...errors,
        profile: 'Please upload a profile picture'
      });
      isValid = false;
    }
  
    // Validate role
    if (!form.role) {
      setErrors({
        ...errors,
        role: 'Please select a role'
      });
      isValid = false;
    }
  
    // Validate username
    if (!form.username) {
      setErrors({
        ...errors,
        username: 'Please enter a username'
      });
      isValid = false;
    }
  
    // Validate email
    if (!form.email || !emailRegex.test(form.email)) {
      setErrors({
        ...errors,
        email: 'Please enter a valid email address'
      });
      isValid = false;
    }
  
    // Validate password
    if (!form.password || !passRegex.test(form.password)) {
      setErrors({
        ...errors,
        password: 'Password must be at least 8 characters with uppercase, lowercase, digit, and special character'
      });
      isValid = false;
    }
  
    // Validate password confirmation
    if (form.password !== form.c_password) {
      setErrors({
        ...errors,
        c_password: 'Passwords do not match'
      });
      isValid = false;
    }
  
    return isValid;
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
                {column.type !== 'select' && (
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
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Add;