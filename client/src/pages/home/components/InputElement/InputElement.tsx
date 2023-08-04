import { Form, Input } from "antd";
import { AddUserValidations } from "src/config";
import { UserFormType } from "src/types";

type Props = {
  label: string;
  registerName: keyof UserFormType;
};

export const InputElement: React.FC<Props> = ({ label, registerName }) => {
  return (
    <Form.Item
      label={label}
      name={registerName}
      rules={AddUserValidations[registerName]}
      hasFeedback
    >
      <Input placeholder={`Type your ${registerName}`} />
    </Form.Item>
  );
};
