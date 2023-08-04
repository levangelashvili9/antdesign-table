import { useState } from "react";
import { Button, Modal, Form } from "antd";
import { UserFormType } from "src/types";
import { InputElement, SelectElement } from "src/pages";
import { useStore } from "src/zustand";

export const AddUserForm = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { addUser } = useStore();

  const toggleModal = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  const onFinish = (data: UserFormType) => {
    addUser(data);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" style={{ marginLeft: 5 }} onClick={toggleModal}>
        Add
      </Button>
      <Modal
        title="Add User"
        open={isModalOpen}
        onCancel={toggleModal}
        footer={[
          <Button key="close" onClick={toggleModal}>
            Close
          </Button>,
          <Button key="submit" type="primary" form="addForm" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="addForm"
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
    </div>
  );
};
