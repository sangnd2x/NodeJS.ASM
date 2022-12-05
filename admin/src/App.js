import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/signin/signin';
import Signup from './pages/signup/signup';
import Products from './pages/products/products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
