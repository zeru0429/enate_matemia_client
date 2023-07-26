import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import BorderExample from '../../components/card/BorderExample'
import BasicExample from '../../components/card/BasicExample'

const Price = () => {
  const[product,setProduct]= useState([])
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8100/products`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  
    
  return (  
    <div className='container d-flex m-5 col-12'>
      {product.map((item) => {
        console.log(item);
        return (
          <div key={item.product_id} className='row'>
            <div className='col-4'>
            <BasicExample title={item.product_name} description={item.date_of_update}/>
            </div>
          </div>
        );
      })}
    </div> 
  );
  
  
  } 
        

export default Price