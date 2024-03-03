import { IUser } from "../interfaces";
import { Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';
import { Col, Input, Row } from 'antd';
import { IFormData } from "./StepOne";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setPromoCode } from "../features/cartSlice";
import { debounce } from 'lodash';

interface IStepTwoProps {
  userData: IUser;
  control: Control<IFormData>;
  errors: DeepMap<FieldValues, FieldError>;
}

export default function StepTwo({ userData }: IStepTwoProps) {
  const dispatch = useDispatch();
  const [onPromoCodeChange, setOnPromoCodeChange] = useState('');
  const [error, setError] = useState('');

  const debouncedPromoCodeSubmit = debounce((promoCode) => {
    if (promoCode === 'PROMO30') {
      dispatch(setPromoCode(promoCode));
      setError('');
    } else {
      dispatch(setPromoCode(null));
      setError('Invalid promo code.');
    }
  }, 500);

  useEffect(() => {
    if (onPromoCodeChange) {
      debouncedPromoCodeSubmit(onPromoCodeChange);
    }
    return debouncedPromoCodeSubmit.cancel;
  }, [onPromoCodeChange, debouncedPromoCodeSubmit]);

  return (
    <div className="step-two">
      <h3>Confirm details</h3>
      {userData
        ? (
          <>
            <div className="user-data">
              <Row>
                <Col span={6}>Name:</Col>
                <Col>
                  <i>{userData.name}</i>
                </Col>
              </Row>
              <Row>
                <Col span={6}>Email:</Col>
                <Col>
                  <i>{userData.email}</i>
                </Col>
              </Row>
              <Row>
                <Col span={6}>Country:</Col>
                <Col>
                  <i>{userData.country}</i>
                </Col>
              </Row>
              <Row>
                <Col span={6}>City:</Col>
                <Col>
                  <i>{userData.city}</i>
                </Col>
              </Row>
              <Row>
                <Col span={6}>Street:</Col>
                <Col>
                  <i>{userData.street}</i>
                </Col>
              </Row>
            </div>
            <div className="promo-code">
              <Row>
                <Col span={6}>Promo code:</Col>
                <Col>
                  <Input
                    name="promoCode"
                    placeholder="Enter promo code"
                    onChange={(e) => setOnPromoCodeChange(e.target.value)}
                  />
                  {error && <div className="error-msg" style={{ color: 'red' }}>{error}</div>}
                </Col>
              </Row>
            </div>
          </>
        )
        : null}
    </div>
  );
}

