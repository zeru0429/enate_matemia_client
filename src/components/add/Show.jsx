import React, { useState } from 'react';
import './show.css';
import Update from '../update/Update';

const Show = (props) => {
  const [shouldShow, setShouldShow] = useState(true);

  const handleUpdateSuccess = () => {
    setShouldShow(true);
  };

  const handleAddUserClick = () => {
    setShouldShow(false);
  };

  const handleCloseAddUser = () => {
    setShouldShow(true);
  };

 const handlePrint = () => {
  const printWindow = window.open('', '', 'width=300,height=400');

  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          @media print {
            body {
              margin: 0;
              background-color: #E0E7E9 ! important;
            }
            .show11 {
              width: 300px;
              height: 400px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background-color: purple;
            }

            /* Add any additional styles for the central part you want to print */
          }
        </style>
      </head>
      <body>
        <div class="show11">
          ${document.querySelector('#myprintable').innerHTML}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
};


  return (
    <>
      {shouldShow && (
        <div className="show11">
          <div className="modal11" >
            <span className="close1" onClick={() => {props.setOpen(false)}}>
              X
            </span>
            <button onClick={handlePrint}>print</button>
            <div  id='myprintable' >
            <h1>{props.name}</h1>
            {Object.entries(props.rowData).map(([key, value]) => (
              <div key={key}>
                <strong>{key}: </strong> {value}
              </div>
            ))}
            {/* <button onClick={handleAddUserClick} className="btn btn-primary">
              Update
            </button> */}
            </div>
          </div>
        </div>
      )}
       {/* {!shouldShow && (
        <Update
          name="user"
          columns={Object.entries(props.rowData)}
          rows={props.rowData} // Make sure to pass the correct rows data
          setOpen={handleCloseAddUser}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )} */}
    </>
  );
};

export default Show;