import React, { useEffect, useState } from 'react'
import '../css/ManageStock.css'
import '../css/root.css'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios'
import { environment } from '../environment'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const ProductMaster = () => {

    
  const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
  const baseUrl = environment.baseUrl
  const token = localStorage.getItem('ipssi_Jwt')

  const [userStocks , setUserStocks] = useState([])
  const [ifLoader, setIfLoader] = useState(false)
//   const [askQuantity , setAskQuantity] = useState(0)

//   const [showModal , setShowModal] = useState(false)
//   const [addOrSub , setAddOrSub] = useState("true")

//   const[presntProId, setPresentProId] = useState()
//   const[presntProQty, setPresentProQty] = useState()


  // const[reload, setReload] = useState(false)
  const [isMobile , setIsMobile] = useState(false)

    
//   const showModalFunc = (proId,proQty) => {
//     setShowModal(!showModal)
//     if(!showModal){
//       // console.log(proId)
//       setPresentProId(proId)
//       setPresentProQty(proQty)
//     }
//   }


//   const AddQuantityFunc = () => {
//     if (isNaN(askQuantity) || parseInt(askQuantity) < 0) {
//       console.error("Invalid quantity");
//       return;
//     }
    
//     const ThisnewProductQty = addOrSub==="true"
//       ? parseInt(presntProQty) + parseInt(askQuantity) 
//       :  Math.max(parseInt(presntProQty) - parseInt(askQuantity), 0);
  
//     console.log(ThisnewProductQty);
  
//     axios.put(`${baseUrl}/updateProductQuantity/${presntProId}/user/${fetchUserId}?newProductQty=${ThisnewProductQty}`,null, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       }
//     })
//     .then(resp => {
//       console.log(`Edit added successfully`);
//       setShowModal(false);
//       setAskQuantity(0)
//     })
//     .catch(err => {
//       console.log(err);
//       setShowModal(false);
//     });
//   };
  

  // const DeleteDeviceFunc = (proId) => {

  //   const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  //   setIfLoader(true)
 
  //   if (confirmDelete) {
  //     axios.delete(`${baseUrl}/api/product-master/delete/${proId}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     .then(resp => {
  //       setIfLoader(false)
  //       alert(resp.data); 
  //       setReload(!reload)
  //     })
  //     .catch(err => {
  //       setIfLoader(false)
  //       console.log(err);
  //     });
  //   } else {
      
  //     console.log("Deletion canceled by the user.");
  //   }
  // };
  



  useEffect(()=>{
    setIfLoader(true)
    axios.get(`${baseUrl}/api/product-master/all`, {
        headers:{
          "Content-Type":"application/json",
          Authorization : `Bearer ${token}`
        }
    }
  )
  .then((resp)=>{
    // console.log(resp.data)
    setIfLoader(false)
    setUserStocks(resp.data)
  })
  .catch((error)=>{
    setIfLoader(false)
    console.log(error)
  })
  },[token,baseUrl,fetchUserId])



  
        // Set isMobile based on screen size
        useEffect(() => {
          const handleResize = () => {
              setIsMobile(window.innerWidth < 500);
          };
  
          
          handleResize();
  
          
          window.addEventListener('resize', handleResize);
  
          
          return () => {
              window.removeEventListener('resize', handleResize);
          };
      }, []);


  return (
    <div  className="main-container">
        <Sidebar />
        <div className="content">
        {
          ifLoader ?
            <Loader /> : ''
        }
      <div  className="content-wrapper">


        {/* -----------Modal----------- */}
{/* 
        <div className={showModal ? 'show-add-vendor-modal' : 'hide-add-vendor-modal'}>
            <form >

            <div data-mdb-input-init className="form-outline mb-3">
            <select style={{ width: '60%' }} onChange={(e) => setAddOrSub(e.target.value)} className='form-control form-control-md' name="vendorSelect" id="">
                      <option value={true}>+</option>
                      <option value={false}>-</option>              
            </select>
            </div>

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label fw-bold" htmlFor="form3Example3cg">Quantity</label>
                <input value={askQuantity} onChange={(e) => setAskQuantity(e.target.value)} type="number" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
              </div>



              <div className="d-flex justify-content-center">
                <button onClick={AddQuantityFunc}  type="button" data-mdb-button-init
                  data-mdb-ripple-init className="btn btn-primary">Save</button>
              </div>

            </form>
          </div> */}

    <h1 style={{textAlign:'left'}}>Product master</h1>
    <br/>
    <br/>


    <div className='Functional-Buttons'>
    <Link to={'/AddDevicePage'} style={{left:isMobile?'-140px':''}} className='New-Order-button btn btn-primary'>Add Device</Link>
    </div>

<div  className="Home-table">

  {
    userStocks.length>0?

<table  className="table table-striped">
    <thead>
      <tr>
        <th scope="col">D.Id</th>
        <th scope="col">Device Name</th>
        <th scope="col">Vendor</th>
        <th scope="col">Category</th>
        {/* <th scope="col">Purchase Date</th> */}
        <th scope="col"></th>
        {/* <th scope="col"></th> */}
        {/* <th scope="col"></th> */}
      </tr>
    </thead>
    <tbody>
      {
        userStocks.map((stocks)=>(
          <tr key={stocks.productId}>
        <td>{stocks.productId}</td>
        <td>{stocks.productModel}</td>
        <td>{stocks.productVendor}</td>
        <td>{stocks.productCategory}</td>
        <td>{stocks.productPurchaseDate}</td>
        {/* <td><button onClick={()=>showModalFunc(stocks.productId,stocks.quantity)}  className="btn btn-warning" >Edit</button></td> */}
        {/* <td><button onClick={()=>DeleteDeviceFunc(stocks.productId)}   className="btn btn-danger">Delete</button></td> */}
        {/* <td><button  className="btn btn-success">Full Details</button></td> */}
      </tr>
        ))
      }
      
      
    </tbody>
  </table>
  :
  <h1>No Products To Show !</h1>
}
</div>

</div>
</div>
</div>
  )
}

export default ProductMaster