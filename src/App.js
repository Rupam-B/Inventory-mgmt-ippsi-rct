
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/pages/LoginPage';
import HomePage from './Components/pages/HomePage';
import ManageStock from './Components/pages/ManageStocks';
import OrdersMainPage from './Components/pages/OrderManagement/OrdersMainPage';
import PlaceOrderPage from './Components/pages/OrderManagement/PlaceOrderPage';
import StockTransferRequest from './Components/pages/StockTransfermanagement/StockTransferRequest';
import UserManagement from './Components/pages/UserManagement/UserManagement';
import EditUser from './Components/pages/UserManagement/EditUser';
import AddUser from './Components/pages/UserManagement/AddUser';
import AddProductPage from './Components/pages/AddProductPage';
import SearchPage from './Components/pages/SearchPage';
import StockTransferStatus from './Components/pages/StockTransfermanagement/StockTransferStatus';
import ReceiveStocksPage from './Components/pages/StockTransfermanagement/ReceiveStocksPage';
import VendorMaster from './Components/pages/VendorMaster/VendorMaster';
import ModelMaster from './Components/pages/VendorMaster/ModelMaster';
import CategoryMaster from './Components/pages/CategoryMaster';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductMaster from './Components/pages/ProductMaster';
import AddDevicePage from './Components/pages/AddDevicePage';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/SearchPage' element={<SearchPage/>}/>
        <Route path='/Users' element={<UserManagement/>}/>
        <Route path='/EditUser/:userId' element={<EditUser/>}/>
        <Route path='/AddUser' element={<AddUser/>}/>
        <Route path='/ManageStock' element={<ManageStock/>}/>
        <Route path='/OrdersMainPage' element={<OrdersMainPage/>}/>
        <Route path='/PlaceOrderPage' element={<PlaceOrderPage/>}/>
        <Route path='/StockTransferRequestPage' element={<StockTransferRequest/>}/>
        <Route path='/StockTransferstatus' element={<StockTransferStatus/>}/>
        <Route path='/ReceiveStockPage' element={<ReceiveStocksPage/>}/>
        <Route path='/AddProductPage' element={<AddProductPage/>}/>
        <Route path='/AddDevicePage' element={<AddDevicePage/>}/>
        <Route path='/vendorMaster' element={<VendorMaster/>}/>
        <Route path='/modelMaster' element={<ModelMaster/>}/>
        <Route path='/CategoryMaster' element={<CategoryMaster/>}/>
        <Route path='/ProductMaster' element={<ProductMaster/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
