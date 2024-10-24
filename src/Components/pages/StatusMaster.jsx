
import React, { useState, useEffect } from 'react'

import { environment } from '../environment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import Loader from './Loader'
import { toast } from 'react-toastify'

const StatusMaster = () => {
    
  const navigate = useNavigate();


  const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
  const baseUrl = environment.baseUrl
  const token = localStorage.getItem('ipssi_Jwt')

  const [ifLoader, setIfLoader] = useState(false)

  const [vendors, setVendors] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [categoryName, setCategoryName] = useState('')

    
  const showModalFunc = () => {
    setShowModal(!showModal)
  }


    useEffect(() => {
      setIfLoader(true)
        axios.get(`${baseUrl}/allDeviceStatus`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        )
          .then((resp) => {
            setIfLoader(false)
            // console.log(resp.data)
            setVendors(resp.data)
          })
          .catch((error) => {
            setIfLoader(false)
            console.log(error)
            toast.error(error.message)
          })
      }, [token, baseUrl, fetchUserId, showModal])



      
  const AddCaetgory = () => {
    if(categoryName){
    setIfLoader(true)
    axios.post(`${baseUrl}/addStatus`, {
      status: categoryName,
    }
      , {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => {
        
        setIfLoader(false)
        console.log(`Status added successfully`);
        setShowModal(false)
        navigate('/StatusMaster')

      })
      .catch(err => {
        setIfLoader(false)
        console.log(err);
        toast.error(err.message)
      });
    }
    else{
        toast.error("Please Fill a category name")
    }
  }

  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
      {
          ifLoader ?
            <Loader /> : ''
        }
        <div className="content-wrapper">

          <div className={showModal ? 'show-add-vendor-modal' : 'hide-add-vendor-modal'}>
            <form >

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label fw-bold" htmlFor="form3Example3cg">Status Name</label>
                <input onChange={(e) => setCategoryName(e.target.value)} type="text" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
              </div>



              <div className="d-flex justify-content-center">
                <button onClick={AddCaetgory} type="button" data-mdb-button-init
                  data-mdb-ripple-init className="btn btn-primary">Add Status</button>
              </div>

            </form>
          </div>

          {/* ------------------------- */}

          <h1 style={{ textAlign: 'left' }}>Status</h1>
          <br />
          <br />
          
          <div className='Functional-Buttons'>
          <button onClick={showModalFunc} className='New-Order-button btn btn-primary' >Add Status</button>
          </div>

          <div className="Home-table">

            {
              vendors.length > 0 ?

                <table className="table table-striped model-master-table">
                  <thead>
                    <tr>
                      
                      <th scope="col">Status Id</th>
                      <th scope="col">Status Name</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {
                      vendors.map((stocks) => (
                        <tr key={stocks.statusID}>
                        
                          <td>{stocks.statusID}</td>
                          <td>{stocks.status}</td>
                          
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
                :
                <h1 className='Not-available-Heading'>No Status to Show</h1>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default StatusMaster