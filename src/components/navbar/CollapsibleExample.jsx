import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import Person2SharpIcon from '@mui/icons-material/Person2Sharp';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
//import { getUserRole } from "../../UserService";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateValue } from "../../utility/stateprovider";
import { server} from '../../constants'
function CollapsibleExample() {
  const navigate = useNavigate();
   const [{user,role}, dispatch] = useStateValue();
  useEffect(() => { 
    if (!user) { 
      navigate('/login') 
    }
    // !user ? navigate('/login') : user.username
  },[])


  const handlelogout = () => { 
    console.log("logout");
     axios.defaults.withCredentials = true;
    axios.get(`${server}logout`)
      .then((response) => { 
        if (response.data.status === 'success') { 
          dispatch({
            type: "SET_USER",
            user: null, 
        });
          navigate('/login')
          //location.reload(true);
        }
        else {
          alert("error")
        }
        
          

      }).catch((error) => { 
        console.log(error);
      })
  }


  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">እናት ማተሚያ ቤት</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {(role ==='super' || role ==='admin'  )&&<Nav.Link as={Link} to="/product">Product</Nav.Link>}
            <Nav.Link as={Link} to="/price">Pricing</Nav.Link>
            {(role ==='super' || role ==='casher'  )&&<Nav.Link as={Link} to="/order">Orders</Nav.Link>}
            {(role ==='super' || role ==='operator'  )&&<Nav.Link as={Link} to="/not-completed-oreder">Not Completed Order</Nav.Link>}
            {(role ==='super' || role ==='operator' || role ==='casher'  )&&<Nav.Link as={Link} to="/completed-oreder">Completed Order</Nav.Link>}
            {(role ==='super' || role ==='admin'  )&&<Nav.Link as={Link} to="/user">Users</Nav.Link>}
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="#memes">
              <LightModeOutlinedIcon />
              <ModeNightOutlinedIcon />
              
            </Nav.Link>
          </Nav>
           {user}
          <NavDropdown title={<Person2SharpIcon />}  id="collasible-nav-dropdown">
          <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/status">Status</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4" onClick={ handlelogout} >Logout</NavDropdown.Item>
         </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;