import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';
import Product from './pages/Product';
import CartProducts from './pages/CartProducts';
import CustomerCare from './pages/CustomerCare';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductCreate from './pages/ProductCreate';
import SellOnShop from './pages/SellOnShop';
import Signup from './pages/Signup';
import Sale from './pages/Sale';
import NewArrival from './pages/NewArrival';
import Error from './pages/Error';
import UserProtected from './protectedRoute/UserProtected';
import ShippingAddress from './pages/ShippingAddress';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Search from './pages/Search';
import Category from './pages/Category';
import TrackOrder from './pages/TrackOrder';
import OrderDetail from './pages/OrderDetail';

function App() {
  return (
    <Box sx={{minWidth: "1024px"}}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/sell-on-app' element={<SellOnShop />} />
          <Route path='/customer-care' element={<CustomerCare />} />
          <Route path='/sale' element={<Sale />} />
          <Route path='/new-arrival' element={<NewArrival />} />
          <Route path='/search' element={<Search />} />
          <Route path='/slug/:slug' element={<Category />} />
          <Route path='/cartProducts' element={<UserProtected><CartProducts /></UserProtected>} />
          <Route path='/productCreate' element={<UserProtected><ProductCreate /></UserProtected>} />
          <Route path='/shipping-address' element={<UserProtected><ShippingAddress /></UserProtected>} />
          <Route path='/checkout' element={<UserProtected><Checkout /></UserProtected>} />
          <Route path='/track-order' element={<UserProtected><TrackOrder /></UserProtected>} />
          <Route path='/order/:id' element={<UserProtected><OrderDetail /></UserProtected>} />
          <Route path='/success' element={<UserProtected><Success /></UserProtected>} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
