import { useSelector } from "react-redux";
import { IProduct, IRootState } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function ReceiptPage() {
  const cart = useSelector((state: IRootState) => state.cart);
  const navigate = useNavigate();

  const VAT_MULTIPLIER: number = 0.2;
  const vatAmount = (cart.totalAmount * VAT_MULTIPLIER).toFixed(2);

  const promoCodeDiscount = cart.promoCode ? 0.3 : 0;
  const discountedValue = (cart.totalAmount * promoCodeDiscount).toFixed(2);

  const totalAmount = cart.promoCode ?
    cart.totalAmount * (1 - promoCodeDiscount) : cart.totalAmount * VAT_MULTIPLIER;

  return (
    <div className="receipt-page">
      <h2>Receipt</h2>
      {cart.items.length === 0 ?
        <p>Oops, no items added.</p>
        : (
          <>
            <h3>Thank you for your purchase!</h3>
            <br />
            <ul className="receipt-items">
              {cart.items.map((item: IProduct) => (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
            <div className="final-price">
              <div>Subtotal: ${cart.totalAmount}</div>
              <div>VAT: ${vatAmount}</div>
              {cart.promoCode ?
                <div className="promo-code">
                  <i>{cart.promoCode}: ${discountedValue}</i>
                </div>
                : null
              }
              <div>
                <strong>
                  Total cost: ${(totalAmount).toFixed(2)}
                </strong>
              </div>
            </div>
            <div className="btn-container">
              <Button
                type="primary"
                onClick={() => navigate('/')}>
                Go to home
              </Button>
            </div>
          </>
        )
      }
    </div>
  );
}