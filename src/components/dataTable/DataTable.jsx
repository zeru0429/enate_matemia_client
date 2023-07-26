import React, { useEffect, useState } from 'react';
import {  DataGrid,
  GridColDef,
  GridToolbar, } from '@mui/x-data-grid';

import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';
import { saveAs } from 'file-saver';
import { useReactToPrint } from 'react-to-print';
import './dataTable.css'; // add the CSS file
import Button2 from 'react-bootstrap/Button';





export default function DataTable({first, name}) {
  const [user, setUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const componentRef = React.useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8100/${first}`);
      setUser(response.data);
      setFilteredUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = user.length > 0 ? Object.keys(user[0]).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    width: 1000/user.length,
  })) : [];

  const rows = filteredUser.map((us) => ({
    ...us,
    
  }));


  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const results = user.filter((row) => {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(keyword)
      );
    });
    setFilteredUser(results);
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," + columns.map((column) => column.headerName).join(",") + "\n" +
      filteredUser.map((row) => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${name}.csv`);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  

 

  return (
    
      <Container>
        <div className='d-flex align-items-right mb-3'>
         <Button2 className='mr-2' variant="outline-primary" onClick={handleDownload}>Download</Button2>{' '}          
          <Button2 variant="outline-warning" onClick={handlePrint}>Print</Button2>{' '}
        </div>

        <div  ref={componentRef}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 6,
                },
              },
            }}
            getRowId={(row) => row.id}
            slots={{toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 300 },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            disableColumnSelector
            className="dataTable" // add the class name
            
          />
        </div>
      </Container>
    
  );
}