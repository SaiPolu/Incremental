import React from 'react'
import { useForm } from 'react-hook-form'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
import './login.component.css'
const LoginComponent = () => {
  const {register,handleSubmit, formState:{errors}}=useForm();
  const navigate=useNavigate();
 
  const onSubmit=async(data)=>{
    try{
      const response=await axios.get('https://ide-abaecbdcdccffeb314708630efbbcabbaaefdone.premiumproject.examly.io/proxy/5000/users');
      const user=response.data.find(user=>user.email===data.email && user.password===data.password);
 
      if(user){
        if(user.role==='admin'){
          navigate('/dashboard');
        }else{
          navigate('/user')
        }
      }else{
        alert('Invalid email or password')
      }
    }catch(error){
      console.error('There was an error!',error);
      alert("an error occured during login. pleae try again");
    }
  };
  return (
   
    <div className='login-container'>
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
           <label>
            Email
            <input
              type="email"
              {...register('email',{
                required:'Email is required',
                pattern:{
                  value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format"
                }
              })}
             />
             {errors.email && <span className='error'>{errors.email.message}</span>}
           </label>
 
           <label>
            Password
            <input
              type="password"
              {...register('password',{
                required:'password is required',
                minLength:{
                  value:8,
                  message: "Password length must be 8"
                }
              })}
             />
             {errors.password && <span className='password'>{errors.password.message}</span>}
           </label>
           <Link to="/forgot-password"><p>Forget Password</p></Link>
           <button type='submit'>Login</button>
           <p>Don't have an account? <Link to="/register">Create an Acoount</Link></p>
        </form>
    </div>
  )
}
export default LoginComponent

styles.css

.login-container{
    width: 700px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
 
h1{
    text-align: center;
}
form{
    margin-top: 100px;
    display: flex;
    flex-direction: column;
}
label{
    margin-bottom: 15px;
    font-size: 16px;
}
 
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"]{
     width: 100%;
     padding: 10px;
     margin-top: 5px;
     font-size: 16px;
     border: 1px solid #ccc;
     border-radius: 5px;
     box-sizing: border-box;
}
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
}
button:hover{
    background-color: #0056b3;
}
  
