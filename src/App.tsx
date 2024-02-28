import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import NotFoundPage from './components/NotFoundPage';
import Header from './components/Header';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';

import './App.css'

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/cart" index element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
