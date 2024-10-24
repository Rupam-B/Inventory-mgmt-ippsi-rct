import React, { useEffect, useState} from 'react';
import '../css/Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const ipssiuserId = parseInt(localStorage.getItem("ipssi_userId"))

    const [displayStatus, setDisplayStatus] = useState(false);
    const [submenu1Open, setSubmenu1Open] = useState(false);
    // const [submenu2Open, setSubmenu2Open] = useState(false);
    const [submenu3Open, setSubmenu3Open] = useState(false);
    const [submenu4Open, setSubmenu4Open] = useState(false);
    // const [submenu5Open, setSubmenu5Open] = useState(false);
    const [userName, setUserName] = useState(false);

    const [isMobile , setIsMobile] = useState(false)

    const toggleDisplay = () => {
        setDisplayStatus(!displayStatus);
    };

    const toggleSubmenu1 = () => {
        setSubmenu1Open(!submenu1Open);
    };

    // const toggleSubmenu2 = () => {
    //     setSubmenu2Open(!submenu2Open);
    // };

    const toggleSubmenu3 = () => {
        setSubmenu3Open(!submenu3Open);
    };
    const toggleSubmenu4 = () => {
        setSubmenu4Open(!submenu4Open);
    };
    // const toggleSubmenu5 = () => {
    //     setSubmenu5Open(!submenu5Open);
    // };

    const handleLogout = () =>{
        localStorage.removeItem("ipssi_Jwt")
        setTimeout(()=>{
            navigate('/')
        },[200])
    }

    useEffect(()=>{
        setUserName( localStorage.getItem("ipssi_userName"))
    },[])


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
        <div>
            <div  className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark fixing-position-sidebar">
                <div className={displayStatus ? 'sidebar' : 'sidebar-hide'}>
                    <button onClick={toggleDisplay} className={displayStatus ? 'sidebar-close-btn' : 'sidebar-show-btn-disp-none'}>
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <button onClick={toggleDisplay} className={displayStatus ? 'sidebar-show-btn-disp-none' : 'sidebar-show-btn'}>
                        <i className={isMobile?"fa-solid fa-bars":"fa-solid fa-angle-right"}></i>
                    </button>
                    <div className="d-flex flex-column  align-items-sm-start px-3 pt-2 text-white min-vh-100 sidebar-padding">
                        <Link   className="d-flex  pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5  d-sm-inline">Menu</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0  align-items-sm-start" id="menu">
                            <li>
                                <div onClick={toggleSubmenu1} className="nav-link px-0 align-middle text-white fw-bold">
                                    <i className="fs-4 bi-speedometer2"></i> <span className="ms-1  d-sm-inline">Home</span>
                                </div>
                                {submenu1Open && (
                                    <ul className="nav flex-column ms-1">
                                        <li>
                                            <Link to={'/home'}className="nav-link px-0  fw-bold drop-down-link">Dashboard</Link>
                                        </li>
                                        <li className="w-100">
                                            <Link to={'/Managestock'} className="nav-link px-0  fw-bold drop-down-link">Manage Stock</Link>
                                        </li>
                                        {/* <li>
                                            <Link className="nav-link px-0  fw-bold drop-down-link">Manage Orders</Link>
                                        </li> */}
                                    </ul>
                                )}
                            </li>

                            {ipssiuserId===1&&
                            <li>
                                <div onClick={toggleSubmenu4} className="nav-link px-0 align-middle text-white fw-bold">
                                    <i className="fs-4 bi-table"></i> <span className="ms-1 d-sm-inline">Vendor Master</span>
                                </div>
                                {submenu4Open &&(
                                    <ul className="nav flex-column ms-1">
                                        <li>
                                            <Link to={'/vendorMaster'}className="nav-link px-0  fw-bold drop-down-link">Vendor M</Link>
                                        </li>
                                        <li>
                                            <Link to={'/modelMaster'}className="nav-link px-0  fw-bold drop-down-link">Model Master</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            }

                            
                            {ipssiuserId===1 &&<li>
                                <div  className="nav-link px-0 align-middle text-white fw-bold">
                                <i className="fs-4 bi-table"></i> <span className="ms-1  d-sm-inline"><Link to={'/CategoryMaster'} className='text-white'>Category Master</Link></span>
                                </div>
                              
                            </li>
                            }

                            {ipssiuserId===1 &&
                            <li>
                                <div  className="nav-link px-0 align-middle text-white fw-bold">
                                <i className="fs-4 bi-table"></i> <span className="ms-1  d-sm-inline"><Link to={'/ProductMaster'} className='text-white'>Product Master</Link></span>
                                </div>
                              
                            </li>
                            }

                            {ipssiuserId===1 &&
                            <li>
                                <div  className="nav-link px-0 align-middle text-white fw-bold">
                                <i className="fs-4 bi-table"></i> <span className="ms-1  d-sm-inline"><Link to={'/StatusMaster'} className='text-white'>Status Master</Link></span>
                                </div>
                              
                            </li>
                            }

                            {ipssiuserId===1 &&
                            <li>
                                <div  className="nav-link px-0 align-middle text-white fw-bold">
                                <i className="fs-4 bi-table"></i> <span className="ms-1  d-sm-inline"><Link to={'/Users'} className='text-white'>Users</Link></span>
                                </div>
                              
                            </li>
                            }


                            <li>
                                <div onClick={toggleSubmenu3} className="nav-link px-0 align-middle text-white fw-bold">
                                    <i className="fs-4 bi-grid"></i> <span className="ms-1  d-sm-inline">Stock transfer</span>
                                </div>
                                {submenu3Open && (
                                    <ul className="nav flex-column ms-1">
                                        <li className="w-100">
                                            <Link to={'/ManageStock'} className="nav-link px-0 drop-down-link fw-bold">Generate Stock transfer</Link>
                                        </li>
                                        <li className="w-100">
                                            <Link to={'/StockTransferStatus'} className="nav-link px-0 drop-down-link fw-bold">Stock Transfer Status</Link>
                                        </li>
                                        <li className="w-100">
                                            <Link to={'/ReceiveStockPage'} className="nav-link px-0 drop-down-link fw-bold">Receive Stocks</Link>
                                        </li>
                                        
                                    </ul>
                                )}
                            </li>
                            {/* <li>
                                <Link className="nav-link px-0 align-middle text-white fw-bold">
                                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Customers</span>
                                </Link>
                            </li> */}
                        </ul>
                        <hr />
                        <div  className="dropdown pb-4">
                            <Link className="d-flex align-items-center text-white text-decoration-none dropdown-toggle text-white fw-bold" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                <span className=" d-sm-inline mx-1">{userName?userName:''}</span>
                            </Link>

                            {/* { */}
                                {/* // submenu5Open&& */}
                            
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                {/* <li><Link className="dropdown-item">New project...</Link></li>
                                <li><Link className="dropdown-item">Settings</Link></li>
                                <li><Link className="dropdown-item">Profile</Link></li> */}
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><Link  onClick={handleLogout} className="dropdown-item text-dark">Sign out</Link></li>
                            </ul>
                            {/* } */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
