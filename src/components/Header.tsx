import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../interfaces';

export default function Header() {
  const cart = useSelector((state: IRootState) => state.cart.items);

  return (
    <div className="header" style={{ display: 'flex' }}>
      <nav style={{ display: 'flex' }}>
        <Link to="/">
          <h2>Online Store</h2>
        </Link>
        <Link to="/cart">
          <div className="">
            <span>Cart </span>
            <span>{cart.length}</span>
          </div>
        </Link>
      </nav>
    </div>
  );
}