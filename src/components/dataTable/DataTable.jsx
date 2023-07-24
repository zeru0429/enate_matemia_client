import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Container } from '@mui/material';

export default function DataTable({first}) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8100/${first}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = user.length > 0 ? Object.keys(user[0]).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    width: 130,
  })) : [];

  const rows = user.map((us) => ({
    ...us,
  }));

  return (
    <Container>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>
    </Container>
  );
}