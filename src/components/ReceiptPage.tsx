import { useSelector } from "react-redux";
import { IProduct, IRootState } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function ReceiptPage() {
  const cart = useSelector((state: IRootState) => state.cart);
  const navigate = useNavigate();

  const VAT_MULTIPLIER: number = 1.2;
  const vatPercentage = Math.round((VAT_MULTIPLIER - 1) * 100);

  const promoCodeDiscount = cart.promoCode ? 0.3 : 0;
  const promoCodePersentage = Math.round(promoCodeDiscount * 100);

  const totalAmount = cart.promoCode ?
    cart.totalAmount * VAT_MULTIPLIER * (1 - promoCodeDiscount) : cart.totalAmount * VAT_MULTIPLIER;

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
              <div>VAT: {vatPercentage}%</div>
              {cart.promoCode ?
                <div className="promo-code">
                  <i>Promo code: - {promoCodePersentage}%</i>
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