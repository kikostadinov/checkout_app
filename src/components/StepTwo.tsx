import { IUser } from "../interfaces";
import { Control, FieldValues, DeepMap, FieldError, Controller } from 'react-hook-form';
import { Col, Form, Input, Row } from 'antd';

interface IStepTwoProps {
  userData: IUser;
  control: Control<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export default function StepTwo({ userData, control, errors }: IStepTwoProps) {

  return (
    <div className="step-two">
      <h3>Confirm details</h3>
      {userData
        ? (
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
            <Form.Item
              label={"Promo code"}
              labelCol={{ span: 6 }}
            >
              <Controller
                name="promoCode"
                rules={{
                  pattern: {
                    value: /^PROMO30$/i,
                    message: 'Invalid promo code'
                  }
                }}
                control={control}
                render={({ field }) => <Input {...field} style={{ maxWidth: '200px' }} />}
              />
              {errors.promoCode && <p className="error-msg" role="alert">{errors.promoCode.message}</p>}
            </Form.Item>
          </div>
        )
        : null}
    </div>
  );
}