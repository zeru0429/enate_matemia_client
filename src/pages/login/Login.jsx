import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [form, setForm] = useState({});
  const [errors, setError] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });

    if (!!errors[field]) {
      setError({
        ...errors,
        [field]: null
      });
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  
    // Validate email
    if (!form.email || !emailRegex.test(form.email)) {
      setError({
        ...errors,
        email: 'Please enter a valid email address'
      });
      isValid = false;
    }
  
    // Validate password
    if (!form.pass || !passRegex.test(form.pass)) {
      setError({
        ...errors,
        pass: "Password must be at least 8 characters with uppercase, lowercase, digit, and special character"
      });
      isValid = false;
    }
  
    return isValid;
  };

  return (
    <Container style={{ maxWidth: '50vh' }} className="d-flex mt-3 justify-content-center align-items-center vh-50">
      <main className="form-signin">
        <Form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <img className="mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          </div>

          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
              required
              value={form.email || ''}
              onChange={(e) => setField('email', e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid' style={{ maxWidth: '300px' }}>
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required placeholder="Password"
              value={form.pass || ''}
              onChange={(e) => setField('pass', e.target.value)}
              isInvalid={!!errors.pass}
            />
            <Form.Control.Feedback type='invalid' style={{ maxWidth: '300px' }} >
              {errors.pass}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-4">
            Sign in
          </Button>
        </Form>
      </main>
    </Container>
  );
};

export default Login;