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
    const [showModal, setShowModal] = useState(false)


    const [preFilleduId, setPreFilleduId] = useState(null)
    const [preFilledName, setPreFilledName] = useState('')
    const [preFilledPassword, setPreFilledPassword] = useState('')
    const [preFilledMobile, setPreFilledMobile] = useState('')
    const [preFilledlocation, setPreFilledLocation] = useState('')
    




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
            // console.log(resp.data)
            setUsersData(resp.data)
        })
        .catch(err=>{
            setIfLoader(false)
            console.log(err)
        })
    },[baseUrl,token,showModal])


    const EditUser = () =>{
      setIfLoader(true)
      axios.put(`${baseUrl}/updateUser/${preFilleduId}`, {
          userName:preFilledName,
          mobile:preFilledMobile,
          password:preFilledPassword,
          location:preFilledlocation
      },
      {
          headers:{
              'Content-Type':'application/json',
               Authorization : `Bearer ${token}`
              
          }
      })
      .then(resp=>{
          // console.log(resp)
          alert("Successfully Updated")
          setShowModal(false)
          setIfLoader(false)

      })
      .catch(err=>{
          console.log(err)
          setIfLoader(false)
          setShowModal(false)
      })
  }

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


        const openEditFunc = (uId,uname,upswd,umob,uloc)=>{

          setShowModal(true);  
          setPreFilleduId(uId);  
          setPreFilledName(uname);  
          setPreFilledPassword(upswd);  
          setPreFilledMobile(umob); 
          setPreFilledLocation(uloc);

        }
    


  return (
    <div className='main-container'>
        <Sidebar/>


        <div className="content">
        {
          ifLoader ?
            <Loader /> : ''
        }
      <div  className="content-wrapper">

        {/* Modal */}
        <div className={showModal ? 'show-add-vendor-modal' : 'hide-add-vendor-modal'}>
            <form >

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label fw-bold" htmlFor="form3Example3cg">User Name</label>
                <input  value={preFilledName&&preFilledName} onChange={(e) => setPreFilledName(e.target.value)} type="text" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
              </div>
              
              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label fw-bold" htmlFor="form3Example3cg">Password</label>
                <input value={preFilledPassword} onChange={(e) => setPreFilledPassword(e.target.value)}  type="Password" id="form3Example2cg" className="form-control form-control-md" name="ProductDescription" />
              </div>
              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label fw-bold" htmlFor="form3Example3cg">mobile</label>
                <input value={preFilledMobile&&preFilledMobile} onChange={(e) => setPreFilledMobile(e.target.value)} type="text" id="form3Example1cg" className="form-control form-control-md" name="ProductDescription" />
              </div>
              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label fw-bold" htmlFor="form3Example3cg">Location</label>
                <input value={preFilledlocation&&preFilledlocation} onChange={(e) => setPreFilledLocation(e.target.value)} type="text" id="form3Example4cg" className="form-control form-control-md" name="ProductDescription" />
              </div>

              <div className="d-flex justify-content-center">
                <button onClick={EditUser} type="button" data-mdb-button-init
                  data-mdb-ripple-init className="btn btn-primary">Save</button>
              </div>

            </form>
          </div>
          {/* ------- */}

    <h1 style={{textAlign:'left'}}>Users</h1>
    <br/>
    <br/>
    
    <div className='Functional-Buttons'>
    <Link to={'/AddUser'} style={{left:isMobile?'-275px':''}} className='New-Order-button btn btn-primary' >Add User</Link>
    </div>

    <div className="Home-table">

<table className="table table-striped">
    <thead>
      <tr>
        {/* <!-- <th scope="col">P.Id</th> --> */}
        <th scope="col">User Id</th>
        <th scope="col">User Name</th>
        <th scope="col">User Mob</th>
        <th scope="col">User Loaction</th>
        <th scope="col"></th>
        {/* <!-- <th scope="col">Price</th> --> */}
        {/* <th scope="col">User Password</th> */}
        
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
        <td>{users.location}</td>

     
        {/* <td className="prod-desc-tab" style={{width:'150px' , overflowX:'scroll'}}>{users.password}</td> */}
     
        
        <td><button onClick={()=>openEditFunc(users.userId,users.userName,users.password,users.mobile,users.location)}  className="btn btn-warning">Edit</button></td>
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