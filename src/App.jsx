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
function App() {
  return (
    <div className="app">
     
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/order' element={<Order />} />
        <Route path='/price' element={<Price />} />
        <Route path='/user' element={<User />} />
        <Route path='/product' element={<Product />} />
        <Route path='/completed-oreder' element={<Operator />} />
        <Route path='/not-completed-oreder' element={<Notcompleted />} />
        <Route path='/single' element={<SinglePage />} />
        <Route path='*' element={<Fo4 />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
