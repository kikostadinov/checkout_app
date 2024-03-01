import InputField from "./InputField";
import { IUser } from "../interfaces";
import { Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';

interface IStepTwoProps {
  userData: IUser;
  control: Control<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export default function StepTwo({ userData, control, errors }: IStepTwoProps) {

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
            <p>{userData.street}</p>
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