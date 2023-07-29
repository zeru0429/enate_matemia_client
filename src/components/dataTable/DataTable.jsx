import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from '@mui/x-data-grid';
import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';
import { saveAs } from 'file-saver';
import { useReactToPrint } from 'react-to-print';
import './dataTable.css'; // add the CSS file
import Button2 from 'react-bootstrap/Button';

//component
import SinglePage from '../singlePage/SinglePage';
import { redirect } from 'react-router-dom';
import Add from "../../components/add/Add";
import Show from "../../components/add/Show";

export default function DataTable({ first, name }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const componentRef = React.useRef(null);
  const [deleted, setDeleted] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null); // State to hold the single-clicked row data

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

  // columns define for table
  const columns = user.length > 0
    ? Object.keys(user[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        flex: 1, // set the flex property of each column to 1
      }))
    : [];

  // action column definition with view and delete functionality
  const actionColumn = {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => {
      const onClickView = () => {
        setSelectedRowData(params.row); // Set the selectedRowData state to the clicked row data
        handleAddUserClick(); // Open the Show component
      };

      const onClickDelete = () => {
        handleDelete(`${params.row.id}`);
      };

      return (
        <div className="cellAction d-block">
          <div className="viewButton btn btn-secondary" onClick={onClickView}>
            View
          </div>
          <div className="deleteButton btn btn-danger" onClick={onClickDelete}>
            Delete
          </div>
        </div>
      );
    },
  };

  //row data define for table
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
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      columns.map((column) => column.headerName).join(',') +
      '\n' +
      filteredUser.map((row) => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${name}.csv`);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  useEffect(() => {
    if (deleted) {
      window.location.reload();
    }
  }, [deleted]);

  const handleAddUserClick = () => {
    setOpen(true);
  };

  const handleCloseAddUser = () => {
    setOpen(false);
  };

  return (
    <Container>
      <div className="d-flex align-items-right mb-3">
        <Button2
          className="mr-2"
          variant="outline-primary"
          onClick={handleDownload}
        >
          Download
        </Button2>
        <Button2 variant="outline-warning" onClick={handlePrint}>
          Print
        </Button2>
      </div>

      <div ref={componentRef}>
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          autoHeight // set the autoHeight prop to true
          columnBuffer={0} // set the columnBuffer prop to 0
          getRowId={(row) => row.id}
          slots={{ toolbar: GridToolbar }}
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
        {open && (
          // Pass the necessary props to the Show component
          <Show name={name} columns={columns} setOpen={setOpen} rowData={selectedRowData} />
        )}
      </div>
    </Container>
  );
}
