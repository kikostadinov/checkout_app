import { useSelector } from 'react-redux';
import { IProduct, IRootState } from '../interfaces';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export default function CartPage() {
  const cart = useSelector((state: IRootState) => state.cart.items);
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    navigate('/checkout');
  }

  return (
    <div className="cart-page">
      {cart.length === 0 ?
        (
          <div className="cart-empty">
            <div>Your cart is empty</div>
            <div className="start-shopping">
              <Link to="/">
                Start to shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className='cart-items'>
              {cart.map((item: IProduct) => (
                <div className="cart-product" key={item.id}>
                  <h3>{item.title}</h3>
                  <div className="img-wrapper">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="price">${item.price}</div>
                </div>
              ))}
            </div>
            <div className="btn-container">
              <Button
                type='primary'
                onClick={handleGoToCheckout}>
                Checkout
              </Button>
            </div>
          </>
        )}
    </div>
  );
}