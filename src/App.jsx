import { Routes, Route } from 'react-router';
import { useState, useEffect} from 'react';
import './App.css'
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import axios from 'axios';

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items').then((res) => setCart(res.data))
  }, [cart])

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart}/>}/>
        <Route path="checkout" element={<CheckoutPage cart={cart} />}/>
        <Route path="orders" element={<OrdersPage />}/>
        <Route path="tracking" element={<TrackingPage />}/>
      </Routes>
    </>
  )
}

export default App
