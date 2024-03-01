import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../interfaces';

export default function Header() {
  const cart = useSelector((state: IRootState) => state.cart.items);

  return (
    <header>
      <nav>
        <Link to="/">
          <h2>Online Store</h2>
        </Link>
        <Link to="/cart">
          <div className="nav-cart">
            <span>Cart</span>
            <span className='nav-quantity'>{cart.length}</span>
          </div>
        </Link>
      </nav>
    </header>
  );
}