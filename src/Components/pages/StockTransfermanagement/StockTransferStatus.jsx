import React, { useState, useEffect } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import { environment } from '../../environment'
import axios from 'axios'
import Loader from '../Loader'
import { toast } from 'react-toastify'

const StockTransferStatus = () => {


  const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
  const baseUrl = environment.baseUrl
  const token = localStorage.getItem('ipssi_Jwt')

  const [userStocks, setUserStocks] = useState([])
  const [reload, setReload] = useState(false)

  
  const [ifLoader, setIfLoader] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [trsfID, setTrsfID] = useState(null)
  const [cancellationSerialNumb, setCancellationSerialNumb] = useState('')
  const [checkcancellationSerialNumb, setCheckcancellationSerialNumb] = useState('')

  // useEffect(()=>{
  //   axios.get(`${baseUrl}/products/user/${fetchUserId}`, {
  //       headers:{
  //         "Content-Type":"application/json",
  //         Authorization : `Bearer ${token}`
  //       }
  //   }
  // )
  // .then((resp)=>{
  //   // console.log(resp.data)
  //   setUserStocks(resp.data)
  // })
  // .catch((error)=>{
  //   console.log(error)
  // })
  // },[token,baseUrl,fetchUserId])

  const openCancelModal = (serialNo,trsfId)=>{
    setTrsfID(trsfId)
    setShowModal(!showModal)
    setCheckcancellationSerialNumb(serialNo)
  }
  const ConfirmCancelModal =async ()=>{
    
    if(cancellationSerialNumb===checkcancellationSerialNumb&&trsfID){
      try {
        setIfLoader(true)
          await axios.delete(`${baseUrl}/transfer/deleteTransfer/${trsfID}`, {
            headers: {
              "Content-Type": "text/plain",
              Authorization: `Bearer ${token}`
            }
          });
          setIfLoader(false)
          toast.success("Transfer Deleted and Restored to account Successfully!");
          setShowModal(false)
          setReload(!reload)
          
      } catch (error) {
        setIfLoader(false)
          toast.error("Error Deleting transfer");
          setShowModal(false)
      }
    }
    else{
      toast.error("Wrong serial Number/Transfer Id")
    }
  }

  useEffect(() => {
    setIfLoader(true)
    axios.get(`${baseUrl}/transfer/source/${fetchUserId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    )
      .then((resp) => {
        setIfLoader(false)
        // console.log(resp.data)
        setUserStocks(resp.data)
      })
      .catch((error) => {
        setIfLoader(false)
        console.log(error)
      })
  }, [token, baseUrl, fetchUserId,reload])




  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
      {
          ifLoader ?
            <Loader /> : ''
        }
        <div className="content-wrapper">

                    {/* Modal */}
                    <div className={showModal ? 'show-add-vendor-modal' : 'hide-add-vendor-modal'}>
            <form >

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label fw-bold" htmlFor="form3Example3cg">Enter Serial No.</label>
                <input onChange={(e)=>setCancellationSerialNumb(e.target.value)}  type="text" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
              </div>

              <div className="d-flex justify-content-center">
                <button onClick={ConfirmCancelModal}  type="button" data-mdb-button-init
                  data-mdb-ripple-init className="btn btn-primary">Confirm Cancellation</button>
              </div>

            </form>
          </div>
          {/* ------- */}

          <h1 style={{ textAlign: 'left' }}>Stock Transfer Status</h1>
          <br />
          <br />

          {/* <Link to={'/AddProductPage'} className='New-Order-button btn btn-primary' style={{position:'absolute', right:'20px', top:'100px'}}>Add Product</Link> */}

          <div className="Home-table">

            {
              userStocks.length > 0 ?

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Transfer Id</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Serial Number</th>
                      <th scope="col">Destination</th>
                      <th scope="col">Purchase Date</th>
                      <th scope="col">Vendor</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                      {/* <th scope="col"></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userStocks.map((stocks) => (
                        <tr key={stocks.transferId}>
                          <td>{stocks.transferId}</td>
                          <td>{stocks.productMaster.productModel}</td>
                          <td>{stocks.serialNumber}</td>
                          <td>
                            {stocks.destinationUser.userName}
                          </td>

                          <td>{stocks.productPurchaseDate}</td>
                          <td className="prod-desc-tab">{stocks.productMaster.productVendor}</td>
                          <td><button style={{width:'120px'}} className="btn btn-warning" >In-Transit</button></td>
                          <td><button style={{width:'80px'}} onClick={()=>openCancelModal(stocks.serialNumber,stocks.transferId)} className="btn btn-danger" >Cancel</button></td>
                          {/* <td><button  className="btn btn-danger">Delete</button></td> */}
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
                :
                <h1>No Transfers to Show</h1>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default StockTransferStatus