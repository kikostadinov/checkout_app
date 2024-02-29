import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

export default function InputField({ label, name, errors, ...rest }) {
  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        render={({ field }) => <Input {...field} />}
        {...rest}
      />
      {errors[name] && <p role="alert">{errors[name].message}</p>}
    </Form.Item>
  );
}