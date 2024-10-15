import React from 'react'
import '../../css/root.css'
import Sidebar from '../../sidebar/Sidebar'
import { Link } from 'react-router-dom'

const OrdersMainPage = () => {
  return (
    <div className='main-container'>
        <Sidebar/>


        <div className="content">
      <div  className="content-wrapper">

    <h1 style={{textAlign:'left'}}>Orders</h1>
    <br/>
    <br/>

    <Link to={'/PlaceOrderPage'} className='New-Order-button btn btn-primary' style={{position:'absolute', right:'20px', top:'100px'}}>New Order</Link>

<div  className="Home-table">
<table  className="table table-striped">
    <thead>
      <tr>
        <th scope="col">Order Id</th>
        <th scope="col">Product Name</th>
        <th scope="col">Qty</th>
        <th scope="col">Category</th>
        <th scope="col">Order To</th>
        <th scope="col">Desc</th>
        <th scope="col">Status</th>
        {/* <th scope="col"></th> */}
      </tr>
    </thead>
    <tbody>

    <tr >
        <th scope="row">1</th>
        <td>New Product</td>
        <td>30</td>
        <td>SECL</td>
        <td>Delhi Office</td>
        <td  className="prod-desc-tab">For Gevra</td>
        <td><button  className="btn btn-warning" >In Process</button></td>
        {/* <td><button  className="btn btn-danger">Delete</button></td> */}
      </tr>
      
    </tbody>
  </table>
 
</div>

</div>
</div>
    </div>
  )
}

export default OrdersMainPage