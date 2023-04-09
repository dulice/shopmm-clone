import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import UserProtected from './protectedRoute/UserProtected';
import {CartProducts, Category, Chat, Checkout, CustomerCare, Error, Home, Login, NewArrival, OrderDetail, Product, Review, Sale, Search, SellOnShop, ShippingAddress, Signup, Success, TrackOrder} from './pages';

function App() {
  return (
    <Box sx={{minWidth: "1024px"}}>
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
        <Route path='/shipping-address' element={<UserProtected><ShippingAddress /></UserProtected>} />
        <Route path='/checkout' element={<UserProtected><Checkout /></UserProtected>} />
        <Route path='/track-order' element={<UserProtected><TrackOrder /></UserProtected>} />
        <Route path='/order/:id' element={<UserProtected><OrderDetail /></UserProtected>} />
        <Route path='/success' element={<UserProtected><Success /></UserProtected>} />
        <Route path='/review/:id' element={<UserProtected><Review /></UserProtected>} />
        <Route path='/chat/:id' element={<UserProtected><Chat /></UserProtected>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Box>
  );
}

export default App;