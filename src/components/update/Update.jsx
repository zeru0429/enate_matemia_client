import React, { useState } from 'react';
import axios from 'axios';
import './update.css';
import { Form, Button } from 'react-bootstrap';
import { server,imageserver } from '../../constants'
const Update = (props) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(form);
      axios
        .post(`${server}addNewUser/`, {
          form
        })
        .then((response) => {
          console.log(response.data);
          props.onUpdateSuccess(); // call the callback function to hide the Update component and show the Show component
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(errors);
  };

  // validation code...
  const validateForm = () => {
    let isValid = true;
    const nameRegex = /^[a-zA-Z ]+$/
    const phoeRegx = /^09[0-9]{8}$/
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  
    // Validate first name
    if (!form.phone || !phoeRegx.test(form.phone)) {
      setErrors({
        ...errors,
        phone: 'Please enter a valid Ethiopian number'
      });
      isValid = false;
    }
   
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
    <div className="show1">
      <div className="modal1">
        <span className="close" onClick={() => {props.setOpen(false)}}>
          X
        </span>
        { console.log(props)}
        <h1>Update {props.name}</h1>
        <Form onSubmit={handleSubmit}>
          {Object.entries(props.columns).map(([key, value]) => ( 
            
        <Form.Group className="d-flex m-0 p-0" key={key} controlId={key}>
              <Form.Label className='col-3' >{value[0]}</Form.Label>
              <Form.Control
                className='col-1 '
                type="text"
                value={value[1] || ''}
                onChange={(e) => setField(key, e.target.value)}
              />
              {errors[key] && (
                <Form.Text className="text-danger">{errors[key]}</Form.Text>
              )}
            </Form.Group>
          ))}
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default Update;
