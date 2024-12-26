import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import axios from 'axios';
import { environment } from '../environment';
import '../css/SearchPage.css';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const AllStocksPage = () => {
    const baseUrl = environment.baseUrl;
    const token = localStorage.getItem('ipssi_Jwt');
    const ipssiuserId = parseInt(localStorage.getItem("ipssi_userId"));
    const navigation = useNavigate();

    const [ifLoader, setIfLoader] = useState(false);

    const [userStocks, setUserStocks] = useState([]);
    const [fixeduserStocks, setFixedUserStocks] = useState([]);
    const [loader, setLoader] = useState(false);

    const [usersData, setUsersData] = useState([]);
    const [userIDSelect, setuserIDSelect] = useState(0);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Fetch all stocks
    useEffect(() => {
        setIfLoader(true);
        setLoader(true);
        axios.get(`${baseUrl}/api/stocks/all`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => {
                setIfLoader(false);
                setUserStocks(resp.data);
                setFixedUserStocks(resp.data);
                setTimeout(() => setLoader(false), 1000);
            })
            .catch((err) => {
                setIfLoader(false);
                console.error(err);
                toast.error("Device Not Found");
                setLoader(false);
            });
    }, [baseUrl, token]);

    // Fetch users
    useEffect(() => {
        setIfLoader(true);
        axios.get(`${baseUrl}/users`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => {
                setIfLoader(false);
                setUsersData(resp.data);
            })
            .catch((err) => {
                setIfLoader(false);
                console.error(err);
            });
    }, [baseUrl, token]);

    // Filter stocks by user
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

    // Redirect if not admin
    useEffect(() => {
        if (ipssiuserId !== 1) {
            navigation("/home");
        }
    }, [ipssiuserId, navigation]);

        // Sorting logic
        const handleSort = (key) => {
            let direction = 'asc';
            if (sortConfig.key === key && sortConfig.direction === 'asc') {
                direction = 'desc';
            }
            setSortConfig({ key, direction });
        
            const getValue = (obj, key) => {
                return key.includes('.') 
                    ? key.split('.').reduce((acc, part) => acc && acc[part], obj) 
                    : obj[key];
            };
        
            const sortedData = [...userStocks].sort((a, b) => {
                const aValue = getValue(a, key);
                const bValue = getValue(b, key);
        
                if (aValue < bValue) return direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return direction === 'asc' ? 1 : -1;
                return 0;
            });
        
            setUserStocks(sortedData);
        };

    return (
        <div className="main-container">
            <Sidebar />
            <div className="content">
                {ifLoader ? <Loader /> : ''}
                <div className="content-wrapper">
                    <h1 style={{ textAlign: 'left' }}>All Stocks</h1>

                    <div style={{ width: '50%', textAlign: 'left' }} className="form-outline mb-3 manage-stock-select">
                        <label style={{ marginBottom: '10px', marginTop: '15px' }} htmlFor="status-select">
                            Select User
                        </label>
                        <select
                            style={{ width: '60%' }}
                            onChange={(e) => setuserIDSelect(e.target.value)}
                            className="form-control form-control-md"
                            name="vendorSelect"
                            id="status-select"
                        >
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
                    </div>

                    <br />
                    <br />

                    <div className="Home-table">
                        {userStocks.length > 0 ? (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('stockId')} className='underline-hover'>P.Id</th>
                                        <th onClick={() => handleSort('productModel')} className='underline-hover'>Product Name</th>
                                        <th onClick={() => handleSort('serialNumber')} className='underline-hover'>Serial Number</th>
                                        <th onClick={() => handleSort('deviceStatus.status')} className='underline-hover'>Device Status</th>
                                        <th onClick={() => handleSort('productVendor')} className='underline-hover'>Vendor</th>
                                        <th onClick={() => handleSort('userName')} className='underline-hover'>Current User</th>
                                        <th onClick={() => handleSort('productPurchaseDate')} className='underline-hover'>Purchase Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userStocks.map((stock) => (
                                        <tr key={stock.stockId}>
                                            <td>{stock.stockId}</td>
                                            <td>{stock.productModel}</td>
                                            <td>{stock.serialNumber}</td>
                                            <td>{stock.deviceStatus.status}</td>
                                            <td>{stock.productVendor}</td>
                                            <td>{stock.userName}</td>
                                            <td>{stock.productPurchaseDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : loader ? (
                            <h3>Loading...</h3>
                        ) : (
                            <h3>No devices To Show!</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllStocksPage;
