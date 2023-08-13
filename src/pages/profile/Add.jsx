import React, { useState } from 'react';
import axios from 'axios';
import './add.css';
import { Form, Button } from 'react-bootstrap';
import { imageserver,server } from '../../constants';
import { useStateValue } from "../../utility/stateprovider";

const Add = (props) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
 const [{ user ,role}, dispatch] = useStateValue();
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(form);
      axios
        .post(`${server}addNew${props.name}/`, [form,user,role])
        .then((response) => {
          alert("pass word changed successfully ");
         // console.log(response);
          props.setOpen(false);
         
        })
        .catch((error) => {
          alert(error)
          console.log(error);
         
        });
    }
    console.log(errors);
  };

  const validateForm = () => {
    let isValid = true;
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
                <Form.Label>{column.headerName}</Form.Label>
                {column.type === 'image' ? (
                  <Form.Control
                    type="file"
                    name={column.field}
                    accept="image/jpeg, image/png"
                    onChange={(e) => setField(column.field, e.target.files[0])}
                    isInvalid={!!errors[column.field]}
                    required={column.required}
                  />
                ) : (
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