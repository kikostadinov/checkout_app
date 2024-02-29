import StepOne from "./StepOne";

export default function CheckoutPage() {

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="steps-wrapper">
        <StepOne />
      </div>
    </div>
  );
}