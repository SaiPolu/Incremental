import React, { useState } from 'react'
import AdminNavbar from '../adminNavbar/AdminNavbar';
import './payments.component.css'
function AdminPaymentsComponent() {
    const [searchTerm, setSerchTerm] = useState('');
    const payments = [
        { name: 'Prasanth', email: 'prasanth@iamneo.ai', phoneNo: '999999999', spent: '163/-', status: 'successful' }
    ];
    const filteredPayments = payments.filter(payment =>
        payment.name.toLowerCase().includes(searchTerm.toLowerCase()) || payment.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
    return (
        <>
 
           <AdminNavbar />
 
            <div className="payment-section">
                        <h2>Payments</h2>
                        <div id='totalpay'><h3>Total Payment: {filteredPayments.reduce((sum, payment) => sum + parseFloat(payment.spent), 0).toFixed(2)} /-</h3></div>
                    <input type="text" value={searchTerm} onChange={e => setSerchTerm(e.target.value)} placeholder="Search..." />
           
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>PhoneNo</th>
                            <th>Spent</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.name}</td>
                                <td>{payment.email}</td>
                                <td>{payment.phoneNo}</td>
                                <td>{payment.spent}</td>
                                <td>{payment.status}</td>
 
                            </tr>
                        ))}
                    </tbody>
                </table>
           </div>
 
        </>
    )
}
export default AdminPaymentsComponent;


style.css

.payment-section{
    padding: 20px;
    background: #fff;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
h2{
    float: left;
    margin-bottom: 20px;
}
h3{
    text-align: center;
}
#totalpay{
    text-align: center;
}
 
.payment-section table{
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 60px;
}
.payment-section table th,table td{
    padding: 8px;
    text-align: left;
}
.payment-section table th{
    background-color: #f2f2f2;
 
}
.payment-section th td{
    padding: 15px;
    text-align: center;
}
.payment-section input{
    margin-top: 20px;
    padding: 7px;
    width: 150px;
  border-radius: 7px;
    float: right;
    border: 1px solid #ddd;
    height: 30px;
}
 
