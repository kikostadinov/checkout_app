import { useGetCountriesQuery } from '../features/countriesApi';
import { selectCountry } from '../features/countriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCitiesOfSelectedCountry } from '../features/countriesSlice';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import InputField from './InputField';
import { AutoComplete, Button, Form, Modal } from 'antd';
import StepTwo from './StepTwo';
import { useNavigate } from 'react-router-dom';
import { addUserData } from '../features/userSlice';

interface IFormData {
  name: string;
  email: string;
  country: string;
  city: string;
}

export default function StepOne() {
  const { data: countries, isFetching } = useGetCountriesQuery({});
  const dispatch = useDispatch();
  const cities: string[] = useSelector(selectCitiesOfSelectedCountry);
  const [userData, setUserData] = useState<IFormData>(
    { name: '', email: '', country: '', city: '' }
  );
  const { control, trigger, getValues, handleSubmit, formState: { errors, isValidating },
  } = useForm<IFormData>();
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
    : countries.data.map((country) => ({ value: country.country }))

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

  const onSubmit = (data) => {
    console.log(data, 'submit');
    dispatch(addUserData(data));
    navigate('/receipt');
  };

  const handleConfirm = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="step-one">
      <form>
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
            <h2>User details</h2>
            <InputField
              label={"Name"}
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              errors={errors}
              placeholder="Enter your name"
            />

            <InputField
              label="Email"
              name="email"
              rules={{ required: "Email is required" }}
              control={control}
              errors={errors}
              placeholder="Enter your email"
            />

            <Form.Item label="Country" rules={[{ required: true }]}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <AutoComplete
                    options={countriesOptions}
                    style={{ width: 200 }}
                    onSelect={handleCountryChange}
                    filterOption={(inputValue, option) =>
                      option?.value?.toString().toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1}
                    placeholder="Select country"
                    {...field}
                  />
                )}
              />
              {errors.country && <p role="alert">{errors.country.message}</p>}
            </Form.Item>

            <Form.Item label="City" rules={[{ required: true }]}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <AutoComplete
                    options={cityOptions}
                    style={{ width: 200 }}
                    onSelect={handleCountryChange}
                    filterOption={(inputValue, option) =>
                      option?.value?.toString().toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1}
                    placeholder="Select city"
                    {...field}
                  />
                )}
              />
              {errors.city && <p role="alert">{errors.city.message}</p>}
            </Form.Item>

            <Button
              type="primary"
              onClick={() => {
                handleButtonClick();
                setTriggered(true);
                trigger(["name", "email", "country", "city"]);
              }}
            >
              Next
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
