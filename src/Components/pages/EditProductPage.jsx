import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios'
import { environment } from '../environment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Loader from './Loader'

const EditProductPage = () => {

  // const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
  const baseUrl = environment.baseUrl
  const token = localStorage.getItem('ipssi_Jwt')
  const navigate = useNavigate();

  const {id} = useParams();

  const fetchStockId = parseInt(id)

  const [ifLoader, setIfLoader] = useState(false)



  const [products, setProducts] = useState([])
  const [productsIdselect, setProductsIdSelect] = useState(null)
  const [usersIdselect, setUsersIdSelect] = useState(null)
  const [usersData, setUsersData] = useState(null) 
  const [deviceStatus, setDeviceStatus] = useState([]) 
  const [deviceStatusId, setDeviceStatusId] = useState() 
  const [prodDate, setProdDate] = useState(null) 
  const [serialNumber, setSerialNumber] = useState(null) 

  const [devicedescription, setDeviceDescription] = useState()


  const [fetchedstock, setFetchedStock] = useState()



  const AddProduct = () => {
    if(usersIdselect&&productsIdselect&&serialNumber&&deviceStatusId&&devicedescription&&prodDate){
    setIfLoader(true)
    axios.put(`${baseUrl}/api/stocks/update/${parseInt(fetchedstock.stockId)}`, {
        usersId: usersIdselect,
        productId: productsIdselect,
        serialNumber: serialNumber,
        statusId:parseInt(deviceStatusId),
        description:devicedescription,
        productPurchaseDate: prodDate
    },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            setIfLoader(false)
            console.log(resp)
            toast.success("Successfully Added")
            navigate('/ManageStock')

        })
        .catch(err => {
            setIfLoader(false)
            console.log(err)
            toast.error(err.message + "or wrong Data Entry")
        })
    }
    else{
        toast.error("please Fill all Details and Add")
    }
}


useEffect(()=>{
  axios.get( `${baseUrl}/api/stocks/${fetchStockId}` , {
      headers:{
          'Content-Type':'application/json',
          Authorization : `Bearer ${token}`
      }
  })
  .then(resp =>{
      console.log(resp.data)
      setFetchedStock(resp.data)
  })
  .catch(err=>{
      console.log(err)
  })
},[baseUrl,token,fetchStockId])


useEffect(() => {
  axios.get(`${baseUrl}/allDeviceStatus`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => {
      // console.log(resp.data)
      setDeviceStatus(resp.data)
      
    })
    .catch(err => {
      console.log(err)
      toast.error(err.message)
    })
}, [baseUrl, token])


useEffect(()=>{
  axios.get( `${baseUrl}/users` , {
      headers:{
          'Content-Type':'application/json',
          Authorization : `Bearer ${token}`
      }
  })
  .then(resp =>{
      // console.log(resp.data)
      setUsersData(resp.data)
  })
  .catch(err=>{
      console.log(err)
  })
},[baseUrl,token])


useEffect(()=>{
  axios.get(`${baseUrl}/api/product-master/all`, {
      headers:{
        "Content-Type":"application/json",
        Authorization : `Bearer ${token}`
      }
  }
)
.then((resp)=>{
  // console.log(resp.data)
  setProducts(resp.data)
})
.catch((error)=>{
  console.log(error)
})
},[token,baseUrl])



  return (
    <div className='main-container'>
            <Sidebar />

            <div className="content">
            {
          ifLoader ?
            <Loader /> : ''
        }
                <div className="content-wrapper">


                    <h1 style={{ textAlign: 'left' }}>Edit Product</h1>
                    <br />
                    <br />

                    <div className="mask d-flex align-items-center h-100 ">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card" >
                                        <div style={{ textAlign: 'left' }} className="card-body p-5">
                                            {/* <h3 className="text-uppercase text-start mb-2">Add Product</h3> */}

                                            <form >

                                                <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example3cg">Choose Product</label>

                                                    <select style={{ width: '60%' }} onChange={(e) => setProductsIdSelect(e.target.value)} className='form-control form-control-md' name="vendorSelect" id="">
                                                        <option value="">Select a Product</option>
                                                        {
                                                            products ? products.map((vens) => (
                                                                <option key={vens.productId} value={vens.productId}>{vens.productModel}</option>
                                                            )) :
                                                                <option value="">No Products Available</option>
                                                        }
                                                    </select>
                                                </div>
                                                <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example3cg">Choose User</label>
                                                    <select
                                                        style={{ width: '60%' }}
                                                        onChange={(e) => setUsersIdSelect(e.target.value)}
                                                        className='form-control form-control-md'
                                                        name="vendorSelect"
                                                        id=""
                                                    >
                                                        {/* Placeholder option */}
                                                        <option value="">Select an User</option>

                                                        {usersData&&usersData.length > 0 ? (
                                                            usersData.map((vens) => (
                                                                <option key={vens.userId} value={vens.userId}>
                                                                    {vens.userName}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option value="">No users Available</option>
                                                        )}
                                                    </select>


                                                </div>

                                                {/* <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example3cg">Choose Category</label>

                                                    <select style={{ width: '60%' }} onChange={(e) => setGetcategoryName(e.target.value)} className='form-control form-control-md' name="categorySelect" id="">
                                                        <option value="">Select a Category</option>
                                                        {
                                                            categories ? categories.map((vens) => (
                                                                <option key={vens.categoryId} value={vens.categoryName}>{vens.categoryName}</option>
                                                            )) :
                                                                <option value="">No Category Available</option>
                                                        }
                                                    </select>
                                                </div> */}


                                                <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example3cg">Serial Number</label>
                                                    <input onChange={(e) => setSerialNumber(e.target.value)} type="text" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example3cg">Choose Status</label>
                                                    <select
                                                        style={{ width: '60%' }}
                                                        onChange={(e) => setDeviceStatusId(e.target.value)}
                                                        className='form-control form-control-md'
                                                        name="vendorSelect"
                                                        id=""
                                                    >
                                                        {/* Placeholder option */}
                                                        <option value="">Select Status</option>

                                                        {deviceStatus&&deviceStatus.length > 0 ? (
                                                            deviceStatus.map((vens) => (
                                                                <option key={vens.statusID} value={vens.statusID}>
                                                                    {vens.status}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option value="">No Status Available</option>
                                                        )}
                                                    </select>


                                                </div>
                                                <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example3cg">Description</label>
                                                    <input className="form-control form-control-md" type="text" onChange={(e)=>setDeviceDescription(e.target.value)} />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label fw-bold" htmlFor="form3Example4cdg">Purchase Date</label>
                                                    <input
                                                        onChange={(e) => setProdDate(e.target.value)}
                                                        type="date"
                                                        id="form3Example4cdg"
                                                        className="form-control form-control-md"
                                                        name="ProductDate"
                                                    />
                                                </div> 
                                                        

                                                <div className="d-flex justify-content-center">
                                                    <button onClick={AddProduct} type="button" data-mdb-button-init
                                                        data-mdb-ripple-init className="btn btn-primary">Save</button>
                                                        <Link  style={{marginLeft:'10px'}} to={'/ManageStock'} type="button" data-mdb-button-init
                                                        data-mdb-ripple-init className="btn btn-primary">Cancel</Link>
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

export default EditProductPage