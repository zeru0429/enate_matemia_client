import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample(props) {
  useEffect(() => {
    //console.log(props.image_url);
  },[])
  return (
    <div className='container center col-4'>
      <Card style={{ width: '12rem' }}>
        <Card.Img variant="top" src={props.image_url} alt='logo' />
        <Card.Body className='m-0'>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.kind_of_product}
          </Card.Text>
          <Card.Text>
            {props.measurement_units}
          </Card.Text>
          <Card.Text>
             {props.home_price}
           </Card.Text>
          <Card.Text>
            {props.out_price}
          </Card.Text>
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


            /* 
            {props.kind_of_product}
            {props.measurement_units}
            {props.home_price}
              {props.out_price}
            {props.description}
                kind_of_product={item.kind_of_product}
                measurement_units={measurement_units}
                home_price={home_price}
                out_price={out_price}
                description={item.date_of_update}
            
            
            
            
            */