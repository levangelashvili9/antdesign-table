import { DeleteFilled } from "@ant-design/icons";
import { useStore } from "src/zustand";
import { Modal } from "antd";
import { PersonType } from "src/types";

type Props = {
  record: PersonType;
};

export const DeleteUser: React.FC<Props> = ({ record }) => {
  const { deleteUser } = useStore();

  const onDeleteUser = (record: PersonType) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      okText: "Yes",
      onOk: () => {
        deleteUser(record.id);
      },
    });
  };

  return (
    <DeleteFilled
      onClick={() => onDeleteUser(record)}
      style={{ cursor: "pointer" }}
    />
  );
};
