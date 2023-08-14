import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { imageserver,server } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from "../../utility/stateprovider";
const Login = () => {
  const [{user,role }, dispatch] = useStateValue();
  const [form, setForm] = useState({});
  const [errors, setError] = useState({});
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field]) {
      setError({
        ...errors,
        [field]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(`${server}login`,form);
        const data = response.data;
        console.log(response);
        if (data.status === 'success') {
          console.log(data);
          
          navigate('/');
          // TODO: Store user authentication token in local storage or session storage
        } else {
          alert(data.message)
          // Authentication failed
          console.log('Authentication failed:', data.message);
          if (data.message =="Invalid username [user not exist]") {
              setError({
                  ...errors,
                  username: data.message,
                });
          }
          else { 
               setError({
            ...errors,
            pass: data.message,
          });
          }
       

        }
      } catch (error) {
      console.log('Error authenticating user:', error.message);
      setError({
        ...errors,
        pass: 'Network Error: Unable to reach the server',
      });
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    // const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // // Validate username
    // if (!form.username) {
    //   setError({
    //     ...errors,
    //     username: 'Please enter a username',
    //   });
    //   isValid = false;
    // }

    // // Validate password
    // if (!form.pass || !passRegex.test(form.pass)) {
    //   setError({
    //     ...errors,
    //     pass: 'Password must be at least 8 characters with uppercase, lowercase, digit, and special character',
    //   });
    //   isValid = false;
    // }

    return isValid;
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const checkLoginStatus = async () => {
      //console.log(`${server}logincheck`);
      axios.get(`${server}logincheck`)
        .then((response) => { 
          if (response.data.status == 'success') {
            setAuth(true)
            
            dispatch({
            type: "SET_USER",
              user: response.data.username,
              role: response.data.role
        });
             navigate('/')
          }
          else { 
             setAuth(false) 
            setMessage(response.data.message)
          
          }
        })
    };

    checkLoginStatus();
  }, [navigate]);

  return (
    <Container style={{ maxWidth: '50vh' }} className="d-flex mt-3 justify-content-center align-items-center vh-50">
      <main className="form-signin">
        <Form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <img className="mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          </div>

          <Form.Group className="mb-4" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              required
              value={form.username || ''}
              onChange={(e) => setField('username', e.target.value)}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid" style={{ maxWidth: '300px' }}>
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Password"
              value={form.pass || ''}
              onChange={(e) => setField('pass', e.target.value)}
              isInvalid={!!errors.pass}
            />
            <Form.Control.Feedback type="invalid" style={{ maxWidth: '300px' }}>
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
