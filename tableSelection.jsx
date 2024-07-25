import React, { useState,useEffect } from "react";
 
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';  // npm install react-datepicker react-model
import 'react-datepicker/dist/react-datepicker.css';
 
import './TableSelect.component.css';
import logo from '../../../assets/logo.png'
import user from '../../../assets/user.png'
import axios from "axios";
 
const TableSelection=()=>{
    const [selectedTable, setSelectedTable] = useState(null);
    const [modeIsOpen, setModeIsOpen]=useState(false);
    const [selectedDate, setSelectedDate]=useState(new Date());
    const [selectedTime, setSelectedTime]=useState('15:00');
   const [popupVisible,setPopupVisible]=useState(false)
    const [mealType, setMealType]=useState('Lunch');
    const [userDetails, setUserDetails]=useState(null);
    const navigate=useNavigate();
 
    useEffect(()=>{
        axios.get('https://ide-abaecbdcdccffeb314708630efbbcabbaaefdone.premiumproject.examly.io/proxy/5000/users')
        .then(response=>{
            setUserDetails(response.data.user);
        })
        .catch(error=>{
            console.error('Error fetching user details:',error);
        })
    },[])
 
    const handleTableSelect=(tableNumber)=>{
        setSelectedTable(tableNumber);
    };
    const handleSelectOrderFood=()=>{
        if(selectedTable){
            setModeIsOpen(true);
        }
    }
 
    const handleProceedToOrder=()=>{
        setModeIsOpen(false);
        navigate('/order');
    }
 
    return(
        <main>
            <header>
                <img src={logo} id="left"/>
                <img src={user}  className="user" id="right" onClick={()=>setPopupVisible(!popupVisible)}/>
                {popupVisible && userDetails && (
                    <div className="popup visible" id="popup">
                      <img src={user} id="user" />
                      <p><b>{userDetails.name}</b></p>
                      <p>{userDetails.email}</p>
                      <p><b>Login date & time: {userDetails.loginDateTime}</b></p>
                      <button id="btn">Logout</button>
                 </div>
 
                )}
               
            </header>
 
            <div id="chairs">
                {[1,2,3,4,5,6,7].map((tableNumber)=>(
                    <div key={tableNumber} className="chair-div" onClick={()=>handleTableSelect(tableNumber)}>
                        <img src={require(`../../../assets/selected${tableNumber%2===0 ? '4':'2'}chair.png`)} alt="4 chair Table" className="chair-1" />
                        <div className={`png-table${tableNumber%2===0 ? '':'3'}`} id="png-tab">
                            <h6>{tableNumber}</h6>
                            <p>vacant</p>
                        </div>
                    </div>
                ))}
 
            </div>
 
            <footer id="footer">
                <h3>Selected table: {selectedTable}</h3>
                <button onClick={handleSelectOrderFood}>Select & Order food</button>
            </footer>
 
            <Modal isOpen={modeIsOpen} onRequestClose={()=>setModeIsOpen(false)} className="Modal" overlayClassName="Overlay">
                <h2>Select preferred date and time</h2>
                <div className="modal-content">
                <div className="form-group">
                    <label>Select Date:</label>
                    <DatePicker selected={selectedDate} onChange={(date)=>setSelectedDate(date)} dateFormat="dd-MM-yyyy" />
                </div>
                <div className="form-group">
                    <label>Meal Type:</label>
                    <div className="meal-buttons">
                    <button className={mealType==='Lunch' ? 'active' : ''} onClick={()=>setMealType('Lunch')}>Lunch</button>
                    <button className={mealType==='Dinner' ? 'active' : ''} onClick={()=>setMealType('Dinner')}>Dinner</button>
                    </div>
                </div>
                <div className="form-group">
                    <label>Selected Time:</label>
                    <input type="time" value={selectedTime} onChange={(e)=>setSelectedTime(e.target.value)}/>
                </div>
               <div className="modal-actions">
                <button onClick={()=>setModeIsOpen(false)}>Close</button>
                <button onClick={handleProceedToOrder}>Proceed to order</button>
                </div>
                </div>
            </Modal>
        </main>
    )
}
export default TableSelection


styles.css


body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* overflow: hidden; */
}
header{
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
 
    padding:30px;
    border-radius: 10px;
    border: 1px solid #eeeeee;
 
}
#right{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: right;
    margin-top: -20px;
}
#left{
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
   
    margin-top: -20px;
}
#footer{
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border:1px solid #eeeeee;
   margin-top: -150px;
    border-radius: 10px;
    scroll-behavior:auto;
   
}
h3{
    text-align: center;
}
#footer button{
    background-color: blue;
    color: white;
    padding: 10px 10px;
    border-radius: 10px;
    margin-top: -50px;
    float: right;
}
#png-tab{
    width: 40px;
    height: 50px;
    background-color: white;
    border-right: 6px solid green;
    border-radius: 5px;
    position: absolute;
    margin: 9.5px 0px 0px 0.8px;
}
.chair-1{
    width:100px;
    height:auto;
   
}
.chair-div{
    width: 150px;
    height: 100px;
    position: relative;
    margin: 5px;
    margin-bottom: 150px;
}
.chair-div.selected{
    background-color: black;
}
#chairs{
   
    display: flex;
    justify-content: space-evenly;
 
    flex-wrap: wrap;
    margin-top: 40px;
    margin-right: 450px;
   
}
.user{
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
}
.popup{
    display: none;
    position: absolute;
    top: 80px;
    right: 10px;
    border: 1px solid #ffffff;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    padding: 10px;
    width: 350px;
    border-radius: 10px;
}
.popup img{
    float:left;
    margin-top: 20px;
}
#btn{
    margin-top: 20px;
}
main{
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    width:100%;
    height: 700px;
    margin-bottom: 20px;
    margin-top: 20px;
    border-radius: 10px;
}
.Modal{
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    position: relative;
    width: 400px;
    max-width: 90%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.Overlay{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}
.modal-content{
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 80%;
    align-items: center;
}
.form-group{
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    align-items: center;
}
.form-group label{
    font-weight: bold;
    align-self: flex-start;
}
 
.meal-buttons{
    display: flex;
    gap: 10px;
}
.meal-buttons button{
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.meal-buttons button.active{
    background-color: blue;
    color: white;
}
.modal-actions{
    display: flex;
    justify-content: space-between;
    gap: 10px;
}
.modal-actions button{
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.modal-actions button:first-child{
    background-color: gray;
    color: white;
}
.modal-actions button:last-child{
    background-color: blue;
    color: white;
}
.close{
    position:absolute;
    top: 10px;
    right:10px;
    cursor:pointer;
}
has context menu
