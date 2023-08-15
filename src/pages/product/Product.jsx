import React, { useState } from 'react'
import './product.css'
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import AdminPanal from './AdminPanel'
import AddOrder from './AddOrder'

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
    type: 'select',
    options: [
      { label: 'Normal', value: 'Normal' },
      { label: 'Reflective', value: 'Reflective' },
    ],
    required: true
  },
   {
    field: 'measurement_units',
    headerName: 'measurement_units',
    type: 'select',
    options: [
      { label: 'kare', value: 'kare' },
      { label: 'meter', value: 'meter' },
       { label: 'number', value: 'number' },
    ],
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
  {
    field: 'profile',
    headerName: 'Image',
    type: 'image',
    required: true
  }
];
    
const Product = () => {
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
    
  const handleAddUserClick = () => {
      console.log("object");
      setOpen(true);
    };

  const handleCloseAddUser = () => {
      console.log("not object");
      setOpen(false);
    };
    

  return (
     <div className="products container center" >
      <div className="info">
        <h1 className=''>Products</h1>
        <button className="btn btn-primary" onClick={handleAddUserClick}>Add New Product</button>
      </div>
      
      <DataTable first="products" />
      {open && <Add name='products' columns={columns} setOpen={setOpen} />}
      {/* <AdminPanal /> */}
      {/* <AddOrder />  */}
    </div>
  )
}

export default Product