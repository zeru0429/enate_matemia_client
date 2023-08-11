import { useState } from "react";
import "./user.css";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { Container } from 'react-bootstrap'
const columns = [
  {
    field: 'f_name',
    headerName: 'First Name',
    type: 'text',
    required: true
  },
  {
    field: 'm_name',
    headerName: 'Middle Name',
    type: 'text',
    required: true
  },
  {
    field: 'l_name',
    headerName: 'Last Name',
    type: 'text',
    required: true
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    type: 'number',
    required: true
  },
  {
    field: 'role',
    headerName: 'Role',
    type: 'select',
    options: [
      { label: 'Guest', value: 'guest' },
      { label: 'super', value: 'super' },
      { label: 'casher', value: 'casher' },
      { label: 'operator', value: 'operator' },
    ],
    required: true
  },
  {
    field: 'username',
    headerName: 'Username',
    type: 'text',
    required: true
  },

  {
    field: 'password',
    headerName: 'password',
    type: 'password',
    required: true
  },
  {
    field: 'c_password',
    headerName: 'confirm password',
    type: 'password',
    required: true
  },
      {
    field: 'profile',
    headerName: 'Image',
    type: 'image',
    required: true
  }

];

const Users = () => {
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
    <Container>
    <div className="users container ms-0 mr-0 mt-auto mb-auto Container" >
      <div className="info Container">
        <h1>Users</h1>
        <button className="btn btn-primary" onClick={handleAddUserClick}>Add New User</button>
      </div>
      <DataTable first="users" />
      {open &&<Add name= 'users' columns={columns} setOpen={setOpen} />}
      </div>
      </Container>
  );
};

export default Users;

