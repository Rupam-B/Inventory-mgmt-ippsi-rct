import React, {  useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios';
import { environment } from '../environment';
import '../css/SearchPage.css'
import { toast } from 'react-toastify'

const SearchPage = () => {

    const baseUrl = environment.baseUrl
    const token = localStorage.getItem('ipssi_Jwt')

    // const [userStocks, setUserStocks] = useState();
    const [userStocks, setUserStocks] = useState([]);
    const [searchtext, setsetSearchtext] = useState();
    const [loader, setLoader] = useState(false);


    const handleSearch =()=>{
        if(searchtext){
            setLoader(true)
            axios.get(`${baseUrl}/api/stocks/search-stock/${searchtext}`,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp=>{
                // console.log(resp.data);
                setUserStocks(resp.data)
                setTimeout(()=>{
                    setLoader(false)
                },1000)
            })
            .catch(err=>{
                console.log(err)
                toast.error("Device Not Found")
                setLoader(false)
            })

        }
        else{
            alert('Please Enter Device name to Search')
        }
       

    }

    // useEffect(()=>{
       
    // },[baseUrl,token,searchtext])

  return (
    <div  className="main-container">
    <Sidebar />
    <div className="content">
  <div  className="content-wrapper">

<h1 style={{textAlign:'left'}}>Search</h1>

<div className='Search-div-Search-component'>
<input onChange={(e)=>setsetSearchtext(e.target.value)} className='form-control form-control-md' type="text" placeholder='Search device by name'/>
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
    <th scope="col">P.Id</th>
    <th scope="col">Product Name</th>
    <th scope="col">Serial Number</th>
    <th scope="col">Device status</th>
    <th scope="col">Vendor</th>
    <th scope="col">Current User</th>
    <th scope="col">Purchase Date</th>
    {/* <th scope="col"></th> */}
  </tr>
</thead>
<tbody>
  <tr>

    <th scope="row">{userStocks.stockId}</th>
    <td>{userStocks.productModel}</td>
    <td>{userStocks.serialNumber}</td>
    <td>{userStocks.deviceStatus}</td>
    <td>{userStocks.productVendor}</td>
    <td  className="prod-desc-tab">{userStocks.userName}</td>
    <td  className="prod-desc-tab">{userStocks.productPurchaseDate}</td>
    {/* <td><button  className="btn btn-warning" >Edit Qty</button></td> */}
    {/* <td><button  className="btn btn-danger">Delete</button></td> */}
  </tr>
</tbody>
</table>


:
    loader?<h3>Loading ...</h3>:<h3>No devices To Show !</h3>

}
</div>

</div>
</div>
</div>
  )
}

export default SearchPage