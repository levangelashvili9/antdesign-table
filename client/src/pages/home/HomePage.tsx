import { Button } from "antd";
import { Table, AddUserForm } from "./components";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<"home" | "chart">>;
};

export const HomePage: React.FC<Props> = ({ setPage }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <Button type="primary" onClick={() => setPage("chart")}>
          See Chart
        </Button>
      </div>
      <AddUserForm />
      <Table />
    </div>
  );
};
