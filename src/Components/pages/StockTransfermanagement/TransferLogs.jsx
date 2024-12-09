import React, { useState } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import axios from 'axios';
import { environment } from '../../environment';
import '../../css/SearchPage.css'
import { toast } from 'react-toastify'
import Loader from '../Loader';

const TransferLogs = () => {

    const baseUrl = environment.baseUrl
    const token = localStorage.getItem('ipssi_Jwt')

    const [ifLoader, setIfLoader] = useState(false)

    // const [userStocks, setUserStocks] = useState();
    const [userStocks, setUserStocks] = useState();
    
    const [searchtext, setsetSearchtext] = useState();
    const [loader, setLoader] = useState(false);

    // const RevUserStoks = userStocks&&userStocks.reverse();
    // console.log(userStocks, 'Un Reserved')
    // console.log(RevUserStoks, 'Reversed')

    const handleSearch =()=>{
        if(searchtext){
          setIfLoader(true)
            setLoader(true)
            axios.get(`${baseUrl}/transfer/logs/${searchtext}`,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp=>{
                // console.log(resp.data);
                setIfLoader(false)
                setUserStocks(resp.data)
                setTimeout(()=>{
                    setLoader(false)
                },1000)
            })
            .catch(err=>{
              setIfLoader(false)
                console.log(err)
                toast.error("Device Not Found")
                setLoader(false)
            })

        }
        else{
            alert('Please Enter Serial Number to Search')
        }
       
      }

    // useEffect(()=>{
    //    if(userStocks){
    //     setDeviceStats(userStocks.deviceStatus.status)
    //    }
    // },[userStocks])

  return (
    <div  className="main-container">
    <Sidebar />
    <div className="content">
      {/* -----------Loader----------- */}

      {
          ifLoader ?
            <Loader /> : ''
        }
  <div  className="content-wrapper">

<h1 style={{textAlign:'left'}}>Logs</h1>

<div className='Search-div-Search-component'>
<input onChange={(e)=>setsetSearchtext(e.target.value)} className='form-control form-control-md' type="text" placeholder='Search device by seraial no.'/>
<button onClick={handleSearch} className='btn btn-primary'><i className="fa-solid fa-magnifying-glass"></i></button>
</div>

<br/>
<br/>

{/* <Link to={'/AddProductPage'} className='New-Order-button btn btn-primary' style={{position:'absolute', right:'20px', top:'100px'}}>Add Product</Link> */}

<div  className="Home-table">

{
userStocks?

<table  className="table table-striped">
<thead>
  <tr>
    <th scope="col">S No.</th>
    <th scope="col">Source</th>
    <th scope="col">Destination</th>
    <th scope="col">Device status</th>
    <th scope="col">Transfer Date</th>
    <th scope="col">Description</th>
    {/* <th scope="col"></th> */}
  </tr>
</thead>
<tbody>
    {
        [...userStocks].reverse().map((logs)=>(
            <tr key={logs.logId}>
            <td>{logs.serialNumber}</td>
            <td>{logs.sourceUser.userName}</td>
            <td>{logs.destinationUser.userName}</td>
            <td>{logs.status.status}</td>
            <td>{logs.transferDate}</td>
            <td>{logs.description}</td>
            {/* <td  className="prod-desc-tab">{userStocks.productPurchaseDate}</td> */}
            {/* <td><button  className="btn btn-warning" >Edit Qty</button></td> */}
            {/* <td><button  className="btn btn-danger">Delete</button></td> */}
          </tr>
        ))
    }

</tbody>
</table>


:
    loader?<h3>Loading ...</h3>:<h3>Enter Serial Number To Show logs!</h3>

}
</div>

</div>
</div>
</div>
  )
}

export default TransferLogs

