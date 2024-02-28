import { useSelector } from 'react-redux';
import { IProduct, IRootState } from '../interfaces';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const cart = useSelector((state: IRootState) => state.cart.items);
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    navigate('/checkout');
  }

  return (
    <div className="cart-page">
      <h2>Cart</h2>
      <ul>
        {cart.map((item: IProduct) => (
          <li key={item.id}>{item.title} - ${item.price}</li>
        ))}
      </ul>
      <button onClick={handleGoToCheckout}>Checkout</button>
    </div>
  );
}