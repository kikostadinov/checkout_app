import InputField from "./InputField";

export default function StepTwo({ userData, control, errors }) {

  return (
    <div className="step-two">
      <h2>Confirm details</h2>
      {userData
        ? (
          <div>
            <p>{userData.name}</p>
            <p>{userData.email}</p>
            <p>{userData.country}</p>
            <p>{userData.city}</p>
          </div>
        )
        : null}
      <div className="promo-code">
        <InputField
          label={"Promo code (optional)"}
          name="promoCode"
          control={control}
          errors={errors}
          placeholder="Enter your name"
        />
      </div>
    </div>
  );
}