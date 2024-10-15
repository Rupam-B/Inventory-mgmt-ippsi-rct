import React, { useState } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { environment } from '../../environment';

const EditUser = () => {

    const { userId } = useParams();
    const navigate = useNavigate();
    const baseUrl = environment.baseUrl
    const token = localStorage.getItem('ipssi_Jwt')
   
    const [userChName, setUserChName] = useState('')
    const [userChMobile, setUserChMobile] = useState()
    const [userChPassword, setUserChPassword] = useState('')

    const SaveEdit = () =>{
        axios.put(`${baseUrl}/updateUser/${parseInt(userId)}`, {
            userId :userId,
            userName:userChName,
            mobile:userChMobile,
            password:userChPassword
        },
        {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        })
        .then(resp=>{
            // console.log(resp)
            alert("Successfully updated")
            navigate('/Users')

        })
        .catch(err=>{
            console.log(err)
        })
    }

    
    


  return (
    <div className='main-container'>
            <Sidebar />

            <div className="content">
                <div className="content-wrapper">


                    <h1 style={{ textAlign: 'left' }}>Edit User</h1>
                    <br />
                    <br />

                    <div className="mask d-flex align-items-center h-100 ">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card" >
                                        <div style={{textAlign:'left'}} className="card-body p-5">
                                            {/* <h3 className="text-uppercase text-start mb-2">Add Product</h3> */}

                                            <form >

                                                <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example3cg">User Name</label>
                                                    <input onChange={(e)=>setUserChName(e.target.value)} type="text" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example4cg">Mobile</label>
                                                    <input onChange={(e)=>setUserChMobile(e.target.value)} type="number" id="form3Example4cg" className="form-control form-control-md" name="ProductCategory" />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label fw-bold" htmlFor="form3Example4cdg">Password</label>
                                                    <input onChange={(e)=>setUserChPassword(e.target.value)} type="text" id="form3Example4cdg" className="form-control form-control-md" name="ProductQuantity" />
                                                </div>


                                                <div className="d-flex justify-content-center">
                                                    <button onClick={SaveEdit} type='button' data-mdb-button-init
                                                        data-mdb-ripple-init className="btn btn-primary">Save Changes</button>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>

        </div>
  )
}

export default EditUser