import { useEffect, useState } from "react";
import { useStore } from "src/zustand";
import { PersonType } from "src/types";

import { Table as TableComponent } from "antd";
import { DeleteUser, EditUser } from "src/pages";

export const Table = () => {
  const { data, fetchData } = useStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userRecord, setUserRecord] = useState<PersonType>({
    id: "",
    name: "",
    email: "",
    gender: "",
    address: {
      street: "",
      city: "",
    },
    phone: "",
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEditUser = (record: PersonType) => {
    setIsOpen(true);
    setUserRecord(record);
  };

  const columns = [
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
      render: (record: PersonType) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <DeleteUser record={record} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <TableComponent
        dataSource={data}
        columns={columns}
        rowKey="id"
        onRow={(record: PersonType) => ({
          onDoubleClick: () => onEditUser(record),
        })}
      />
      <EditUser record={userRecord} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
