import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { environment } from '../environment';
import axios from 'axios';
import { toast } from 'react-toastify';

const Validator = ({ children }) => {
  const [ifLoader, setIfLoader] = useState(true); 
  const navigate = useNavigate();
  const baseUrl = environment.baseUrl;
  const token = localStorage.getItem('ipssi_Jwt');

  const validateToken = async () => {
    try {
      const response = await axios.get(`${baseUrl}/allDeviceStatus`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 200; 
    } catch (err) {
      toast.error(err.message || 'Token validation failed');
      return false;
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        navigate('/'); 
        return;
      }

      const isValid = await validateToken();
      if (!isValid) {
        localStorage.removeItem('ipssi_Jwt'); 
        navigate('/'); 
      } else {
        setIfLoader(false); 
      }
    };

    checkToken();
    // eslint-disable-next-line
  }, [navigate]);

  if (ifLoader) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

export default Validator;
