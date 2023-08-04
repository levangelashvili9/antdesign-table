import { PersonType } from "src/types";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { ReactNode } from "react";
import { useStore } from "src/zustand/store";

const DeleteHandler = (id: number | string) => {
  const { deleteUser } = useStore();
  deleteUser(id);
};

export const ColumnsConfig = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Address",
    key: "address",
    render: (record: PersonType) =>
      `${record.address.street}, ${record.address.city}`,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Actions",
    key: "5",
    render: (record: PersonType): ReactNode => (
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <DeleteFilled
          onClick={() => DeleteHandler(record.id)}
          style={{ cursor: "pointer" }}
        />
        <EditFilled style={{ cursor: "pointer" }} />
      </div>
    ),
  },
];
