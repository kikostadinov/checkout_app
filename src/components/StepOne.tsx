import { useGetCountriesQuery } from '../features/countriesApi';
import { selectCountry } from '../features/countriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCitiesOfSelectedCountry } from '../features/countriesSlice';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import InputField from './InputField';
import { AutoComplete, Button, Form, Modal } from 'antd';
import StepTwo from './StepTwo';
import { ICountry, IRootState } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { addUserData } from '../features/userSlice';

export interface IFormData {
  name: string;
  email: string;
  country: string;
  city: string;
  street: string;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

export default function StepOne() {
  const { data: countries, isFetching } = useGetCountriesQuery({});
  const dispatch = useDispatch();
  const cities: string[] = useSelector(selectCitiesOfSelectedCountry);
  const cart = useSelector((state: IRootState) => state.cart);
  const [userData, setUserData] = useState<IFormData>(
    { name: '', email: '', country: '', city: '', street: '' }
  );
  const { control, trigger, getValues, handleSubmit, formState: { errors, isValidating },
  } = useForm<IFormData>({ defaultValues: userData, mode: 'onBlur' });
  const [showNextStep, setShowNextStep] = useState(false);
  const [isTriggered, setTriggered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isTriggered &&
      !errors.name &&
      !errors.email &&
      !errors.country &&
      !errors.city &&
      !isValidating) {
      setShowNextStep(true);
      setTriggered(false);
    }
  }, [isValidating, errors, isTriggered]);

  const countriesOptions = isFetching
    ? []
    : countries.data.map((country: ICountry) => ({ value: country.country }))

  const cityOptions = cities?.map((city: string) => ({ value: city })) || [];

  const handleCountryChange = (country: string) => {
    dispatch(selectCountry(country));
  };

  const handleButtonClick = () => {
    const values = getValues();
    setUserData(values);
  };

  const handleOnPrev = () => {
    setShowNextStep(false);
  };

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    console.log(data, 'submit');
    dispatch(addUserData(data));
    navigate('/receipt');
  };

  const handleConfirm = () => {
    handleSubmit(onSubmit)();
  };

  console.log(errors, 'errors');

  return (
    <div className="step-one">
      <Form {...layout}>
        {showNextStep ? (
          <>
            <StepTwo
              userData={userData}
              control={control}
              errors={errors}
            />
            <div className="btn-container">
              <Button onClick={handleOnPrev}>
                Back
              </Button>
              <Button
                type="primary"
                onClick={() => Modal.confirm({
                  title: 'Confirm details',
                  onOk: () => handleConfirm(),
                })}
              >
                Complete the order
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3>User details</h3>
            <InputField
              label={"Name"}
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              errors={errors}
            />

            <InputField
              label="Email"
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address'
                }
              }}
              control={control}
              errors={errors}
            />

            <Form.Item label="Country" rules={[{ required: true }]}>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <AutoComplete
                    options={countriesOptions}
                    onSelect={handleCountryChange}
                    filterOption={(inputValue, option) =>
                      option?.value?.toString().toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1}
                    placeholder="Select country"
                    {...field}
                  />
                )}
              />
              {errors.country && <p className="error-msg" role="alert">{errors.country.message}</p>}
            </Form.Item>

            <Form.Item label="City" rules={[{ required: true }]}>
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <AutoComplete
                    options={cityOptions}
                    onSelect={handleCountryChange}
                    filterOption={(inputValue, option) =>
                      option?.value?.toString().toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1}
                    placeholder="Select city"
                    {...field}
                  />
                )}
              />
              {errors.city && <p className="error-msg" role="alert">{errors.city.message}</p>}
            </Form.Item>

            <InputField
              label={"Street"}
              name="street"
              control={control}
              rules={{ required: "Street is required" }}
              errors={errors}
            />

            <div className="btn-container">
              <Button onClick={() => navigate('/')}>
                Back
              </Button>
              <Button
                type="primary"
                disabled={
                  cart.items.length === 0 ||
                  !(Object.keys(errors).length === 0)
                }
                onClick={() => {
                  handleButtonClick();
                  setTriggered(true);
                  trigger(["name", "email", "country", "city"]);
                }}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
