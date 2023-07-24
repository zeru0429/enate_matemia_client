import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import stiker from '../../resources/images/nick-nice-DZ2-BRLtMhg-unsplash.jpg';


function BasicExample(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={stiker} alt='logo' />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default BasicExample;