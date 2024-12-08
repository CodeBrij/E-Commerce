import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Products from './components/ProductComponent';
import Login from './components/Login';
import UpdateProduct from './components/UpdateProduct';
import PrivateComponent from './components/PrivateComponent';
import AddProduct from './components/AddProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>

        //this means ki ye route mein jo hai woh outlet hai
        //agar PrivateComponent.js mein Outlet load hona hoga toh yeh route mein wrapped cheezein dikhenge
        <Route element={<PrivateComponent />}>
        <Route path='/' element={<Products />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/update/:id' element={<UpdateProduct/>} />
        <Route path='/logout' element={<h1>Logged Out</h1>} />
        <Route path='/profile' element={<h1>Profile</h1>} />
        </Route>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
