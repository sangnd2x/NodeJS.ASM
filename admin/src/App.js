import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/signin/signin';
import Signup from './pages/signup/signup';
import DashBoard from './pages/dashboard/dashboard';
import Products from './pages/products/products';
import AddProduct from './pages/addProduct/addProduct';
import ChatRooms from './pages/chatrooms/chatrooms';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/products' element={<Products />} />
        <Route path='/new-product' element={<AddProduct />} />
        <Route path='/chatrooms' element={<ChatRooms />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
