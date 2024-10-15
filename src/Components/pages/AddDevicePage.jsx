import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios'
import { environment } from '../environment'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const AddDevicePage = () => {

    const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
    const baseUrl = environment.baseUrl
    const token = localStorage.getItem('ipssi_Jwt')
    const navigate = useNavigate();


    // const [prodName, setProdName] = useState(null)
    // const [prodVendor, setProdVendor] = useState(null)
    // const [prodCategory, setProdCategory] = useState(null)
    // const [prodDate, setProdDate] = useState(null)


    const [categories, setCategories] = useState([])
    const [vendors, setVendors] = useState([])
    const [vendorsIdselect, setVendorsIdSelect] = useState(null)
    const [vendorModels, setVendorModels] = useState([])
    const [vendorModelsName, setVendorModelsName] = useState(null)
    const [getVendorName, setGetVendorName] = useState()
    const [getcategoryName, setGetcategoryName] = useState()

    useEffect(() => {
        const findvendorForName = vendors && vendors.find((vens) => vens.vendorId === parseInt(vendorsIdselect))
        const findvendorName = findvendorForName ? findvendorForName.vendorName : null
        setGetVendorName(findvendorName)
    }, [vendorsIdselect, vendors])


    useEffect(() => {
        setVendorModelsName(null)
    }, [vendorsIdselect]);

    useEffect(() => {

        if (vendorsIdselect) {
            //   setIsSelected(true)
            axios.get(`${baseUrl}/models/vendor/${vendorsIdselect}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            )
                .then((resp) => {
                    //   console.log(resp.data)
                    setVendorModels(resp.data)
                })
                .catch((error) => {
                    console.log(error)
                })

        }
    }, [vendorsIdselect, baseUrl, token])



    const AddProduct = () => {
        if(getVendorName&&vendorModelsName&&getcategoryName){
        axios.post(`${baseUrl}/api/product-master/add`, {
            productVendor:getVendorName,
            productModel: vendorModelsName,
            productCategory: getcategoryName,
            // productPurchaseDate: prodDate,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => {
                // console.log(resp)
                toast.success("Successfully Added")
                // console.log(resp.data)
                navigate('/ProductMaster')

            })
            .catch(err => {
                console.log(err)
                toast.error("Server error or Duplicate Device")
            })
        }
        else{
            toast.error("Please Fill all The Details First")
        }
    }



    useEffect(() => {
        axios.get(`${baseUrl}/vendors`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then((resp) => {
                // console.log(resp.data)
                setVendors(resp.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [token, baseUrl, fetchUserId])


    useEffect(() => {
        axios.get(`${baseUrl}/allCategories`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then((resp) => {
                // console.log(resp.data)
                setCategories(resp.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [token, baseUrl, fetchUserId])




    // useEffect(() => {
    //     console.log(getVendorName, 'Vendor Name')
    //     console.log(vendorModelsName, "Model name")
    //     console.log(getcategoryName, "Category name")
    //     console.log(prodDate, "Date")
    //     //   console.log(vendorsIdselect, "Vendor change Id")


    // }, [vendorModelsName, getVendorName, getcategoryName,prodDate])


    // const seeModelvalue = (modelVal) => {
    //     setVendorModelsName(modelVal)
    //     console.log(modelVal)

    // }




    return (
        <div className='main-container'>
            <Sidebar />

            <div className="content">
                <div className="content-wrapper">


                    <h1 style={{ textAlign: 'left' }}>Add Device</h1>
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
                                                    <label className="form-label fw-bold" htmlFor="form3Example3cg">Choose Vendor</label>

                                                    <select style={{ width: '60%' }} onChange={(e) => setVendorsIdSelect(e.target.value)} className='form-control form-control-md' name="vendorSelect" id="">
                                                        <option value="">Select a Vendor</option>
                                                        {
                                                            vendors ? vendors.map((vens) => (
                                                                <option key={vens.vendorId} value={vens.vendorId}>{vens.vendorName}</option>
                                                            )) :
                                                                <option value="">No Vendors Available</option>
                                                        }
                                                    </select>
                                                </div>
                                                <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example3cg">Choose Model</label>
                                                    <select
                                                        style={{ width: '60%' }}
                                                        onChange={(e) => setVendorModelsName(e.target.value)}
                                                        className='form-control form-control-md'
                                                        name="vendorSelect"
                                                        id=""
                                                    >
                                                        {/* Placeholder option */}
                                                        <option value="">Select a model</option>

                                                        {vendorModels.length > 0 ? (
                                                            vendorModels.map((vens) => (
                                                                <option key={vens.modelId} value={vens.modelname}>
                                                                    {vens.modelname}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option value="">No Models Available</option>
                                                        )}
                                                    </select>


                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-3">
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
                                                </div>
{/* 
                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label fw-bold" htmlFor="form3Example4cdg">Purchase Date</label>
                                                    <input
                                                        onChange={(e) => setProdDate(e.target.value)}
                                                        type="date"
                                                        id="form3Example4cdg"
                                                        className="form-control form-control-md"
                                                        name="ProductDate"
                                                    />
                                                </div> */}


                                                <div className="d-flex justify-content-center">
                                                    <button onClick={AddProduct} type="button" data-mdb-button-init
                                                        data-mdb-ripple-init className="btn btn-primary">Add</button>
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

export default AddDevicePage