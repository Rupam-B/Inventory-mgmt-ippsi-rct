import React, { useState, useEffect } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import { environment } from '../../environment'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../../css/root.css'
import Loader from '../Loader'
import { toast } from 'react-toastify'


const ModelMaster = () => {

  const navigate = useNavigate();
  const [ifLoader, setIfLoader] = useState(false)

  const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
  const baseUrl = environment.baseUrl
  const token = localStorage.getItem('ipssi_Jwt')

  const [vendors, setVendors] = useState([])
  const [vendorModels, setVendorModels] = useState([])
  const [vendorsIdselect, setVendorsIdSelect] = useState(null)
  const [addVendorsIdselect, setAddVendorsIdSelect] = useState(null)

  const [showModal , setShowModal] = useState(false)
  const [modelName , setModelName] = useState('')

  const [isSelected, setIsSelected] = useState(false)


  const AddModel =()=>{
    setIfLoader(true)
    axios.post(`${baseUrl}/addModel/vendor/${addVendorsIdselect}`, {
        modelname:modelName,
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
        navigate('/ModelMaster')
        
    })
    .catch(err => {
      setIfLoader(false)
        console.log(err);
        toast.error(err.message)
    });
  }

  
  const showModalFunc = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    if (vendors.length > 0) {
      setVendorsIdSelect(vendors[0].vendorId);
      setAddVendorsIdSelect(vendors[0].vendorId);
    }
  }, [vendors]);


  // const fetchVendorModels = ()=>{

  useEffect(() => {

    if (vendorsIdselect) {
      setIsSelected(true)
      axios.get(`${baseUrl}/models/vendor/${vendorsIdselect}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      )
        .then((resp) => {
          console.log(resp.data)
          setVendorModels(resp.data)
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.message)
        })

    }
  }, [vendorsIdselect,baseUrl,token])


  // }

  useEffect(() => {
    setIfLoader(true)
    axios.get(`${baseUrl}/vendors`, {
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
      })
  }, [token, baseUrl, fetchUserId])


  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
      {
          ifLoader ?
            <Loader /> : ''
        }
        <div className="content-wrapper">


{/* ----------Modal ------------- */}

          <div className={showModal ? 'show-add-vendor-modal' : 'hide-add-vendor-modal'}>
            <form >
            <div data-mdb-input-init className="form-outline mb-3">
            <select style={{ width: '60%' }} onChange={(e) => setAddVendorsIdSelect(e.target.value)} className='form-control form-control-md' name="vendorSelect" id="">
                  {
                    vendors ? vendors.map((vens) => (
                      <option key={vens.vendorId} value={vens.vendorId}>{vens.vendorName}</option>
                    )) :
                      <option>No Vendors Available</option>
                  }
            </select>
            </div>
              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label fw-bold" htmlFor="form3Example3cg">Model Name</label>
                <input onChange={(e) => setModelName(e.target.value)} type="text" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
              </div>

              <div className="d-flex justify-content-center">
                <button onClick={AddModel} type="button" data-mdb-button-init
                  data-mdb-ripple-init className="btn btn-primary">Add Model</button>
              </div>

            </form>
          </div>
{/* --------------------------------- */}

          <h1 style={{ textAlign: 'left', marginBottom: '30px' }}>Vendor Models</h1>
          <br />
          <br />

          <Link onClick={showModalFunc} className='New-Order-button btn btn-primary' style={{ position: 'absolute', right: '20px', top: '100px' }}>Add Models</Link>

          <div className="Home-table">

            <div style={{ display: 'flex' }}>

              <select style={{ width: '60%' }} onChange={(e) => setVendorsIdSelect(e.target.value)} className='form-control form-control-md' name="vendorSelect" id="">

                {
                  vendors ? vendors.map((vens) => (
                    <option key={vens.vendorId} value={vens.vendorId}>{vens.vendorName}</option>
                  )) :
                    <option>No Vendors Available</option>

                }
              </select>

              {/* <button className='btn btn-primary' onClick={fetchVendorModels}>Go</button> */}

            </div>


            {
              vendorModels.length > 0 ?

                // model-master-table is defined in root.css
                <table className="table table-striped model-master-table">
                  <thead>
                    <tr>
                      {/* <th scope="col">Vendor Id</th> */}
                      <th scope="col">Model Name</th>
                      {/* <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th> */}
                      {/* <th scope="col"></th> */}
                      {/* <th scope="col"></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      vendorModels.map((stocks) => (
                        <tr key={stocks.modelId}>
                          {/* <th scope="row">{stocks.vendorId}</th> */}
                          <td>{stocks.modelname}</td>
                          {/* <td></td>
        <td></td>
        <td></td>
        <td  className="prod-desc-tab"></td> */}
                          {/* <td><button  className="btn btn-warning" >In Transit</button></td> */}
                          {/* <td><button  className="btn btn-danger">Delete</button></td> */}
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
                : isSelected ?
                  <h3 style={{ marginTop: '40px', textAlign: 'left' }}>No Models to Show</h3>
                  :
                  <h3 style={{ marginTop: '40px', textAlign: 'left' }}>Please select a vendor and Go!</h3>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default ModelMaster