import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './product.css'
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";

const columns = [
  {
    field: 'product_name',
    headerName: 'product_name',
    type: 'text',
    required: true
  },
    {
    field: 'kind_of_product',
    headerName: 'kind_of_product',
    type: 'text',
    required: true
  },
{
    field: 'measurement_units',
    headerName: 'measurement_units',
    type: 'text',
    required: true
  },

  {
    field: 'home_price',
    headerName: 'home_price',
    type: 'number',
    required: true
  },
    {
    field: 'out_price',
    headerName: 'out_price',
    type: 'number',
    required: true
  },
];
    
const Product = () => {

  const[product,setProduct]= useState([])
  const [open, setOpen] = useState(false);
    
  const handleAddUserClick = () => {
      console.log("object");
      setOpen(true);
    };

  const handleCloseAddUser = () => {
      console.log("not object");
      setOpen(false);
    };
    
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


console.log(product);




  return (
     <div className="products" >
      <div className="info">
        <h1>Products</h1>
        <button className="btn btn-primary" onClick={handleAddUserClick}>Add New Product</button>
      </div>
      <DataTable first="products" />
      {open &&<Add name= 'products' columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Product