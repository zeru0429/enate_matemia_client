import React from 'react'
import './add.css'
const AddOrder = () => {

    
  return (
      <>
        <div class="add">
            <div class="modal1">
                <span class="close" onclick="closeModal()">X</span>

                <h1>Add new [name]</h1>

                <form onsubmit="handleSubmit(event)">
                <div class="form-group">
                    <label for="[column.field]">[column.headerName]</label>
                    <select name="[column.field]" required value="[form[column.field]]" onchange="setField('[column.field]', this.value)">
                    <option value="">None</option>
                    <option value="[option.value]">[option.label]</option>
                    </select>

                    <input type="file" name="[column.field]" accept="image/jpeg, image/png" onchange="handleFileChange(event)" required />

                    <input type="[column.type]" name="[column.field]" placeholder="[column.field]" value="[form[column.field]]" onchange="setField('[column.field]', this.value)" required  />
                </div>

                <button type="submit">Submit</button>
                </form>
            </div>
        </div>
      </>
  )
}

export default AddOrder