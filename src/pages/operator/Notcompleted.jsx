import React from 'react'
import Datatable from './DataTable'


function Notcompleted() {
  return (
    <div className='products container'>
      <div className="info center">
        <h1>not completed</h1>
        <button className='btn btn-primary' > Add new order </button>
      </div>
      <Datatable first='not-completed-oreder'/>
    </div>
  
  )
}

export default Notcompleted