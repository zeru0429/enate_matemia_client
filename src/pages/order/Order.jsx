import React,{ useState } from 'react'
import NavTabsExample from './NavTabsExample'
import Datatable from '../../components/dataTable/DataTable'
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
    <div className='container'>
      <div className="container m-5">
        <button className='btn btn-primary'> Add new order </button>
      </div>
      <Datatable first='orders'/>
     
    </div>
  )
}

export default Order