import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import stiker from '../../resources/images/nick-nice-DZ2-BRLtMhg-unsplash.jpg';
import { Container } from 'react-bootstrap';


function BasicExample(props) {
  return (
    <div className='container center col-4'>
    <Card style={{ width: '12rem' }} >
      <Card.Img variant="top" src={stiker} alt='logo' />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    </div>
  );
}

export default BasicExample;