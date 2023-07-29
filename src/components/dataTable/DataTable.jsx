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
const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  //fetch data from db and show to in table
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8100/${first}`);
      setUser(response.data);
      setFilteredUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // columns define for table
  const columns = user.length > 0 ? Object.keys(user[0]).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
   width: 600/user.length,
  })) : [];

// action column definition with view and delete functionality
const actionColumn = {
  field: 'action',
  headerName: 'Action',
  width: 200,
  renderCell: (params) => {
    const onClickView = () => {
      
      alert(`View row ${params.row.id}`);
      
    };

    const onClickDelete = () => {
     handleDelete(`${params.row.id}`)
        // alert(`delete row ${params.row.id}`);
    };

    return (
      <div className="cellAction d-block">
        <div className="viewButton  btn btn-secondary" onClick={onClickView}>View</div>
        <div className="deleteButton btn btn-danger" onClick={onClickDelete}>Delete</div>
      </div>
    );
  },
};

  //row data define for table
  const rows = filteredUser.map((us) => ({
    ...us,
    
  }));

//  search hundler for search input
  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const results = user.filter((row) => {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(keyword)
      );
    });
    setFilteredUser(results);
  };
//download functionality 
  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," + columns.map((column) => column.headerName).join(",") + "\n" +
      filteredUser.map((row) => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${name}.csv`);
  };
// print functionality
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  
  //delete from database using axios
const handleDelete = (idnum) => {
  axios
    .delete(`http://localhost:8100/deleteUser/${idnum}`)
    .then((response) => {
      console.log(response.data);
      setDeleted(true); // update the deleted state
    })
    .catch((error) => {
      console.error(error);
    });
};

// add the following useEffect hook to refresh the page when the deleted state changes
useEffect(() => {
  if (deleted) {
    window.location.reload();
  }
}, [deleted]);



  

  return (
    
      <Container>
        <div className='d-flex align-items-right mb-3'>
         <Button2 className='mr-2' variant="outline-primary" onClick={handleDownload}>Download</Button2>{' '}          
          <Button2 variant="outline-warning" onClick={handlePrint}>Print</Button2>{' '}
        </div>

        <div  ref={componentRef}>
          <DataGrid
            rows={rows}
            columns={columns.concat(actionColumn)}
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