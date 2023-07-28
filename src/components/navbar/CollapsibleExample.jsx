import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//mui icons
import Person2SharpIcon from '@mui/icons-material/Person2Sharp';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import {Link} from 'react-router-dom'
function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">እናት ማተሚያ ቤት</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/product">Product</Nav.Link>
             <Nav.Link href="/price">Pricing</Nav.Link>
             <Nav.Link href="/order">Orders</Nav.Link>
             <Nav.Link href="/user">users</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="#memes">
              <ModeNightOutlinedIcon />
              <LightModeOutlinedIcon />
            </Nav.Link>
          </Nav>
          <NavDropdown title={<Person2SharpIcon />} id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Setting</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Status</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;