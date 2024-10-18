import React, { useState, useEffect } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import { environment } from '../../environment'
import axios from 'axios'

import '../../css/VendorMaster.css'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'
import { toast } from 'react-toastify'

const VendorMaster = () => {

  const navigate = useNavigate();
  const [ifLoader, setIfLoader] = useState(false)


  const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
  const baseUrl = environment.baseUrl
  const token = localStorage.getItem('ipssi_Jwt')

  const [vendors, setVendors] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [vendorName, setVendorName] = useState('')
  const [vendorAddress, setVendorAddress] = useState('')
  const [vendorMobile, setVendorMobile] = useState()

  const showModalFunc = () => {
    setShowModal(!showModal)
  }

  const AddVendor = () => {
    setIfLoader(true)
    axios.post(`${baseUrl}/addVendor`, {
      vendorName: vendorName,
      vendorAddress: vendorAddress,
      vendorMobile: vendorMobile
    }
      , {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => {
        setIfLoader(false)
        console.log(`Vendor added successfully`);
        setShowModal(false)
        navigate('/VendorMaster')

      })
      .catch(err => {
        setIfLoader(false)
        console.log(err);
        toast.error(err.message)
      });
  }

  useEffect(() => {
    setIfLoader(true)
    axios.get(`${baseUrl}/vendors`, {
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
                <label className="form-label fw-bold" htmlFor="form3Example3cg">Vendor Name</label>
                <input onChange={(e) => setVendorName(e.target.value)} type="text" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
              </div>

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label fw-bold" htmlFor="form3Example4cg">Vendor address</label>
                <input onChange={(e) => setVendorAddress(e.target.value)} type="text" id="form3Example4cg" className="form-control form-control-md" name="ProductCategory" />
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label fw-bold" htmlFor="form3Example4cdg">Vendor Mobile</label>
                <input onChange={(e) => setVendorMobile(e.target.value)} type="text" id="form3Example4cdg" className="form-control form-control-md" name="ProductQuantity" />
              </div>



              <div className="d-flex justify-content-center">
                <button onClick={AddVendor} type="button" data-mdb-button-init
                  data-mdb-ripple-init className="btn btn-primary">Add Vendor</button>
              </div>

            </form>
          </div>

          {/* ------------------------- */}

          <h1 style={{ textAlign: 'left' }}>Vendors</h1>
          <br />
          <br />

          <button onClick={showModalFunc} className='New-Order-button btn btn-primary' style={{ position: 'absolute', right: '20px', top: '100px' }}>Add Vendor</button>

          <div className="Home-table">

            {
              vendors.length > 0 ?

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Vendor Id</th>
                      <th scope="col">Vendor Name</th>
                      <th scope="col">Vendor Address</th>
                      <th scope="col">Vendor Mobile</th>
                      {/* <th scope="col">Date Generated</th>
        <th scope="col">category</th>
        <th scope="col">Status</th> */}
                      {/* <th scope="col"></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      vendors.map((stocks) => (
                        <tr key={stocks.vendorId}>
                          <th scope="row">{stocks.vendorId}</th>
                          <td>{stocks.vendorName}</td>
                          <td>{stocks.vendorAddress}</td>
                          <td>{stocks.vendorMobile}</td>
                          {/* <td>{stocks.price}</td> */}
                          {/* <td  className="prod-desc-tab">{stocks.description}</td> */}
                          {/* <td><button  className="btn btn-warning" >In Transit</button></td> */}
                          {/* <td><button  className="btn btn-danger">Delete</button></td> */}
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
                :
                <h1>No Vendors to Show</h1>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default VendorMaster