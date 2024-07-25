import React from "react"
 
import AdminNavbar from "../adminNavbar/AdminNavbar"
import './AdminDashboard.component.css'
function AdminDashboard() {
    const data = [
        {
            name: "Total Amount",
            value: "163.00/-",
        },
        {
            name: "Total No. of Users",
            value: "2"
        },
        {
            name: "Total No. of Dishes",
            value: "3"
        },
        {
            name: "Total No. of Tables",
            value: "7"
        },
    ]
 
    return (
        <>
       
            <AdminNavbar />
           
            <div className="card-container" id="card">
                {data.map((data, index) => (
                    <>
                    <div className={`card card-${index}`} key={index}>
                        <p>{data.name}</p>
                        <h1>{data.value}</h1>
                    </div>
                    </>
                   
                ))}
            </div>
           
        </>
    )
}
export default AdminDashboard


 
.card-container{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px;
}
.card{
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    color: white;
    width: 300px;
    text-align: center;
    height: 100px;
}
.card-0{
    background: linear-gradient(to right, rgb(73,28,28),rgb(226,11,122));
}
.card-1{
    background: linear-gradient(to right, rgb(206,21,160),rgb(176,72,150));
}
.card-2{
    background: linear-gradient(to right, rgb(18,85,210),rgb(0,123,129));
}
.card-3{
    background: linear-gradient(to right, rgb(9,37,192),rgb(9,37,192));
}
 
 
