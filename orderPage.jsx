import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import dish from '../../../assets/dish.png'
import chickenleg from '../../../assets/chicken-leg.png'
import copy4 from '../../../assets/NoPath - Copy (4)@2x.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './order.component.css'
import logo from '../../../assets/logo.png'
import user from '../../../assets/user.png'
 
const OrdersPage = () => {
  const [quantity, setQuantity] = useState({ pakoda: 1, biryani: 1 });
  const [category, setCategory] = useState('all');
  const [popupVisible,setPopupVisible]=useState(false)
  const [subTotal,setSubTotal]=useState(0);
  const [total, setTotal]=useState(0);
  const naviagte = useNavigate();
  const prices = { pakoda: 20, biryani: 100 };
  const serviceCharges = 10;
 
  useEffect(()=>{
    const newSubTotal=Object.keys(quantity).reduce((total,item)=>total+(quantity[item] || 0)*(prices[item] || 0),0);
    setSubTotal(newSubTotal);
    setTotal(newSubTotal+serviceCharges);
  },[quantity]);
 
  const handleQuantityChange = (item, amount) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [item]: Math.max(0, (prevQuantity[item]  || 0)+ amount),
    }));
  };
 
 
  const handleProceed = () => {
    naviagte('/payment')
  };
 
  const items = [
    { name: 'Pakoda', category: 'veg', price: prices.pakoda, quantity: quantity.pakoda },
    { name: 'Chicken Biryani', category: 'non-veg', price: prices.biryani, quantity: quantity.biryani }
  ];
 
  const filteredItems = category === 'all' ? items : items.filter(item => item.category === category);
 
  return (
    <>
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
      <div className="container">
        <div className='main-content'>
          <header className='bg-white shadow-sm p-3 mb-4 rounded'>
            <nav className='text-center'>
              <ul className='list-inline'>
                <li className='list-inline-item'><a href="#">Starters</a></li>
                <li className='list-inline-item'><a href="#">Main Course</a></li>
                <li className='list-inline-item'><a href="#">Deserts</a></li>
                <li className='list-inline-item'><a href="#">Beverages</a></li>
              </ul>
 
            </nav>
 
          </header>
          <main className='row'>
            <aside className='col-md-2'>
              <div className='d-flex flex-column align-items-center'>
                <img src={dish} alt="Veg" onClick={() => setCategory('veg')} className='mb-2' id='veg' />
                <p>Veg</p>
                <img src={chickenleg} alt="Non-Veg" onClick={() => setCategory('non-veg')} className='mb-2' id='non-veg' />
                <p>Non-Veg</p>
              </div>
 
            </aside>
            <div className="col-md-7">
              <div className="row">
                {filteredItems.map((item, index) => (
                  <div className='col-md-6 mb-4' key={index}>
                    <div className='flip-card'>
                      <div className='flip-card-inner'>
                        <div className='flip-card-front p-3 bg-white shadow-sm rounded'>
                          <p className='discount'>20% off</p>
                          <img src={copy4} alt={item.name} className='img-fluid' />
                          <h3>{item.name}</h3>
                          <p>Lorem, ipsum dolor sit amet consectet</p>
                          <p className='price'>Rs{item.price}</p>
 
                        </div>
                        <div className='flip-card-back p-3 bg-primary text-white shadow-sm rounded' >
                          <div className='btn-group' role='group'>
                            <button className='btn btn-light' onClick={() => handleQuantityChange(item.name.toLowerCase(), -1)}>-</button>
                            <button className='btn btn-light' onClick={() => handleQuantityChange(item.name.toLowerCase(), 1)}>+</button>
 
                          </div>
                         
                          <h3>{item.name}</h3><br />
                          <p>evening snack</p>
                          <h2>Rs{item.price}</h2><br />
 
                        </div>
 
                      </div>
 
                    </div>
 
                  </div>
                ))}
              </div>
            </div>
 
          </main>
        </div>
 
      </div>
      <div className='order-preview'>
        <div className='box bg-white shadow-sm p-3 rounded' id='order'>
          <div className='head mb-3'>
            <h3>Order Preview</h3>
 
          </div>
          <div className="box2">
            {filteredItems.map((item, index) => (
              <div className='content mb-3' key={index}>
                <h5>{item.name}</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam laborum quibusdam, id est placeat provid</p>
                <div className="btn-group" role='group'>
                  <button className='btn btn-light' onClick={() => handleQuantityChange(item.name.toLowerCase(), -1)}>-</button>
                  <button className='btn btn-light' onClick={() => handleQuantityChange(item.name.toLowerCase(), 1)}>+</button>
                </div>
                <p className='price1'>Rs{item.price * item.quantity}</p>
              </div>
            ))}
            <div className='subtotal d-flex justify-content-between'>
              <p>Sub Total</p>
              <p className='price1'>Rs{subTotal}</p>
 
            </div>
            <div className='serviceCharges d-flex justify-content-between' >
              <p>Service Charges</p>
              <p className='price1'>Rs{serviceCharges}</p>
 
            </div>
            <hr />
            <div className='total d-flex justify-content-between' >
              <p>Total Payable</p>
              <p className='price1'>Rs{total}</p>
 
            </div>
 
 
          </div>
          <button id='proceed' className='btn btn-primary w-100 mt-3' onClick={handleProceed}>Proceed</button>
 
        </div>
 
      </div>
    </>
  )
}
 
export default OrdersPage

style.css
.container{
    max-width: 1200px;
    margin: auto;
    display: flex;
    margin-left: 10px;
    margin-top: 20px;
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
.main-content{
    flex: 1;
}
.order-preview{
    width: 900px;
    margin-left: 800px;
    /* position: sticky; */
    margin-top: -800px;
}
.flip-card{
    background-color: transparent;
    width: 100%;
    height: 300px;
    perspective: 1000px;
}
.flip-card-inner{
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner{
    transform: rotateY(180deg);
}
.flip-card-front,.flip-card-back{
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}
.flip-card-front{
    background-color: #fff;
    color: black;
}
.flip-card-back{
    background-color: #2980b9;
    color: white;
    transform: rotateY(180deg);
}
.box{
    padding: 20px;
    margin-bottom: 20px;
 
}
.box2{
    padding: 20px;
    margin-bottom: 20px;
}
.price1{
    font-weight: bold;
}
btn.hover{
    background-color: #0056b3;
    color: white;
}
#veg{
    width: 100px;
    height: 100px;
}
#non-veg{
    width: 100px;
    height: 100px;
}
#order{
   
    margin-left: 400px;
}
