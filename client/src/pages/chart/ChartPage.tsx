import { Pie } from "@ant-design/plots";
import { Button } from "antd";
import { PersonType } from "src/types";
import { useStore } from "src/zustand";

type CityPopulationCount = {
  [city: string]: number;
};

type Props = {
  setPage: React.Dispatch<React.SetStateAction<"home" | "chart">>;
};

export const ChartPage: React.FC<Props> = ({ setPage }) => {
  const { data } = useStore();

  const citiesByPopulation = data.reduce(
    (acc: CityPopulationCount, user: PersonType) => {
      const { city } = user.address;
      acc[city] = acc[city] ? acc[city] + 1 : 1;
      return acc;
    },
    {}
  );

  const totalPopulation = Object.values(citiesByPopulation).reduce(
    (total, count) => total + count,
    0
  );

  const pieChartData = Object.entries(citiesByPopulation).map(
    ([type, value]) => ({ type, value })
  );

  const config = {
    appendPadding: 10,
    data: pieChartData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.5,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false as const,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        formatter: function formatter() {
          return `total\n${totalPopulation}`;
        },
      },
    },
  };
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
        <Button type="primary" onClick={() => setPage("home")}>
          Back
        </Button>
      </div>
      <Pie {...config} />
    </div>
  );
};
