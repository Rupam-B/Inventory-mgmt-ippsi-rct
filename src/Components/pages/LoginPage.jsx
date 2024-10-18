import React, { useEffect, useState } from 'react';
import '../css/LoginPage.css'
import { environment } from '../environment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const LoginPage = () => {

  const navigate = useNavigate();

    const [userName, setUserName ] = useState("")
    const [userPassword, setUserPassword ] = useState("")
    const [ifLoader, setIfLoader] = useState(false)

    const baseUrl = environment.baseUrl


    const handleLogin = () => {
      setIfLoader(true)
        axios.post(`${baseUrl}/auth/login`, {
          username: userName,
          password: userPassword
        },
        {
            headers: {
              'Content-Type': 'application/json'
            }
            })
            
        .then(response => {
          setIfLoader(false)
          // console.log("Login successful: ", response.data);
          localStorage.setItem("ipssi_Jwt", response.data.jwt)
          localStorage.setItem("ipssi_userId", response.data.userId)
          localStorage.setItem("ipssi_userName", response.data.userName)
          // console.log(response.data)
          navigate('/home')
          
          
        })
        .catch(error => {
          setIfLoader(false)
          console.error("Login failed: ", error.response ? error.response.data : error.message);
          alert('Wrong credentials')
        });
      };


      useEffect(()=>{
        const checkJwt=localStorage.getItem("ipssi_Jwt")
        if(checkJwt){
          navigate('/home')
        }
      },[navigate])



  return (
    <section className="h-100 gradient-form text-allign-left" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              {
                ifLoader?    
                <Loader/>:''
              }
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img 
                        src="https://ipssi.com/gifs/intelliplanner.gif"
                        style={{ width: '185px' }} 
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">   </h4>
                    </div>

                    <form>
                      <h3 className="Auth-Heading">Store Management</h3>
                      <p>Please login to your account</p>
                      <br />

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example11">Username</label>
                        <input 
                          type="email" 
                          id="form2Example11" 
                          className="form-control"
                          placeholder="Phone number or email address" 
                          name="UserName"
                          onChange={(e)=>setUserName(e.target.value)}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example22">Password</label>
                        <input 
                          type="password" 
                          id="form2Example22" 
                          className="form-control" 
                          name="UserPassword"
                          onChange={(e)=>setUserPassword(e.target.value)}
                        />
                      </div>
                      <br />

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button 
                          data-mdb-button-init 
                          data-mdb-ripple-init 
                          className="btn btn-primary btn-block mb-3 login-Button" 
                          type="button"
                          onClick={handleLogin}
                        >
                          Log in
                        </button>
                        {/* <a className="text-muted" href="#!">Forgot password?</a> */}
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        {/* <p className="mb-0 me-2">Don't have an account?</p> */}
                        {/* <button 
                          type="button" 
                          data-mdb-button-init 
                          data-mdb-ripple-init 
                          className="btn btn-outline-danger"
                        >
                          Create new
                        </button> */}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a Software company</h4>
                    <p className="small mb-0">
                      We, IntelliPlanner Software System India Pvt. Ltd. are a global software company specializing in providing vehicle movement control system and automations. In the past through our Indian operations (registered office in New Delhi and development center in Noida) we have successfully deployed GPS enabled Vehicle Tracking Services, truck dispatch systems involving wide variety of equipments like dumpers, shovels, tippers, hydras, PE Loaders etc. in industries, taxies, production plants, mines and on road vehicles in India and abroad. We have also executed Gate In and Gate out automation systems, Asset and Inventory tracking, Integrated Security and Access management solutions using RFID and other accessories.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
