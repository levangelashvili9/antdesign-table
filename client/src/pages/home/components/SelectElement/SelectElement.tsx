import { Form, Select } from "antd";
import { AddUserValidations } from "src/config";

type Props = {
  label: string;
  registerName: keyof typeof AddUserValidations;
};

export const SelectElement: React.FC<Props> = ({ label, registerName }) => {
  return (
    <Form.Item
      label={label}
      name={registerName}
      rules={AddUserValidations[registerName]}
      hasFeedback
    >
      <Select placeholder={`Select your ${registerName}`}>
        <Select.Option value="male">Male</Select.Option>
        <Select.Option value="female">Female</Select.Option>
      </Select>
    </Form.Item>
  );
};
