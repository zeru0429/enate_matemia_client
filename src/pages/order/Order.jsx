import React,{ useState } from 'react'
import Datatable from '../../components/dataTable/DataTable'
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

];


const Order = () => {
  const [open, setOpen] = useState(false);

  const handleAddUserClick = () => {
    console.log("object");
    setOpen(true);
  };

  const handleCloseAddUser = () => {
    console.log("not object");
    setOpen(false);
  };



  return (
    <div className='products container'>
      <div className="info center">
        <h1>Orders</h1>
        <button className='btn btn-primary' onClick={handleAddUserClick}> Add new order </button>
      </div>
      <Datatable first='orders'/>
     {open &&<Add name= 'Order' columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Order