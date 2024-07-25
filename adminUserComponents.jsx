import React, {useState} from 'react';
import axios from 'axios';
import  {useQuery}  from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import './users.component.css'
import AdminNavbar from '../adminNavbar/AdminNavbar';
const fetchUsers=async ()=>{
  const { data }=await axios.get('https://ide-abaecbdcdccffeb314708630efbbcabbaaefdone.premiumproject.examly.io/proxy/5000/users');
  return data;
}
const AdminUsersComponent = () => {
  const [search,setSearch]=useState('');
  const [selectedUser, setSelectedUser]=useState(null);
  const [currentPage, setCurrentPage]=useState(0);
 
  const usersPerPage=3;
 
  const {data:users,error,isLoading}=useQuery({queryKey:['users'], queryFn: fetchUsers});
 
  const filteredUsers=users?.filter(user=>
    user.fullname.toLowerCase().includes(search.toLowerCase()) ||   user.email.toLowerCase().includes(search.toLowerCase())
    );
 
    const handleSearchChange=(e)=>{
      setSearch(e.target.value);
    };
 
    const handleViewRating=(user)=>{
      setSelectedUser(user);
    };
 
    const handleClosePopup=()=>{
      setSelectedUser(null);
    };
   const handlePageClick=(data)=>{
         setCurrentPage(data.selected);
   };
 
   const offset=currentPage*usersPerPage;
   const currentUsers=filteredUsers?.slice(offset,offset+usersPerPage);
 
    // if(isLoading) return <div>Loading...</div>;
    // if(error) return <div>Error loading users</div>;
  return (
    <>
    <AdminNavbar />
    <div className='admin-users-container'>
    <h2>Users</h2>
        <input type="text" placeholder='Search...' value={search} onChange={handleSearchChange} />
 
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>PhoneNo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map(user=>(
              <tr key={user.id}>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td><button onClick={()=>handleViewRating(user)}>View Rating</button></td>
 
              </tr>
            ))}
          </tbody>
        </table>
 
        {selectedUser && (
          <div className="pop-up">
            <div className="pop-up-innerr">
              <button className='closed-btnn' onClick={handleClosePopup}>X</button>
              <h3>Rating Details</h3>
              <ul>
                {selectedUser.ratings ? (selectedUser.ratings.map((rating,index)=>(
                  <li key={index}>
                    <strong>Rating:</strong>{rating.rating}<br />
                    <strong>Feedback:</strong>{rating.feedback}
 
 
                  </li>
                ))
                ):(
                  <li>No ratings available</li>
                )}
              </ul>
            </div>
 
          </div>
        )}
        <ReactPaginate
           previousLabel ={'previous'}
           nextLabel={'next'}
           breakLabel={'...'}
           pageCount={Math.ceil(filteredUsers?.length / usersPerPage)}
 
           marginPagesDisplayed={2}
           pageRangeDisplayed={5}
           onPageChange={handlePageClick}
           containerClassName={'pagination'}
           activeClassName={'active'}
          />
 
       
    </div>
    </>
  )
}
export default AdminUsersComponent
 


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
