
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function ReceiptPage() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const VAT_MULTIPLIER: number = 1.2;
  const vatPercentage = Math.round((VAT_MULTIPLIER - 1) * 100);

  return (
    <div className="receipt-page">
      <h2>Receipt</h2>
      <p>Thank you for your purchase!</p>

      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>{item.title} - ${item.price}</li>
        ))}
      </ul>
      <div>VAT: {vatPercentage}%</div>
      <div>Total cost: {cart.totalAmount * VAT_MULTIPLIER}</div>
      <Button onClick={() => navigate('/')}>Go to home</Button>
    </div>
  );
}