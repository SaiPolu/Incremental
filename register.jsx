import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './Register.css'
import regimg from '../../../assets/register.png'
const Register = () => {
   const [form,setForm] = useState({
    fullname:'',
    email:'',
    phone:'',
    password:'',
    role:'user'
   });
 
   const [errors,setErrors]=useState({});
 
   const navigate=useNavigate();
   
   const fullnameRegex=/^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
   const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const phoneRegex=/^[0-9]{10}$/;
   const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
 
   const handleChange=(e)=>{
    const {name,value}=e.target;
    setForm({
      ...form,
      [name]:value
    });
   };
 
   const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log('form submitted',form);
     const newErros={};
 
    if(!fullnameRegex.test(form.fullname)){
      newErros.fullname='Full Name is required';
 
    }
    if(!emailRegex.test(form.email)){
      newErros.email='Email is required';
 
    }
    if(!phoneRegex.test(form.phone)){
      newErros.phone='Phone No is required';
 
    }
    if(!passwordRegex.test(form.password)){
      newErros.password='Password is required';
 
    }
    if(Object.keys(newErros).length>0){
      setErrors(newErros);
      return;
    }
    const newUser={ id:uuidv4(), ...form };
 
    try{
      const response =await axios.post('https://ide-abaecbdcdccffeb314708630efbbcabbaaefdone.premiumproject.examly.io/proxy/5000/users', newUser);
      console.log('User registered successfully',response.data);
      navigate('/login');
    }catch (error){
        console.error('There was an error!',error);
    }
   };
   return (
    <>
    <div className='register-page'>
      <div className='register-image'></div>
    <img src={regimg} alt="" className='img-fluid'/>
    </div>
    <div className='register-container'>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          </label>
          <input type="text" name='fullname' value={form.fullname} onChange={handleChange}  />
          {errors.fullname && <span className='error'>{errors.fullname}</span>}
       
 
        <label>
          Email
          </label>
          <input type="email" name='email' value={form.email} onChange={handleChange}  />
          {errors.email && <span className='error'>{errors.email}</span>}
       
 
        <label>
          Phone Number
          <input type="tel" name='phone' value={form.phone} onChange={handleChange}  />
          {errors.phone && <span className='error'>{errors.phone}</span>}
        </label>
 
        <label>
          Password
          <input type="password" name='password' value={form.password} onChange={handleChange}  />
          {errors.password && <span className='error'>{errors.password}</span>}
        </label>
        <div className='role-selection'>Role
          <label>
            <input type="radio" name='role' value="user" checked={form.role==='user'} onChange={handleChange} />
            User
          </label>
          <label>
            <input type="radio" name='role' value="admin" checked={form.role==='admin'} onChange={handleChange} />
            Admin
          </label>
 
        </div>
        <button type='submit'>Register</button>
        <p>Alredy have an account? <Link to="/login">Sign in</Link></p>
      </form>
     
 
    </div>
    </>
  )
}
export default Register;



style.css

.register-container{
   width: 750px;
   height: 550px;
    float: left;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
 
h1{
    float: left;
    color: skyblue;
}
form{
    display: flex;
    flex-direction: column;
}
label{
    margin-bottom: 15px;
    font-size: 16px;
}
 
/* input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"]{
     width: 70%;
     padding: 10px;
     margin-top: 5px;
     font-size: 16px;
     border: 1px solid #ccc;
     border-radius: 5px;
     
} */
.error{
    color: red;
    font-size: 14px;
    margin-top: 5px;
}
.role-selection{
    margin-bottom: 15px;
}
button{
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: -1px;
}
button:hover{
    background-color: #0056b3;
}
   
has context menu
