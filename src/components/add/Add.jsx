import React from 'react'
import './add.css'
const Add = (props) => {


    const handleSubmit = (e) => {
      console.log("object");
      e.preventDefault();
      props.setOpen(false);
    };


  return (
    
  <>
    <div className="add">
      <div className="modal1">
        <span className="close" onClick={() =>{console.log("33object"); props.setOpen(false)}} >
          X
        </span>

        <h1>Add new {props.name}</h1>

        <form  onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
          <button>Send</button>
        </form>

      </div>
    </div>
  </>
  )
}

export default Add