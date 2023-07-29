import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Person2SharpIcon from '@mui/icons-material/Person2Sharp';

function Footer() {
  return (
    <Navbar bg="light" variant="light" className="fixed-bottom mt-5">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="#">About Us</Nav.Link>
          <Nav.Link href="#">Contact Us</Nav.Link>
          <Nav.Link href="#">Terms & Conditions</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#">
            <Person2SharpIcon />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;