import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import NotFoundPage from './components/NotFoundPage';
import Header from './components/Header';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';

import './App.css'
import ReceiptPage from './components/ReceiptPage';
import { useSelector } from 'react-redux';
import { IRootState } from './interfaces';

function App() {
  const theme = useSelector((state: IRootState) => state.theme.value);

  return (
    <main className={`${theme}`}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/cart" index element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
