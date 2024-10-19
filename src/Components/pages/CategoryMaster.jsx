
import React, { useState, useEffect } from 'react'

import { environment } from '../environment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import Loader from './Loader'
import { toast } from 'react-toastify'

const CategoryMaster = () => {
    
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
        axios.get(`${baseUrl}/allCategories`, {
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
    setIfLoader(true)
    axios.post(`${baseUrl}/addCategory`, {
      categoryName: categoryName,
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
        navigate('/CategoryMaster')

      })
      .catch(err => {
        setIfLoader(false)
        console.log(err);
      });
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
                <label className="form-label fw-bold" htmlFor="form3Example3cg">Category Name</label>
                <input onChange={(e) => setCategoryName(e.target.value)} type="text" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
              </div>



              <div className="d-flex justify-content-center">
                <button onClick={AddCaetgory} type="button" data-mdb-button-init
                  data-mdb-ripple-init className="btn btn-primary">Add Category</button>
              </div>

            </form>
          </div>

          {/* ------------------------- */}

          <h1 style={{ textAlign: 'left' }}>Categories</h1>
          <br />
          <br />

          <button onClick={showModalFunc} className='New-Order-button btn btn-primary' >Add Category</button>

          <div className="Home-table">

            {
              vendors.length > 0 ?

                <table className="table table-striped model-master-table">
                  <thead>
                    <tr>
                      {/* <th scope="col">Vendor Id</th> */}
                      <th scope="col">Category Name</th>
                      {/* <th scope="col">Vendor Address</th> */}
                      {/* <th scope="col">Vendor Mobile</th> */}
                      {/* <th scope="col">Date Generated</th>
        <th scope="col">category</th>
        <th scope="col">Status</th> */}
                      {/* <th scope="col"></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      vendors.map((stocks) => (
                        <tr key={stocks.categoryId}>
                          {/* <th scope="row">{stocks.vendorId}</th> */}
                          <td>{stocks.categoryName}</td>
                          {/* <td>{stocks.vendorAddress}</td> */}
                          {/* <td>{stocks.vendorMobile}</td> */}
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
                <h1>No Category to Show</h1>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default CategoryMaster