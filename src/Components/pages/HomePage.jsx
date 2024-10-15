import React, { useEffect,useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import '../css/HomePage.css'
import '../css/root.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { environment } from '../environment'


const HomePage = () => {

  
  const fetchUserId = parseInt(localStorage.getItem('ipssi_userId'))
  const baseUrl = environment.baseUrl
  const token = localStorage.getItem('ipssi_Jwt')

  const [userStocks , setUserStocks] = useState([])
  const numberOfStocks = userStocks.length?userStocks.length:0;

  useEffect(()=>{
    axios.get(`${baseUrl}/products/user/${fetchUserId}`,{
      headers:{
         'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
      }
    })
    .then(resp=>{
      // console.log(resp)
      setUserStocks(resp.data)
    })
    .catch(err=>{
      console.error(err);
    }
    )
  },[baseUrl,fetchUserId,token])


  return (
    <div className="main-container">
      <Sidebar />

   
      <div className="content">
      <div  className="content-wrapper">
      <h1 style={{textAlign:'left',marginLeft:'20px'}}>Dashboard</h1>
      <Link to={'/SearchPage'} className='Search-Box-in_dashboard'>
      {/* <i style={{border:'1px solid blue'}} class="fa-solid fa-magnifying-glass"></i> */}
      <p >Search Devices</p>
      </Link>


    <div  className="container-fluid">
      <div  className="row">

      {/* <!-- Icon Cards--> */}
        <div  className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mt-4">
            <div  className="inforide">
              <div  className="row">
                <div  className="col-lg-3 col-md-4 col-sm-4 col-4 rideone">
                    <img src="https://img.freepik.com/premium-vector/computer-screen-with-diagram-graph-it_1205884-5456.jpg?size=626&ext=jpg&ga=GA1.1.685551602.1726315012&semt=ais_hybrid" alt=''/>
                </div>
                <div  className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                  <div>
                    <h4>Total Stocks</h4>
                    <h2>{numberOfStocks}</h2>
                  </div>
                  <hr style={{width:'80%'}}/>
                  <div>
                    <h4>Working</h4>
                    <h2>18</h2>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div  className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mt-4">
            <div  className="inforide">
              <div  className="row">
                <div  className="col-lg-3 col-md-4 col-sm-4 col-4 ridetwo">
                    <img src="https://img.freepik.com/premium-photo/colorful-circle-with-graphic-multicolored-logo-with-multicolored-line-drawing_783884-27367.jpg?size=626&ext=jpg&ga=GA1.1.685551602.1726315012&semt=ais_hybrid" alt=''/>
                </div>
                <div  className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                  <div>
                    <h4>For Repair</h4>
                    <h2>10</h2>
                  </div>
                  <hr style={{width:'80%'}}/>
                  <div>
                    <h4>Repaired</h4>
                    <h2>5</h2>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div  className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mt-4">
            <div  className="inforide">
              <div  className="row">
                <div  className="col-lg-3 col-md-4 col-sm-4 col-4 ridethree">
                    <img src="https://img.freepik.com/premium-vector/adobe-analytics-dashboard-mobile-application-icon_469489-917.jpg?size=626&ext=jpg&ga=GA1.1.685551602.1726315012&semt=ais_hybrid" alt=''/>
                </div>
                <div  className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                  <div>
                    <h4>Condemned</h4>
                    <h2>50</h2>
                  </div>
                  <hr style={{width:'80%'}}/>
                  <div>
                    <h4>Condemned</h4>
                    <h2>20</h2>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div  className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mt-4">
            <div  className="inforide">
              <div  className="row">
                <div  className="col-lg-3 col-md-4 col-sm-4 col-4 ridefour">
                    <img src="https://img.freepik.com/premium-photo/colorful-sign-with-word-graphite-it_1034033-107092.jpg?size=626&ext=jpg&ga=GA1.1.685551602.1726315012&semt=ais_hybrid" alt=''/>
                </div>
                <div  className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                  <div>
                    <h4>Lost</h4>
                    <h2>50</h2>
                  </div>
                  <hr style={{width:'80%'}}/>
                  <div>
                    <h4>Lost</h4>
                    <h2>10</h2>
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

export default HomePage