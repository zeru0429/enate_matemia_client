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

  return (
    <>
      {shouldShow && (
        <div className="show11">
          <div className="modal11">
            <span className="close1" onClick={() => {props.setOpen(false)}}>
              X
            </span>
            <h1>Details</h1>
            {Object.entries(props.rowData).map(([key, value]) => (
              <div key={key}>
                <strong>{key}: </strong> {value}
              </div>
            ))}
            <button onClick={handleAddUserClick} className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      )}
       {!shouldShow && (
        <Update
          name="user"
          columns={Object.entries(props.rowData)}
          rows={props.rowData} // Make sure to pass the correct rows data
          setOpen={handleCloseAddUser}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
};

export default Show;