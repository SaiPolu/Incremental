
import React, { useState } from 'react';
import styles from '../adminTable/tables.component.css'

import AdminNavbar from '../adminNavbar/AdminNavbar';
import t1 from '../../../assets/adminflowchair.svg'
const AdminTable = () => {
  const[tables,setTables]=useState([]);
const addTable =()=>{
  const newTable = {
    id:tables.length+1,
    isUnavailable: false,
    isAlloted: false,
    isServed: false,
  };
  setTables([...tables,newTable]);
};
  const toggleAvailability  = (id) =>{
    setTables(tables.map(table => table.id === id ? {...table, isUnavailable: !table.isUnavailable}:table));
  };
  const toggleAlloted = (id) =>{
    setTables(tables.map(table => table.id === id? {...table,  isAlloted:     !table.isAlloted}:table));
  };
  const toggleServed = (id) =>{
      setTables(tables.map(table => table.id === id ? {...table,isServed: !table.isServed}:table));
  };
  return (
    <div>
        <AdminNavbar/>
      <div className='  '>
        <div className='table-header'>
          <div>
          <h1>Tables</h1>
          <table></table>
          </div>
          <div>
          <button onClick={addTable} id='addTableBtn'>+Add New Table</button>
          </div>
        </div>
        <div className='tables-container'>
{
  tables.map(table => (
    <div key={table.id} className='table-card'>
      <h2>{table.id}</h2>
      <div className='table-icon'><img src={t1}/></div>
      <div className='toggle-group'>
        <label>
          Mark as Un-Available
          <div className='toggle-switch'>
        
          <input type='checkbox' className='toggle-input' checked={table.isUnavailable} onChange={()=> toggleAvailability(table.id)}/>
          <span  className='toggle-slider'></span>
          </div>
        </label>
   {table.isUnavailable && (
    <div className='additional-toggles'>
           <label>
          Mark as Alloted
          <div className='toggle-switch'>
          <input type='checkbox' className='toggle-input' checked={table.isAlloted} onChange={()=>toggleAlloted(table.id)}/>
          <span className='toggle-slider'></span>
          </div>
        </label>

        <label>
          Served
          <div className='toggle-switch'>
          <input type='checkbox' className='toggle-input' checked={table.isServed} onChange={()=>toggleServed(table.id)}/>
          <span className='toggle-slider'></span></div>
        </label>
      </div>
      )}
    </div>
    </div>
  ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTable;




styles.css





.table-container{
    padding:20px;
}
.table-header{
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.tables-container{
    display: flex;
    flex-wrap: wrap;
    gap:20px;
}
.table-card{
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    width: 150px;
    text-align: center;
}
.toggle-group{
    margin-top: 10px;
}
.toggle-group label{
    display: block;
    margin-bottom: 5px;
}
label{
    font-size: 12px;
}
.toggle-switch{
    position: relative;
    display: inline-block;
    width: 34px;
    height: 20px;
    float: right;
    /* margin-right: 20px; */
}
.toggle-input{
    opacity:0;
    width: 0;
    height: 0;
}
.toggle-slider{
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    /* border: 5px solid yellow; */
    transition: 0.5s;
    border-radius: 20px;
}
.toggle-slider::before{
    position:absolute;
    content:"";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.5s;
    border-radius: 50%;
    
}
.toggle-input:checked + toggle-slider{
    background-color: blue;
}
.toggle-input:checked + .toggle-slider::before{
    transform: translateX(14px);
    background-color: blue;

}
.additional-toggles{
    margin-top:10px;
}
