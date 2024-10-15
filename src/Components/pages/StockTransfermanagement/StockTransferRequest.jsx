import React, { useEffect, useState } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import { environment } from '../../environment'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const StockTransferRequest = () => {
  const navigate = useNavigate();
  const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
  const baseUrl = environment.baseUrl
  const token = localStorage.getItem('ipssi_Jwt')

  const [userStocks, setUserStocks] = useState([])
  const [usersData, setUsersData] = useState([])

  const [prodId, setProdId] = useState()
  const [destinationId, setDestinationId] = useState()
  const [trasfQty, setTranfQty] = useState()
  const [transDesc, setTransDesc] = useState()



  const GenerateTransfer = () => {

    if (prodId && fetchUserId && destinationId && trasfQty && transDesc) {
      axios.post(`${baseUrl}/transfer/create`, {
        productId:parseInt(prodId),
        sourceId:parseInt(fetchUserId),
        destinationId:parseInt(destinationId),
        quantity:parseInt(trasfQty),
        description:transDesc
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then(resp => {
          toast.success("Transfer Generated :" +resp.data.status)
          navigate('/StockTransferStatus')

        })
        .catch(err => {
          console.log(err);
          toast.error(err.message + "\n Or Insufficient Quantity in stock")
        });

    }
    else {
      alert("Filling All Details is mandatory")
    }
  }

  useEffect(() => {
    axios.get(`${baseUrl}/products/user/${fetchUserId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        // console.log(resp)
        setUserStocks(resp.data)
      })
      .catch(err => {
        console.error(err);
      }
      )
  }, [baseUrl, fetchUserId, token])



  useEffect(() => {
    axios.get(`${baseUrl}/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        // console.log(resp.data)
        setUsersData(resp.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [baseUrl, token])

  return (
    <div className='main-container'>
      <Sidebar />


      <div className="content">
        <div className="content-wrapper">

          <h1 style={{ textAlign: 'left' }}>Generate Stock Transfer</h1>
          <br />
          <br />

          {/* <Link  className='New-Order-button btn btn-primary' style={{position:'absolute', right:'20px', top:'100px'}}>New Request</Link> */}

          <div className="mask d-flex align-items-center h-100 ">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card" >
                    <div style={{ textAlign: 'left' }} className="card-body p-5">
                      {/* <h3 className="text-uppercase text-start mb-2">Add Product</h3> */}

                      <form >

                        <div data-mdb-input-init className="form-outline mb-3">
                          <label className="form-label fw-bold" htmlFor="form3Example1cg">Select Device</label>
                          <select onChange={(e) => setProdId(e.target.value)} className="form-control form-control-md">
                            <option >Select Device</option>
                            {
                              userStocks.length > 0 ?
                                userStocks.map((items) => (
                                  <option key={items.productId} value={items.productId}>{items.name}</option>

                                ))
                                :
                                <option></option>

                            }
                          </select>

                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label className="form-label fw-bold" htmlFor="form3Example4cdg">Choose Transffer destination</label>
                          <select onChange={(e) => setDestinationId(e.target.value)} className="form-control form-control-md">
                            <option>Select Destination</option>
                            {
                              usersData.length > 0 ?
                                usersData.map((items) => (
                                  <option key={items.userId} value={items.userId}>{items.userName}</option>

                                ))
                                :
                                <option></option>

                            }
                          </select>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label className="form-label fw-bold" htmlFor="form3Example4cdg">Quantity</label>
                          <input onChange={(e) => setTranfQty(e.target.value)} type="number" id="form3Example4cdg" className="form-control form-control-md" name="ProductQuantity" />
                        </div>

                        <div data-mdb-input-init className="form-outline mb-3">
                          <label className="form-label fw-bold" htmlFor="form3Example3cg">Transffer Description</label>
                          <input onChange={(e) => setTransDesc(e.target.value)} type="text" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
                        </div>


                        <div className="d-flex justify-content-center">
                          <button
                            onClick={GenerateTransfer} type="button" data-mdb-button-init
                            data-mdb-ripple-init className="btn btn-primary">Generate Transffer</button>
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

export default StockTransferRequest