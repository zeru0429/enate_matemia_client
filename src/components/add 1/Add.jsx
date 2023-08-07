import React, { useState } from 'react';
import axios from 'axios';
import './add.css';
import { Form, Button } from 'react-bootstrap';
import { myGlobalVariable } from '../../constants';
import AlertExample from '../other/Alert'
const Add = (props) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

const setField = (field, value) => {
  // Check if the field is disabled
  const disabled = props.columns.find((column) => column.field === field)?.disable;
  if (disabled) {
    return;
  }

  setForm({
    ...form,
    [field]: value
  });
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      profile: file
    });
  };

  const handleSubmit = (e) => {
    console.log(form);
    console.log(`http://localhost:8100/addNew${props.name}/`);
    e.preventDefault();
    if (validateForm()) {  
      
      axios
        .post(`http://localhost:8100/addNew${props.name}/`, form)
        .then((response) => {
          
          // { props.setOpen(false) }
          // <AlertExample message={`succesfully Added `} variant='success' />
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
    return isValid;
  }

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
                    disabled={column.disable}
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