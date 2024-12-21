import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios';
import { environment } from '../environment';
import '../css/SearchPage.css'
import { toast } from 'react-toastify'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const AllStocksPage = () => {

    const baseUrl = environment.baseUrl
    const token = localStorage.getItem('ipssi_Jwt')
    const ipssiuserId = parseInt(localStorage.getItem("ipssi_userId"))
    const navigation = useNavigate();

    const [ifLoader, setIfLoader] = useState(false)

    const [userStocks, setUserStocks] = useState();
    const [fixeduserStocks, setFixedUserStocks] = useState();
    const [loader, setLoader] = useState(false);

    const [usersData, setUsersData] = useState([])

    const [userIDSelect, setuserIDSelect] = useState(0)




    useEffect(() => {
        setIfLoader(true)
        setLoader(true)
        axios.get(`${baseUrl}/api/stocks/all`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(resp => {
                // console.log(resp.data);
                setIfLoader(false)
                setUserStocks(resp.data)
                setFixedUserStocks(resp.data)
                setTimeout(() => {
                    setLoader(false)
                }, 1000)
            })
            .catch(err => {
                setIfLoader(false)
                console.log(err)
                toast.error("Device Not Found")
                setLoader(false)
            })
    }, [baseUrl, token])






    useEffect(() => {
        setIfLoader(true)
        axios.get(`${baseUrl}/users`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(resp => {
                setIfLoader(false)
                // console.log(resp.data)
                setUsersData(resp.data)
            })
            .catch(err => {
                setIfLoader(false)
                console.log(err)
            })
    }, [baseUrl, token])



    useEffect(() => {
        if (fixeduserStocks && fixeduserStocks.length > 0) {
            if (parseInt(userIDSelect) !== 0) {
                const newUserStocks = fixeduserStocks.filter(
                    (users) => users.userId === parseInt(userIDSelect)
                );
                setUserStocks(newUserStocks);
            } else {
                setUserStocks(fixeduserStocks);
            }
        }
    }, [fixeduserStocks, userIDSelect]);



    useEffect(()=>{
        if(ipssiuserId!==1){
            navigation("/home")
        }
    },[ipssiuserId,navigation])






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

                    <h1 style={{ textAlign: 'left' }}>All Stocks</h1>


                    <div style={{ width: '50%', textAlign: 'left' }} data-mdb-input-init className="form-outline mb-3 manage-stock-select">
                        {/* For Category select */}
                        <label style={{ marginBottom: '10px', marginTop: '15px' }} htmlFor="status-select">Select User</label>
                        <select
                            style={{ width: '60%' }}
                            onChange={(e) => setuserIDSelect(e.target.value)}
                            className='form-control form-control-md'
                            name="vendorSelect"
                            id="status-select"
                        >
                            {/* Placeholder option */}
                            <option value={0}>All</option>

                            {usersData && usersData.length > 0 ? (
                                usersData.map((user) => (
                                    <option key={user.userId} value={user.userId}>
                                        {user.userName}
                                    </option>
                                ))
                            ) : (
                                <option value="">Not Available</option>
                            )}
                        </select>

                        {/* -------- */}


                    </div>

                    <br />
                    <br />

                    {/* <Link to={'/AddProductPage'} className='New-Order-button btn btn-primary' style={{position:'absolute', right:'20px', top:'100px'}}>Add Product</Link> */}

                    <div className="Home-table">

                        {
                            userStocks ?

                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">P.Id</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Serial Number</th>
                                            <th scope="col">Device status</th>
                                            <th scope="col">Vendor</th>
                                            <th scope="col">Current User</th>
                                            <th scope="col">Purchase Date</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userStocks.map((userStocks) => (
                                            <tr key={userStocks.stockId}>

                                                <td>{userStocks.stockId}</td>
                                                <td>{userStocks.productModel}</td>
                                                <td>{userStocks.serialNumber}</td>
                                                <td>{userStocks.deviceStatus.status}</td>
                                                <td>{userStocks.productVendor}</td>
                                                <td className="prod-desc-tab">{userStocks.userName}</td>
                                                <td className="prod-desc-tab">{userStocks.productPurchaseDate}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>


                                :
                                loader ? <h3>Loading ...</h3> : <h3>No devices To Show !</h3>

                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AllStocksPage