
import { useSelector } from "react-redux";
import { IProduct, IRootState } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function ReceiptPage() {
  const cart = useSelector((state: IRootState) => state.cart);
  const user = useSelector((state: IRootState) => state.user.items);
  const navigate = useNavigate();

  const VAT_MULTIPLIER: number = 1.2;
  const vatPercentage = Math.round((VAT_MULTIPLIER - 1) * 100);

  const promoCodeDiscount = user.promoCode ? 0.3 : 1;
  const promoCodePersentage = Math.round(promoCodeDiscount * 100);

  const totalAmount = cart.totalAmount * VAT_MULTIPLIER * (1 - promoCodeDiscount);

  console.log(promoCodeDiscount, 'promoCodeDiscount');
  console.log(promoCodePersentage, 'promoCodePersentage');

  return (
    <div className="receipt-page">
      <h2>Receipt</h2>
      <p>Thank you for your purchase!</p>
      <br />
      <ul>
        {cart.items.map((item: IProduct) => (
          <li key={item.id}>{item.title} - ${item.price}</li>
        ))}
      </ul>
      <div>VAT: {vatPercentage}%</div>
      <div>Promo code: - {promoCodePersentage}%</div>
      <div>Total cost: ${(totalAmount).toFixed(2)}</div>
      <Button onClick={() => navigate('/')}>Go to home</Button>
    </div>
  );
}