import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import './price.css'
import BorderExample from '../../components/card/BorderExample'
import BasicExample from '../../components/card/BasicExample'
import { Container, Row, Col } from 'react-bootstrap';
import { imageserver,server } from '../../constants'
const Price = () => {
  const[product,setProduct]= useState([])
  
  useEffect(() => {
  // console.log(`${myGlobalVariable}price`);
    fetchData();
  }, []);

  const fetchData = async () => {
   // console.log(`http://localhost:8100/products`);
    try {
      const response = await axios.get(`${server}price`);
      // console.log(`${myGlobalVariable}price`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  
    //console.log(product);
 return (
    <Container className='d-flex justify-content-center align-items-center ms-0 mr-0 mt-auto mb-auto '>
      <Row>
        {product.map((item) => (
          <Col key={item.id} md={4} className='mb-4'>
            <div className='product-card'>
              <BasicExample
                image_url={`${imageserver}${item.image_url}`}
                title={item.product_name}
                description={item.date_of_update}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
  
  
  } 
        

export default Price