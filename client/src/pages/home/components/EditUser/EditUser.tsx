import { InputElement, SelectElement } from "src/pages";
import { PersonType, UserFormType } from "src/types";
import { useStore } from "src/zustand";

import { Button, Form, Modal } from "antd";
import { useEffect } from "react";

type Props = {
  record: PersonType;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditUser: React.FC<Props> = ({ record, isOpen, setIsOpen }) => {
  const [form] = Form.useForm<UserFormType>();
  const { editUser } = useStore();

  useEffect(() => {
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      gender: record.gender,
      street: record.address.street,
      city: record.address.city,
      phone: record.phone,
    });
  }, [form, record]);

  const resetEdit = () => {
    setIsOpen(false);
  };

  const onFinish = () => {
    const values = form.getFieldsValue();
    editUser(record.id, values);
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        title="Edit User"
        open={isOpen}
        onCancel={resetEdit}
        footer={[
          <Button key="close" onClick={resetEdit}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" form="editForm" htmlType="submit">
            Save
          </Button>,
        ]}
      >
        <Form
          id="editForm"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{ span: 4 }}
        >
          <InputElement label="Name" registerName="name" />
          <InputElement label="Email" registerName="email" />
          <SelectElement label="Gender" registerName="gender" />
          <InputElement label="Street" registerName="street" />
          <InputElement label="City" registerName="city" />
          <InputElement label="Phone" registerName="phone" />
        </Form>
      </Modal>
    </>
  );
};
