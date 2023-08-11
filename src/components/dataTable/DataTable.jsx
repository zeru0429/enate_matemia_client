import React, { useEffect, useState, useRef } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';
import { saveAs } from 'file-saver';
import { useReactToPrint } from 'react-to-print';
import './dataTable.css'; // add the CSS file
import Button2 from 'react-bootstrap/Button';
import SinglePage from '../singlePage/SinglePage';
import { redirect } from 'react-router-dom';
import Add from "../../components/add/Add";
import Show from "../../components/add/Show";
import { server ,imageserver} from '../../constants';
import AlertComponent from '../alert/AlertComponent';
export default function DataTable({ first, name }) {
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const componentRef = useRef(null);
  const [deleted, setDeleted] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null); // State to hold the single-clicked row data
  let [alertdata, setAlertdata] = useState({});
  useEffect(() => {
    fetchData();
  }, []);


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


  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}${first}`);
      setUser(response.data);
      setFilteredUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleDelete = (id) => {
  // console.log(`http://localhost:8100/delete${first}/${id}`);
    axios
      .delete(`http://localhost:8100/delete${first}/${id}`)
      .then((response) => {
        alert(response.data)

        // setAlertdata = {
        //   message: response.data,
        //   color: 'success'
        // }
        
         
      })  
      .catch((error) => {
        alert(error)
        //   setAlertdata = {
        //   message: error,
        //   color: 'success'
        // }
        console.error(error);
      });
  };

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      setReload(false);
    }
  }, [deleted]);

  useEffect(() => {
    if (reload) {
      fetchData(); // Refetch the data to update the rows after deletion
      setReload(false);
    }
  }, [reload]);

  // columns define for table
  const columns = user.length > 0
    ? Object.keys(user[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        flex: 1, // set the flex property of each column to 1
      }))
    : [];

  //row data define for table
  const rows = filteredUser.map((us) => ({
    ...us,
  }));

  const handleAddUserClick = () => {
    setOpen(true);
  };

  const handleCloseAddUser = () => {
    setOpen(false);
  };

  return (
    <>
    <Container>
      <div ref={componentRef}>
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          autoHeight
          columnBuffer={0}
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
          className="dataTable"
        />
        {open && (
          <Show name={name} columns={columns} setOpen={setOpen} rowData={selectedRowData} />
        )}
      </div>
     
      </Container>
    </>
  );
}
