import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  type: string;
  label?: string;
  disabled?: boolean;
};
const PHInput = ({ name, type, label, disabled }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              size="large"
              {...field}
              type={type}
              id={name}
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
