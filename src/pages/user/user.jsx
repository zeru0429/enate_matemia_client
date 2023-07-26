import { useState } from "react";
import "./user.css";
import DataTable from "../../components/dataTable/DataTable";
import AddUser from "../../components/add/Add";
import { userRows } from "../../components/data";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  const handleAddUserClick = () => {
    setOpen(true);
  };

  const handleCloseAddUser = () => {
    setOpen(false);
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={handleAddUserClick}>Add New User</button>
      </div>
      <DataTable first="users" columns={columns} rows={userRows} />
      {open && <AddUser handleClose={handleCloseAddUser} />}
    </div>
  );
};

export default Users;