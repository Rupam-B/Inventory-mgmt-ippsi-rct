import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios'
import { environment } from '../environment'
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import Loader from './Loader'

const AddProductPage = () => {

    const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
    const baseUrl = environment.baseUrl
    const token = localStorage.getItem('ipssi_Jwt')
    const navigate = useNavigate();

    const [ifLoader, setIfLoader] = useState(false)


    const [file, setFile] = useState(null);



    const [products, setProducts] = useState([])
    const [productsIdselect, setProductsIdSelect] = useState(null)
    const [usersIdselect, setUsersIdSelect] = useState(null)
    const [usersData, setUsersData] = useState(null) 
    const [deviceStatus, setDeviceStatus] = useState(null) 
    const [prodDate, setProdDate] = useState(null) 
    const [serialNumber, setSerialNumber] = useState(null) 


    // const findVendorname = findvendorForName?file.vendorName:null


    // useEffect(() => {
    //     if (vendors.length > 0) {
    //         setVendorsIdSelect(vendors[0].vendorId);
    //     }
    // }, [vendors]);

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
      },[token,baseUrl,fetchUserId])


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




    const AddProduct = () => {

        setIfLoader(true)
        axios.post(`${baseUrl}/api/stocks/add`, {
            usersId: usersIdselect,
            productId: productsIdselect,
            serialNumber: serialNumber,
            deviceStatus: deviceStatus,
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





    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }


const excelDateToJSDate = (serial) => {
    const excelStartDate = new Date(1899, 11, 30); 
    const resultDate = new Date(excelStartDate.getTime() + serial * 86400000); 
    return resultDate.toISOString().split('T')[0]; 
  
};


const uploadProductsFromExcel = () => {
    if (!file) {
        alert('Please select an Excel file first.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        jsonData.forEach((product) => {
            if (product.productPurchaseDate && !isNaN(product.productPurchaseDate)) {
                product.productPurchaseDate = excelDateToJSDate(product.productPurchaseDate);
            }

            
            console.log("Processed Product:", product);

            
            axios.post(`${baseUrl}/api/stocks/add`, product, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => {
                console.log(`Product added successfully: ${product.productModel}`);
                alert("Successfully Added")
                navigate('/ManageStock')
                
            })
            .catch(err => {
                console.error("Error while adding product:", err);
                toast.error(err.message + "or wrong Data Entry")
            });
        });
    };

    reader.readAsArrayBuffer(file);
};



    useEffect(()=>{
        console.log(prodDate)
    },[prodDate])



    return (
        <div className='main-container'>
            <Sidebar />

            <div className="content">
            {
          ifLoader ?
            <Loader /> : ''
        }
                <div className="content-wrapper">


                    <h1 style={{ textAlign: 'left' }}>Add Product</h1>
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
                                                    <label className="form-label fw-bold" htmlFor="form3Example4cg">Device Status</label>
                                                    <input onChange={(e) => setDeviceStatus(e.target.value)} type="text" id="form3Example4cg" className="form-control form-control-md" name="ProductCategory" />
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
                                                        data-mdb-ripple-init className="btn btn-primary">Add</button>
                                                </div>

                                            </form>

                                            <hr style={{ marginBottom: '20px' }} />
                                            <h5 style={{ textAlign: 'center', marginBottom: '40px' }}>Or</h5>


                                            <div className="form-outline mb-4">
                                                <label className="form-label fw-bold" htmlFor="formFile">Upload Excel File</label>
                                                <input onChange={handleFileUpload} type="file" id="formFile" className="form-control" accept=".xlsx, .xls" />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button onClick={uploadProductsFromExcel} type="button" className="btn btn-primary">Upload from Excel</button>
                                            </div>


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

export default AddProductPage