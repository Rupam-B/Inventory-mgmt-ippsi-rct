import React, { useState, useEffect } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import { environment } from '../../environment'
import axios from 'axios'

const StockTransferStatus = () => {


  const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
  const baseUrl = environment.baseUrl
  const token = localStorage.getItem('ipssi_Jwt')

  const [userStocks, setUserStocks] = useState([])

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


  useEffect(() => {
    axios.get(`${baseUrl}/transfer/source/${fetchUserId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    )
      .then((resp) => {
        console.log(resp.data)
        setUserStocks(resp.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token, baseUrl, fetchUserId])




  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <div className="content-wrapper">

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
                          <td>
                            {stocks.destinationUser.userName}
                          </td>

                          <td>{stocks.productPurchaseDate}</td>
                          <td className="prod-desc-tab">{stocks.productMaster.productVendor}</td>
                          <td><button className="btn btn-warning" >In Transit</button></td>
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