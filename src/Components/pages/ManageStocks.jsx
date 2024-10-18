import React, { useEffect, useState } from 'react'
import '../css/ManageStock.css'
import '../css/root.css'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios'
import { environment } from '../environment'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from './Loader'

const ManageStocks = () => {

  const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
  const baseUrl = environment.baseUrl
  const token = localStorage.getItem('ipssi_Jwt')
  const navigate = useNavigate();

  const [ifLoader, setIfLoader] = useState(false)

  const [selectedDevices, setSelectedDevices] = useState([]);
  const [userStocks, setUserStocks] = useState([])
  const [askQuantity, setAskQuantity] = useState(0)

  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [sourceDestination, setSourceDestination] = useState(null)
  const [usersData, setUsersData] = useState(null)
  const [addOrSub, setAddOrSub] = useState("true")

  const [presntProId, setPresentProId] = useState()
  const [presntProQty, setPresentProQty] = useState()


  const [reload, setReload] = useState(false)


  const handleSelectDevice = (imei) => {
    setSelectedDevices((prev) =>
      prev.includes(imei) ? prev.filter(id => id !== imei) : [...prev, imei]
    );
  };

  const handleCreateTransitRequest = async () => {
    setShowModal2(!showModal2)

    // console.log(selectedDevices)
  };

  const generateTransfer = async ()=>{
    if(selectedDevices.length>0 && fetchUserId&&sourceDestination){

      setIfLoader(true)

      await axios.post(`${baseUrl}/transfer/createTransfer`, {
        serialNumbers: selectedDevices,
        sourceUserId:fetchUserId, 
        destinationUserId: sourceDestination
    },
  {
    headers:{
      'Content-Type':'application/json',
      Authorization : `Bearer ${token}`
  }
  })
    .then((resp)=>{
      setIfLoader(false)
      // console.log(resp.data)
      toast.success("Transfer Created Successfully")
      navigate("/StockTransferStatus")
    })
    .catch((err)=>{
      setIfLoader(false)
      console.log(err)
    })
    ;
  }
  else{
    toast.error("Please Select Devices to Transfer")
  }
  }


  const showModalFunc = (proId, proQty) => {
    setShowModal(!showModal)
    if (!showModal) {
      // console.log(proId)
      setPresentProId(proId)
      setPresentProQty(proQty)
    }
  }


  const AddQuantityFunc = () => {
    if (isNaN(askQuantity) || parseInt(askQuantity) < 0) {
      console.error("Invalid quantity");
      return;
    }

    const ThisnewProductQty = addOrSub === "true"
      ? parseInt(presntProQty) + parseInt(askQuantity)
      : Math.max(parseInt(presntProQty) - parseInt(askQuantity), 0);

    console.log(ThisnewProductQty);

    axios.put(`${baseUrl}/updateProductQuantity/${presntProId}/user/${fetchUserId}?newProductQty=${ThisnewProductQty}`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        console.log(`Edit added successfully`);
        setShowModal(false);
        setAskQuantity(0)
      })
      .catch(err => {
        console.log(err);
        setShowModal(false);
      });
  };


  const DeleteDeviceFunc = (proId) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");


    if (confirmDelete) {
      setIfLoader(true)
      axios.delete(`${baseUrl}/deleteProduct/${proId}/user/${fetchUserId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then(resp => {
          setIfLoader(false)
          alert(resp.data);
          setReload(!reload)
        })
        .catch(err => {
          setIfLoader(false)
          console.log(err);
        });
    } else {

      console.log("Deletion canceled by the user.");
    }
  };




  useEffect(() => {
    setIfLoader(true)
    axios.get(`${baseUrl}/api/stocks/user/${fetchUserId}`, {
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
  }, [token, baseUrl, fetchUserId, showModal, reload])


  // console.log(addOrSub)
  // console.log(askQuantity)


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



  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        {/* -----------Loader----------- */}

      {
                ifLoader?    
                <Loader/>:''
              }
        <div className="content-wrapper">


          {/* -----------Modal----------- */}


          <div className={showModal2 ? 'show-add-vendor-modal' : 'hide-add-vendor-modal'}>
            <form >

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label fw-bold" htmlFor="form3Example3cg">Choose Destination</label>

                <select style={{ width: '60%' }} onChange={(e) => setSourceDestination(e.target.value)} className='form-control form-control-md' name="vendorSelect" id="">
                  <option value="">Select a Destination</option>
                  {
                    usersData ? usersData.map((vens) => (
                      <option key={vens.userId} value={vens.userId}>{vens.userName}</option>
                    )) :
                      <option value="">No Stores Available</option>
                  }
                </select>
              </div>

              <div className="d-flex justify-content-center">
                <button type="button" data-mdb-button-init
                onClick={generateTransfer}
                  data-mdb-ripple-init className="btn btn-primary">Create transfer</button>
              </div>

            </form>
          </div>

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
                <button onClick={AddQuantityFunc} type="button" data-mdb-button-init
                  data-mdb-ripple-init className="btn btn-primary">Save</button>
              </div>

            </form>
          </div>

          <h1 style={{ textAlign: 'left' }}>Manage Stock</h1>
          <br />
          <br />

          <Link to={'/AddProductPage'} style={{ position: 'absolute', right: '20px', top: '100px' }} className='New-Order-button btn btn-primary'>Add Device</Link>
          <button onClick={handleCreateTransitRequest} style={{ position: 'absolute', right: '150px', top: '100px' }} className='New-Order-button btn btn-primary'>Transfer</button>

          <div className="Home-table">

            {
              userStocks.length > 0 ?

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S</th>
                      <th scope="col">P.Id</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Serial No.</th>
                      <th scope="col">Status</th>
                      <th scope="col">Vendor</th>
                      <th scope="col">Category</th>
                      <th scope="col">Pur Date</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      {/* <th scope="col"></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userStocks.map((stocks) => (
                        <tr key={stocks.stockId}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedDevices.includes(stocks.serialNumber)}
                              onChange={() => handleSelectDevice(stocks.serialNumber)}
                            />
                          </td>
                          <th scope="row">{stocks.productId}</th>
                          <td>{stocks.productModel}</td>
                          <td>{stocks.serialNumber}</td>
                          <td>{stocks.deviceStatus}</td>
                          <td>{stocks.productVendor}</td>
                          <td>{stocks.productCategory}</td>
                          <td className="prod-desc-tab">{stocks.productPurchaseDate}</td>
                          <td><button onClick={() => showModalFunc(stocks.productId, stocks.quantity)} className="btn btn-warning" >Edit</button></td>
                          <td><button onClick={() => DeleteDeviceFunc(stocks.productId)} className="btn btn-danger">Delete</button></td>
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

export default ManageStocks