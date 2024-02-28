import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <div className="header" style={{ display: 'flex' }}>
      <nav style={{ display: 'flex' }}>
        <Link to="/">
          <h2>Online Store</h2>
        </Link>
        <Link to="/cart">
          <div className="">
            <span>Cart </span>
          </div>
        </Link>
      </nav>
    </div>
  );
}