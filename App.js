import React from 'react'
// import { FaToggleOff } from 'react-icons/fa'
 
 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from './components/adminComponents/adminDashboard/AdminDashboard'
import AdminPaymentsComponent from './components/adminComponents/adminPayments/AdminPaymentsComponent'
import AdminNavbar from './components/adminComponents/adminNavbar/AdminNavbar'
import AdminTable from './components/adminComponents/adminTable/AdminTable'
import AdminMenuComponent from './components/adminComponents/adminMenu/AdminMenuComponent'
import ErrorComponent from './components/error/ErrorComponent'
import TableSelection from './components/usersComponents/tableSelection/TableSelection'
import Register from './components/auth/register/Register'
import LoginComponent from './components/auth/login/LoginComponent'
import AdminUsersComponent from './components/adminComponents/adminUsers/AdminUsersComponent'
import ForgotPassword from './components/auth/forgotPassword/ForgotPassword'
import PaymentPage from './components/usersComponents/paymentPage/PaymentPage'
import OrdersPage from './components/usersComponents/ordersPage/OrdersPage'
 
 
 
 
 
 function App() {
  return (
    <div>
     
   
   
    <Router>
      {/* <PaymentPage />
         <TableSelection /> */}
         {/* <OrdersPage /> */}
      <Routes>
 
          <Route exact path="/forgot-password" element={<ForgotPassword />}></Route>
           <Route exact path="/user" element={<AdminUsersComponent />}></Route>
           
           <Route exact path="/login" element={<LoginComponent />}></Route>
            <Route exact path="/" element={<Register />}></Route>
           <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/dashboard" element={<AdminDashboard />}></Route>
 
          <Route exact path="/admin-menu" element={<AdminMenuComponent />}></Route>
          <Route exact path="/error" element={<ErrorComponent />}></Route>
          <Route exact path="/payment" element={<AdminPaymentsComponent />}></Route>
         
          <Route exact path="/table" element={<AdminTable />}></Route>
      </Routes>
     
   
     </Router>
     
    </div>
   
   
  )
}
 
export default App
 
