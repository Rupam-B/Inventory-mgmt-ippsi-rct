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
  const [fixedUserStocks, setFixedUserStocks] = useState([])
  const [userStockCategories, setUserStockCategories] = useState([])

  const [showModal2, setShowModal2] = useState(false)
  const [showEditModal2, setShowEditModal2] = useState(false)
  const [sourceDestination, setSourceDestination] = useState(null)
  const [usersData, setUsersData] = useState(null)



  const [preDefineddeviceStatus, setPreDefinedDeviceStatus] = useState(null)
  const [preDefineddeviceDesc, setPreDefinedDeviceDesc] = useState('')
  const [preDefinedusersIdselect, setPreDefinedusersIdselect] = useState(null)
  const [preDefinedproductId, setPreDefinedproductId] = useState(null)
  const [preDefinedserialNumber, setPreDefinedserialNumber] = useState('')
  const [preDefinedproductPurchaseDate, setPreDefinedproductPurchaseDate] = useState(null)
  const [preDefinedStockId, setPreDefinedStockId] = useState(null)
  const [fetchedeviceStatus, setFetcheDeviceStatus] = useState([])


  const [deviceStatus, setDeviceStatus] = useState([])
  const [deviceStatusId, setDeviceStatusId] = useState(0)

  const [categorySelect, setCategorySelect] = useState("All")

  const statuskey = deviceStatusId && parseInt(deviceStatusId)



  const [reload, setReload] = useState(false)


  const handleSelectDevice = (imei) => {
    setSelectedDevices((prev) =>
      prev.includes(imei) ? prev.filter(id => id !== imei) : [...prev, imei]
    );
  };

  const handleCreateTransitRequest = async () => {
    setShowModal2(!showModal2)
    setShowEditModal2(false)

    // console.log(selectedDevices)
  };

  const generateTransfer = async () => {
    if (selectedDevices.length > 0 && fetchUserId && sourceDestination) {

      setIfLoader(true)

      await axios.post(`${baseUrl}/transfer/createTransfer`, {
        serialNumbers: selectedDevices,
        sourceUserId: fetchUserId,
        destinationUserId: sourceDestination
      },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then((resp) => {
          setIfLoader(false)
          // console.log(resp.data)
          toast.success("Transfer Created Successfully")
          navigate("/StockTransferStatus")
        })
        .catch((err) => {
          setIfLoader(false)
          console.log(err)
        })
        ;
    }
    else {
      toast.error("Please Select Devices to Transfer")
    }
  }








  const DeleteDeviceFunc = (proId) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");


    if (confirmDelete) {
      setIfLoader(true)
      axios.delete(`${baseUrl}/api/stocks/delete/${proId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then(resp => {
          setIfLoader(false)
          toast.success("Deleted Succesfully");
          setReload(!reload)
        })
        .catch(err => {
          setIfLoader(false)
          console.log(err);
          toast.error(err.message)
        });
    } else {

      console.log("Deletion canceled by the user.");
    }
  };






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
    // console.log(fixedUserStocks)
    // console.log(userStocks)
    if(fixedUserStocks&&categorySelect !=="All"){
        const newUserStock =fixedUserStocks.filter((users)=>users.productCategory===categorySelect)
        setUserStocks(newUserStock)
    }
    else if(fixedUserStocks&&categorySelect ==="All"){
        setUserStocks(fixedUserStocks)
    }
  },[categorySelect,fixedUserStocks])


  useEffect(() => {
    if (statuskey !== 0) {
      setIfLoader(true)
      axios.get(`${baseUrl}/api/stocks/user/${fetchUserId}/status/${deviceStatusId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then(resp => {
          setIfLoader(false)
          //  console.log(resp.data)
          setUserStocks(resp.data)
          setFixedUserStocks(resp.data)
        })
        .catch(err => {
          setIfLoader(false)
          console.error(err);
          toast.error(err.message)
        });
    }

    else if (statuskey === 0) {
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
          setFixedUserStocks(resp.data)
        })
        .catch((error) => {
          setIfLoader(false)
          console.log(error)
          toast.error(error.message)
        })

    }
  }, [baseUrl, fetchUserId, statuskey, token, deviceStatusId, reload, preDefineddeviceStatus, showEditModal2, showModal2])




  const openEditModal = (userid, devstatus, devicedesc, prodId, sno, prodpurdate, stkId) => {
    setShowEditModal2(!showEditModal2)
    setShowModal2(false)

    setPreDefinedDeviceStatus(devstatus)
    setPreDefinedDeviceDesc(devicedesc)
    setPreDefinedproductId(prodId)
    setPreDefinedserialNumber(sno)
    setPreDefinedusersIdselect(userid)
    setPreDefinedproductPurchaseDate(prodpurdate)
    setPreDefinedStockId(stkId)


  }




  const UpdateProduct = () => {
    if (preDefineddeviceDesc && preDefineddeviceStatus && preDefinedproductId && preDefinedproductPurchaseDate && preDefinedserialNumber && preDefinedusersIdselect && preDefinedStockId) {
      setIfLoader(true)
      axios.put(`${baseUrl}/api/stocks/update/${parseInt(preDefinedStockId)}`, {
        usersId: preDefinedusersIdselect,
        productId: preDefinedproductId,
        serialNumber: preDefinedserialNumber,
        statusId: parseInt(preDefineddeviceStatus),
        description: preDefineddeviceDesc,
        productPurchaseDate: preDefinedproductPurchaseDate
      },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then(resp => {
          setIfLoader(false)
          // console.log(resp)
          toast.success("Successfully Updated")
          setIfLoader(false)
          setShowEditModal2(false)

        })
        .catch(err => {
          setIfLoader(false)
          console.log(err)
          toast.error(err.message + "or wrong Data Entry")
          setIfLoader(false)
          setShowEditModal2(false)
        })
    }
    else {
      toast.error("please Fill all Details and Update")
    }
  }

  useEffect(() => {
    axios.get(`${baseUrl}/allDeviceStatus`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        // console.log(resp.data)
        setFetcheDeviceStatus(resp.data)
        
      })
      .catch(err => {
        console.log(err)
        toast.error(err.message)
      })
  }, [baseUrl, token])


  useEffect(() => {
    // setIfLoader(true)
      axios.get(`${baseUrl}/allCategories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      )
        .then((resp) => {
          // setIfLoader(false)
          // console.log(resp.data)
          setUserStockCategories(resp.data)
        })
        .catch((error) => {
          // setIfLoader(false)
          console.log(error)
          toast.error(error.message)
        })
    }, [token, baseUrl, fetchUserId])



  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        {/* -----------Loader----------- */}

        {
          ifLoader ?
            <Loader /> : ''
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

          {/* -----------******----------- */}
          {/* -----------Edit Device Modal----------- */}

          <div className={showEditModal2 ? 'show-add-vendor-modal' : 'hide-add-vendor-modal'}>
            <form >

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label fw-bold" htmlFor="form3Example3cg">Choose Status {"(Dont Change if not to change)"}</label>
                <select
                  style={{ width: '60%' }}
                  onChange={(e) => setPreDefinedDeviceStatus(e.target.value)}
                  className='form-control form-control-md'
                  name="vendorSelect"
                  id=""
                >
                  {/* Placeholder option */}
                  <option value="">Select Status</option>

                  {fetchedeviceStatus && fetchedeviceStatus.length > 0 ? (
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
                <input value={preDefineddeviceDesc} onChange={(e) => setPreDefinedDeviceDesc(e.target.value)} type="text" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
              </div>

              <div className="d-flex justify-content-center">
                <button type="button" data-mdb-button-init
                  onClick={UpdateProduct}
                  data-mdb-ripple-init className="btn btn-primary">Save</button>
              </div>

            </form>
          </div>

          {/* -----------******----------- */}

          <h1 style={{ textAlign: 'left' }}>Manage Stock</h1>
          <br />
          <br />
          <div className='Functional-Buttons'>
            <Link to={'/AddProductPage'} style={{ marginRight: '10px' }} className='New-Order-button btn btn-primary'>Add Device</Link>
            <button onClick={handleCreateTransitRequest} className='New-Transfer-button btn btn-primary'>Transfer</button>
          </div>

          <div className="Home-table">
            {/* <div className='card'> */}
                  <div className='select-labels-mg-stk'>
            <div style={{ width: '50%', textAlign: 'left' }} data-mdb-input-init className="form-outline mb-3 manage-stock-select">
              {/* <label style={{marginLeft:'5px'}} className="form-label fw-bold" htmlFor="form3Example3cg">Choose Status</label> */}
              <label style={{marginBottom:'10px'}} htmlFor="status-select">status</label>
              <select
                style={{ width: '60%' }}
                onChange={(e) => setDeviceStatusId(e.target.value)}
                className='form-control form-control-md'
                name="vendorSelect"
                id="status-select"
              >
                {/* Placeholder option */}
                <option value={0}>All</option>

                {deviceStatus && deviceStatus.length > 0 ? (
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


            <div style={{ width: '50%', textAlign: 'left' }} data-mdb-input-init className="form-outline mb-3 manage-stock-select">
              {/* For Category select */}
              <label style={{marginBottom:'10px'}} htmlFor="status-select">category</label>
              <select
                style={{ width: '60%' }}
                onChange={(e) => setCategorySelect(e.target.value)}
                className='form-control form-control-md'
                name="vendorSelect"
                id="status-select"
              >
                {/* Placeholder option */}
                <option value={"All"}>All</option>

                {userStockCategories && userStockCategories.length > 0 ? (
                  userStockCategories.map((category) => (
                    <option key={category.categoryId} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))
                ) : (
                  <option value="">Not Available</option>
                )}
              </select>

              {/* -------- */}


            </div>
            </div>
            {/* </div> */}

            {
              userStocks.length > 0 ?

                <table className="table table-striped">
                  <thead>
                    <tr >
                      <th scope="col">S</th>
                      <th scope="col">P.Id</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Serial No.</th>
                      <th scope="col">Status</th>
                      <th scope="col">Vendor</th>
                      <th scope="col">Category</th>
                      <th scope="col">Pur Date</th>
                      <th scope="col">Description</th>
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
                          <td>{stocks.productId}</td>
                          <td>{stocks.productModel}</td>
                          <td>{stocks.serialNumber}</td>
                          <td>{stocks.deviceStatus.status}</td>
                          <td>{stocks.productVendor}</td>
                          <td>{stocks.productCategory}</td>
                          <td className="prod-desc-tab">{stocks.productPurchaseDate}</td>
                          <td className="prod-desc-tab">{stocks.description}</td>
                          <td><button onClick={() => openEditModal(stocks.userId, stocks.deviceStatus.statusID, stocks.description, stocks.productId, stocks.serialNumber, stocks.productPurchaseDate, stocks.stockId)} className="btn btn-warning" >Edit</button></td>
                          <td><button onClick={() => DeleteDeviceFunc(stocks.stockId)} className="btn btn-danger">Delete</button></td>
                          {/* <td><button  className="btn btn-success">Full Details</button></td> */}
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
                :
                <h1 className='Not-available-Heading'>No Products To Show !</h1>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default ManageStocks