import React, { useState } from "react";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './menu.component.css'
import AdminNavbar from "../adminNavbar/AdminNavbar";
 
 
const AdminMenuComponent=()=>{
    const [search,setSearch]=useState('');
    const [menuItems,setMenuItems]=useState([
        {item:'Chicken',category:'main course', price:'13.00', state:'Availabe'},
        {item:'Chicken Biryani',category:'main course', price:'100.00', state:'Availabe'},
    ]);
 
    const [newItem, setNewItem]=useState({
        itemName:'',
        category:'',
        subCategory:'',
        description:'',
        price:''
    });
 
    const [errors, setErrors]=useState({});
    const [isPopupOpen, setIsPopupOpen]=useState(false);
 
    const handleSearch=(event)=>{
        setSearch(event.target.value);
    };
 
    const handleInputChange=(event)=>{
        const {name, value}=event.target;
        setNewItem({...newItem, [name]:value});
    };
 
    const validateForm=()=>{
        const errors={};
        if(!newItem.itemName) errors.itemName='Item Name is required';
        if(!newItem.category) errors.category='Category is required';
        if(!newItem.description) errors.description='Description is required';
        if(!newItem.price) errors.price='Price is required';
        setErrors(errors);
        return Object.keys(errors).length===0;
    };
 
    const handleAddItem = async ()=>{
        if(!validateForm()) return;
 
        try{
            const token=localStorage.getItem('token');
           
            await axios.post('/api/menu',newItem,{
                headers: {Authorization: `Bearer ${token}`}
            });
            setMenuItems([...menuItems,{
                item:newItem.itemName,
                category:newItem.category,
                price:newItem.price,
                status:'Available'
            }])
            setNewItem({itemName:'',category:'',subCategory:'',description:'',price:''});
            setIsPopupOpen(false);
        } catch(error){
            if(error.response && (error.response.status===500 || error.response.status===404)){
                console.error('Something went wrong', error);
            }else{
                console.error('An unexpected error occured',error);
            }
        }
    };
 
    const filteredItems=menuItems.filter(item=>
        item.item.toLowerCase().includes(search.toLowerCase()) ||  item.category.toLowerCase().includes(search.toLowerCase())
        );
 
    return(
       
        <div>
             <AdminNavbar />
             
            <div>
                <h2>Menu Items</h2>
                <input type="text" placeholder="Search..." value={search} onChange={handleSearch} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, index)=>(
                        <tr key={index}>
                            <td>{item.item}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>{item.state}</td>
 
                        </tr>
                       
                    ))}
                </tbody>
            </table>
            <button style={{float:'right', marginTop:'-200px'}} id="btn" onClick={()=>setIsPopupOpen(true)}>+ New Item</button>
            { isPopupOpen && (
                <div className="pop">
                    <div className="popup-inner">
                        <h2>Add New Item</h2>
                        <form>
                            <div>
                                <label>Item Name</label>
                                <input
                                    type="text"
                                    name="itemName"
                                    value={newItem.itemName}
                                    onChange={handleInputChange}
                                />
                                {errors.itemName && <span className="error">{errors.itemName}</span>}
                            </div>
                            <div>
                            <label>Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={newItem.category}
                                    onChange={handleInputChange}
                                />
                                {errors.category && <span className="error">{errors.category}</span>}
                               
                            </div>
                            <div>
                            <label>Sub Category</label>
                                <input
                                    type="text"
                                    name="subCategory"
                                    value={newItem.subCategory}
                                    onChange={handleInputChange}
                                />
                               
                            </div>
                            <div>
                            <label>Description</label>
                               <textarea
                                    name="description"
                                    value={newItem.description}
                                    onChange={handleInputChange}
                               ></textarea>
                                {errors.description && <span className="error">{errors.description}</span>}
                            </div>
                            <div>
                            <label>Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={newItem.price}
                                    onChange={handleInputChange}
                                />
                                {errors.price && <span className="error">{errors.price}</span>}
                            </div>
                            <button type="button" onClick={handleAddItem}>Add</button>
                        </form>
                        <button onClick={()=>setIsPopupOpen(false)}>Close</button>
                    </div>
                </div>
            )}
 
           
        </div>
    );
};
 
export default AdminMenuComponent;



styles.css

.pop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
.popup-inner{
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-width: 90%;
}
.error{
    color: red;
}
 table{
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 60px;
}
 table th,table td{
    padding: 8px;
    text-align: left;
}
 table th{
    background-color: #f2f2f2;
 
}
 th td{
    padding: 15px;
    text-align: center;
}
 input{
    margin-top: 10px;
    margin-left: 50px;
    padding: 5px;
    width: 150px;
  border-radius: 7px;
   
    /* border: 1px solid #ddd; */
    height: 20px;
}
#btn{
    /* margin-top: 20px; */
    padding: 7px;
    width: 150px;
  border-radius: 7px;
   background-color: gold;
    border: 1px solid #ddd;
    height: 30px;
    color: black;
    position: relative;
    cursor: pointer;
}
