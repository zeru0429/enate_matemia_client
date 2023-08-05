import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import BorderExample from '../../components/card/BorderExample'
import BasicExample from '../../components/card/BasicExample'
import { myGlobalVariable } from '../../constants'
const Price = () => {
  const[product,setProduct]= useState([])
  
  useEffect(() => {
   console.log(`${myGlobalVariable}price`);
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log(`http://localhost:8100/products`);
    try {
      const response = await axios.get(`${myGlobalVariable}price`);
      // console.log(`${myGlobalVariable}price`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  
    
  return (  
    <div className='container d-flex m-5 col-12'>
      {product.map((item) => {
        return (
          <div key={item.id} className='row'>
            <div className='col-4'>
            <BasicExample image_url={`http://localhost:8100/${item.image_url}`} title={item.product_name} description={item.date_of_update}/>
            </div>
          </div>
        );
      })}
    </div> 
  );
  
  
  } 
        

export default Price