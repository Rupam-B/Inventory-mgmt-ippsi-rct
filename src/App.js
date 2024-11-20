
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
import StatusMaster from './Components/pages/StatusMaster';
import EditProductPage from './Components/pages/EditProductPage';
import Validator from './Components/pages/Validator';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/SearchPage' element={<Validator>     <SearchPage/>      </Validator>}/>
        <Route path='/Users' element={<Validator>     <UserManagement/>      </Validator>}/>
        <Route path='/EditUser/:userId' element={<Validator>     <EditUser/>      </Validator>}/>
        <Route path='/AddUser' element={<Validator>     <AddUser/>      </Validator>}/>
        <Route path='/ManageStock' element={<Validator>     <ManageStock/>      </Validator>}/>
        <Route path='/OrdersMainPage' element={<Validator>     <OrdersMainPage/>      </Validator>}/>
        <Route path='/PlaceOrderPage' element={<Validator>     <PlaceOrderPage/>      </Validator>}/>
        <Route path='/StockTransferRequestPage' element={<Validator>     <StockTransferRequest/>      </Validator>}/>
        <Route path='/StockTransferstatus' element={<Validator>     <StockTransferStatus/>      </Validator>}/>
        <Route path='/ReceiveStockPage' element={<Validator>     <ReceiveStocksPage/>      </Validator>}/>
        <Route path='/AddProductPage' element={<Validator>     <AddProductPage/>      </Validator>}/>
        <Route path='/EditProductPage/:id' element={<Validator>     <EditProductPage/>      </Validator>}/>
        <Route path='/AddDevicePage' element={<Validator>     <AddDevicePage/>      </Validator>}/>
        <Route path='/vendorMaster' element={<Validator>     <VendorMaster/>      </Validator>}/>
        <Route path='/modelMaster' element={<Validator>     <ModelMaster/>      </Validator>}/>
        <Route path='/CategoryMaster' element={<Validator>     <CategoryMaster/>      </Validator>}/>
        <Route path='/ProductMaster' element={<Validator>     <ProductMaster/>      </Validator>}/>
        <Route path='/StatusMaster' element={<Validator>     <StatusMaster/>      </Validator>}/>
      </Routes>
      
    </div>
  );
}

export default App;
