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


//component
// import SinglePage from '../singlePage/SinglePage';
import Show from "../../components/add/Show";
import { myGlobalVariable } from '../../constants'
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
      const response = await axios.get(`${myGlobalVariable}${first}`);
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
      flex: 1,
      renderCell: (params) => {
        if (key === 'status') {
          const status = params.value.toLowerCase();
          let color;

          if (status === 'completed') {
            color = 'green';
          } else if (status === 'pending') {
            color = 'orange';
          } else if (status === 'ordered') {
            color = 'red';
          }

          return (
            <div style={{ color }}>
              {status}
            </div>
          );
        } else if (key === 'action' && first === 'not-completed-oreder') {
          // ...
        } else if (key === 'action' && first === 'completed-oreder') {
          // ...
        } else {
          return (
            <div>
              {params.value}
            </div>
          );
        }
      },
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

      const onClickCompleted = () => {
        // console.log(params.row);
      handleUpdateStatus(`${params.row.id}`,`${params.row.product_name}`);
      };
      if (first == 'not-completed-oreder') {
        return (
        
          <div className="cellAction d-block">
            <div className="viewButton btn btn-primary" onClick={onClickView}>
              View
            </div>
            <div className="viewButton btn btn-secondary" onClick={onClickCompleted}>
              Completed
            </div>
          </div>
        );
      }
      else if (first == 'completed-oreder') { 
        return (
        
          <div className="cellAction d-block">
             <div className="viewButton btn btn-primary" onClick={onClickView}>
              View
            </div>
          </div>
        );
      }
     
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


  const handleUpdateStatus = (idnum, name) => {
    const url = `${myGlobalVariable}update${first}/${idnum}`;
    const data = { status: 'completed' };

    axios.put(url, data)
      .then((response) => {
        if (response.status != 200) { 
        // update the filteredUser state by setting the status of the completed task to "completed"
        setFilteredUser(prevFilteredUser => prevFilteredUser.map((row, index) => {
          if (row.id === idnum && row.product_name === name) {
            return {
              ...row,
              status: 'completed',
            };
          } else if (index === 0 && row.status === 'ordered') {
            // set the status of the first row with status "ordered" to "pending"
            return {
              ...row,
              status: 'pending',
            };
          } else {
            return row;
          }
        }));
      
        }
        
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
