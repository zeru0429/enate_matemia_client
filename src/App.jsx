import React from 'react';
import { Link,Route,Routes,BrowserRouter } from 'react-router-dom'

import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//components
import Navbar from './components/navbar/CollapsibleExample'
import Footer from './components/footer/Footer'

//pages
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Order from './pages/order/Order'
import Price from './pages/price/Price'
import User from './pages/user/user'
import Product from './pages/product/Product'
import Fo4 from './pages/fo4/Fo4 '
import SinglePage from './components/singlePage/SinglePage';
import Operator from './pages/operator/Operator';
import Notcompleted from './pages/operator/Notcompleted';
import Profile from './pages/profile/Profile'
function App() {
  return (
    <div className="app">
     
      
      <Routes>
        <Route path='/' element={<><Navbar /><Home /></>} />
        <Route path='/login' element={<><Login /></>} /> 
        <Route path='/order' element={<><Navbar /><Order /></>} />
        <Route path='/price' element={<><Navbar /><Price /></>} />
        <Route path='/user' element={<><Navbar /><User /></>} />
        <Route path='/product' element={<><Navbar /><Product /></>} />
        <Route path='/completed-oreder' element={<><Navbar /><Operator /></>} />
        <Route path='/not-completed-oreder' element={<><Navbar /><Notcompleted /></>} />
        <Route path='/single' element={<><Navbar /><SinglePage /></>} />
         <Route path='/profile' element={<><Navbar /><Profile /></>} />
        <Route path='*' element={<><Navbar /><Fo4 /></>} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
