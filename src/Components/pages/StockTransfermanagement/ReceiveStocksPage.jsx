import React, { useState, useEffect } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import { environment } from '../../environment'
import axios from 'axios'
import { toast } from 'react-toastify';
import Loader from '../Loader';

const ReceiveStocksPage = () => {

  const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
  const baseUrl = environment.baseUrl
  const token = localStorage.getItem('ipssi_Jwt')

  const [userStocks, setUserStocks] = useState([])
  const [ifLoader, setIfLoader] = useState(false)


  const [reload, setReload] = useState(false)


    const markAsReceived = async (transferId) => {
      const confirm = window.confirm("Do you want to mark this transfer as received?");
      if (confirm) {
          try {
            setIfLoader(true)
              await axios.put(`${baseUrl}/transfer/mark-as-received/${transferId}`,null, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              });
              setIfLoader(false)
              toast.success("Transfer marked as received!");
              setReload(!reload)
              
          } catch (error) {
            setIfLoader(false)
              toast.error("Error receiving transfer");
          }
      }
  };

  useEffect(() => {
    setIfLoader(true)
    axios.get(`${baseUrl}/transfer/destination/${fetchUserId}`, {
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

          <h1 style={{ textAlign: 'left' }}>Receive Incoming Stocks</h1>
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
                      <th scope="col">Coming From</th>
                      <th scope="col">Purchase Date</th>
                      <th scope="col">Vendor</th>
                      <th scope="col">Action</th>
                      {/* <th scope="col"></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userStocks.map((stocks) => (
                        <tr key={stocks.transferId}>
                          <th scope="row">{stocks.transferId}</th>
                          <td>{stocks.productMaster.productModel}</td>
                          <td>{stocks.serialNumber}</td>
                          <td>{stocks.sourceUser.userName}</td>
                          <td>{stocks.productPurchaseDate}</td>
                          <td className="prod-desc-tab">{stocks.productMaster.productVendor}</td>
                          <td><button style={{width:'150px'}} onClick={()=>markAsReceived(stocks.transferId)} className="btn btn-success" >Mark as Received</button></td>
                          {/* <td><button  className="btn btn-danger">Delete</button></td> */}
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
                :
                <h1>No Incoming Stocks</h1>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default ReceiveStocksPage