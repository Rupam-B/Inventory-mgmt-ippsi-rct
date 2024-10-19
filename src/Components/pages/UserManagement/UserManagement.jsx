import React, { useEffect, useState } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import '../../css/root.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { environment } from '../../environment'
import Loader from '../Loader'

const UserManagement = () => {
    // const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
    const baseUrl = environment.baseUrl
    const token = localStorage.getItem('ipssi_Jwt')
    // const navigate = useNavigate();

    const [usersData , setUsersData] = useState([])

    
    const [ifLoader, setIfLoader] = useState(false)
    const [isMobile , setIsMobile] = useState(false)




    useEffect(()=>{
        setIfLoader(true)
        axios.get( `${baseUrl}/users` , {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${token}`
            }
        })
        .then(resp =>{
            setIfLoader(false)
            console.log(resp.data)
            setUsersData(resp.data)
        })
        .catch(err=>{
            setIfLoader(false)
            console.log(err)
        })
    },[baseUrl,token])

    // const DeleteUser = (delId) => {

    //         axios.delete(`${baseUrl}/delUser/${delId}`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         .then(resp => {
    //             alert("Successfully Deleted");
    //             navigate('/Users');
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     };

        
        // Set isMobile based on screen size
        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth < 500);
            };
    
            
            handleResize();
    
            
            window.addEventListener('resize', handleResize);
    
            
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);
    


  return (
    <div className='main-container'>
        <Sidebar/>


        <div className="content">
        {
          ifLoader ?
            <Loader /> : ''
        }
      <div  className="content-wrapper">

    <h1 style={{textAlign:'left'}}>Users</h1>
    <br/>
    <br/>

    <Link to={'/AddUser'} style={{left:isMobile?'-275px':''}} className='New-Order-button btn btn-primary' >Add User</Link>

    <div className="Home-table">

<table className="table table-striped">
    <thead>
      <tr>
        {/* <!-- <th scope="col">P.Id</th> --> */}
        <th scope="col">User Id</th>
        <th scope="col">User Name</th>
        <th scope="col">User Mob</th>
        {/* <!-- <th scope="col">Price</th> --> */}
        <th scope="col">User Password</th>
        
        {/* <th scope="col"></th> */}
        {/* <th scope="col"></th> */}
        
      </tr>
    </thead>
    <tbody>
        {
            usersData.map((users)=>(
                <tr key={users.userId}>

        <td>{users.userId}</td>
        <td>{users.userName}</td>
        <td>{users.mobile}</td>
     
        <td className="prod-desc-tab" style={{width:'150px' , overflowX:'scroll'}}>{users.password}</td>
     
        
        {/* <td><Link to={`/EditUser/${users.userId}`} className="btn btn-warning">Edit</Link></td> */}
        {/* <td><button onClick={()=>DeleteUser(users.userId)} type="button" className="btn btn-danger">Remove</button></td> */}
      </tr>
            ))
        }
      
      
    </tbody>
  </table>

</div>

</div>
</div>
    </div>
  )
}

export default UserManagement