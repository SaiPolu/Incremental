import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './payment.component.css'
const PaymentPage = () => {
      const [cardNumber, setCardNumber]=useState('');
      const [cvvNumber, setCvvNumber]=useState('')
      const [expiryDate, setExpiryDate]=useState('')
      const [nameOnCard, setNameOnCard]=useState('');
      const [description, setDescription]=useState('');
      const [rating,setRating]=useState(0);
      const [date, setDate]=useState('');
   
      const [errors,setErrors]=useState({});
      const [showFeddbackModal, setShowFeedbackModal]=useState(false);
      const [showGreetingModal, setShowGreetingModal]=useState(false);
      const [summary, setSummary]=useState({subTotal:0,serviceCharges:0,total:0});
      const navigate=useNavigate();
 
      useEffect(()=>{
        const fetchedSummary={
          subTotal:113,
          serviceCharges:50,
          total:163
        };
        setSummary(fetchedSummary);
      },[]);
 
      const validate=()=>{
        const newErrors={};
        if(!cardNumber || cardNumber.length!==16) newErrors.cardNumber='Invalid card number (must be 16 digits)';
        if(!cvvNumber || cvvNumber.length!==3) newErrors.cvvNumber='Invalid CVV (must be 3 digits)';
        if(!expiryDate || !/^\d{2}\/\d{4}$/.test(expiryDate)) newErrors.expiryDate='Invalid expiry date (MM/YYYY format)';
        if(!nameOnCard) newErrors.nameOnCard='Card name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length===0;
      }
 
      const handleCheckout=()=>{
        if(validate()){
          setShowFeedbackModal(true);
        }
      }
 
      const handleSubmit=()=>{
        const newErrors={};
        if(!description) newErrors.description='Description is required';
        if(!date) newErrors.date='Date is required';
        setErrors(newErrors);
        if (Object.keys(newErrors).length===0){
          setShowGreetingModal(true)
        }
      }
 
      const handleClose=()=>{
        navigate('/login');
      }
 
      const handleGoBack=()=>{
        navigate('/order-page');
      };
 return (
    <div className='payment-page'>
      <div className='payment-form'>
        <h2>Choose your payment method</h2>
        <form>
          <div className="form-group">
             <label>Card Number</label>
             <input type="text" value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)} />
             {errors.cardNumber && <span className='error'>{errors.cardNumber}</span>}
          </div>
 
          <div className="form-group">
             <label>CVV Number</label>
             <input type="text" value={cvvNumber} onChange={(e)=>setCvvNumber(e.target.value)} />
             {errors.cvvNumber && <span className='error'>{errors.cvvNumber}</span>}
          </div>
 
          <div className="form-group">
             <label>Expiry Date</label>
             <input type="text" value={expiryDate} onChange={(e)=>setExpiryDate(e.target.value)} />
             {errors.expiryDate && <span className='error'>{errors.expiryDate}</span>}
          </div>
 
          <div className="form-group">
             <label>Name On Card</label>
             <input type="text" value={nameOnCard} onChange={(e)=>setNameOnCard(e.target.value)} />
             {errors.nameOnCard && <span className='error'>{errors.nameOnCard}</span>}
          </div>
        </form>
 
      </div>
 
      <div className='summary'>
        <h3>Summary</h3>
        <p>Sub Total: Rs{summary.subTotal} /-</p>
        <p>Service Charges: Rs{summary.serviceCharges} /-</p>
        <p>Total Payables: Rs{summary.total} /-</p>
 
      </div>
 
      <div className='footer-buttons'>
        <button className='go-back-button' onClick={handleGoBack}>Go Back</button>
        <button className='checkout-button' onClick={handleCheckout}>Check Out</button>
 
      </div>
       {showFeddbackModal && (
        <div className='modal'>
           <h3>Please provide feedback</h3>
           <div className='form-group'>
            <label>Rating</label>
            <input type="number" value={rating} onChange={(e)=>setRating(e.target.value)} min="1" max="5" />
 
           </div>
           <div className='form-group'>
            <label>Enter description</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} />
             {errors.description && <span className='error'>{errors.description}</span>}
           </div>
          <button onClick={handleSubmit}>Submit</button>
          </div>
       )}
       {showGreetingModal && (
        <div className='modal'>
          <p>Thank You!</p>
          <button  onClick={handleClose}>Close</button>
          </div>
       )}
     
    </div>
  )
}
 
export default PaymentPage



styles.css

.payment-page{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: Arial,sans-serif;
    padding: 20px;
    height: 100vh;
}
.payment-form{
    width: 60%;
}
.summary{
    position: absolute;
    width: 35%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    margin-left: 700px;
    margin-bottom: 2000px;
 
}
h2,h3{
    text-align: center;
    margin-bottom: 20px;
}
.form-group{
    margin-bottom: 15px;
}
label{
    display: block;
    margin-bottom: 5px;
}
input[type="text"],
textarea{
    width: 60%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}
button{
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button:hover{
    background-color: #45a049;
}
.error{
    color: red;
    font-size: 12px;
}
.modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    border-radius: 5px;
    z-index: 1000;
}
.modal h3{
    margin-top: 0;
}
.modal button{
    margin-top: 20px;
}
.footer-buttons{
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 50px;
    width: 100%;
    padding: 0 20px;
}
.go-back-button{
    background-color: #f44336;
}
.go-back-button:hover{
    background-color: #d32f2f;
}
.checkout-button{
    background-color: #4CAF50;
    margin-right: 100px;
}
.checkout-button:hover{
    background-color: #45a049;
}
