import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Datatable from '../../components/dataTable/DataTable'
import Add from "../../components/add/Add";
import AddOrder from "../../components/add/AddOrder";
const Order = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8100/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
}, []);






  const handleAddUserClick = () => {
    setOpen(true);
  };

  const handleCloseAddUser = () => {
    setOpen(false);
  };


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
    field: 'type_of_order',
    headerName: 'type_of_order',
    type: 'select',
    options: [
      { label: 'printing', value: 'printing' },
      { label: 'home_made', value: 'home_made' },
    ],
    required: true
  },
  {
    field: 'state_of_order',
    headerName: 'state_of_order',
    type: 'select',
    options: [
      { label: 'normal', value: 'normal' },
      { label: 'urgent', value: 'urgent' },
    ],
    required: true
  },
    {
    field: 'amount',
    headerName: 'amount',
    type: 'number',
    required: true
  },
    {
    field: 'paid_price',
    headerName: 'paid_price',
    type: 'number',
    required: true
  },
     {
    field: 'total_price',
    headerName: 'total_price',
    type: 'number',
       required: true,
       disable: true,
  },
    {
    field: 'fullname',
    headerName: 'fullname',
    type: 'text',
    required: true
  },
       {
    field: 'phone',
    headerName: 'phone',
    type: 'text',
    required: true
  },

];


 console.log(products);
  return (
    <div className='products container'>
      <div className="info center">
        <h1>Orders</h1>
        <button className='btn btn-primary' onClick={handleAddUserClick}> Add new order </button>
      </div>
      <Datatable first='orders'/>
     {open &&<AddOrder name= 'Order' columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Order