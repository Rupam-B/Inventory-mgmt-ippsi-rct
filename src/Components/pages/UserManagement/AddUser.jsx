import React, { useState } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import axios from 'axios';
import { environment } from '../../environment';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {

    const navigate = useNavigate();
    const baseUrl = environment.baseUrl
    // const token = localStorage.getItem('ipssi_Jwt')
   
    const [userChName, setUserChName] = useState('')
    const [userChMobile, setUserChMobile] = useState()
    const [userChPassword, setUserChPassword] = useState('')

    const [ifLoader, setIfLoader] = useState(false)



    const AddUser = () =>{
        setIfLoader(true)
        axios.post(`${baseUrl}/addUser`, {
            userName:userChName,
            mobile:userChMobile,
            password:userChPassword
        },
        {
            headers:{
                'Content-Type':'application/json',
                
            }
        })
        .then(resp=>{
            // console.log(resp)
            alert("Successfully Added")
            navigate('/Users')
            setIfLoader(false)

        })
        .catch(err=>{
            console.log(err)
            setIfLoader(false)
        })
    }


  return (
<div className='main-container'>
            <Sidebar />

            <div className="content">
            {
          ifLoader ?
            <Loader /> : ''
        }
                <div className="content-wrapper">


                    <h1 style={{ textAlign: 'left' }}>Add User</h1>
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
                                                    <button onClick={AddUser} type="button" data-mdb-button-init
                                                        data-mdb-ripple-init className="btn btn-primary">Add</button>
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

export default AddUser