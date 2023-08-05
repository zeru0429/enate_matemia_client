import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample(props) {
  return (
    <div className='container center col-4'>
      <Card style={{ width: '12rem' }}>
        {console.log(props.image_url)}
        <Card.Img variant="top" src={props.image_url} alt='logo' />
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