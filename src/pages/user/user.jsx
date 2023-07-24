import Datatable from '../../components/dataTable/DataTable'
import "./user.css";

const Users = () => {
  

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button >Add New User</button>
      </div>
      <Datatable first='users'/>
      
    </div>
  );
};

export default Users;
