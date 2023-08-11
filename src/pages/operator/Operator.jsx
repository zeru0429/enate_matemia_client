import React from 'react'
import Datatable from './DataTable'
const Operator = () => {
  return (
    <div className="container-fluid"> {/* add the container-fluid class */}
      <div className="row"> {/* create a row */}
        <div className="col"> {/* add the col class */}
          <div className="products container">
            <div className="info center">
              <h1>Operator</h1>
            </div>
            <Datatable first="completed-oreder" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operator;