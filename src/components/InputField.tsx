import { Form, Input } from "antd";
import { Controller, FieldErrors } from "react-hook-form";
import { IFormData } from "./StepOne";

export default function InputField({
  label, name, errors, ...rest
}: {
  label: string,
  name: string,
  errors: FieldErrors<IFormData>,
  [key: string]: unknown
}) {

  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        render={({ field }) => <Input {...field} />}
        {...rest}
      />
      {errors && errors[name as keyof IFormData] &&
        <p className="error-msg" role="alert">
          {
            errors[name as keyof IFormData]?.message ?? ""
          }
        </p>}
    </Form.Item>
  );
}