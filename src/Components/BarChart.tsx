import { FC, memo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DataByCountry } from "../Types/ChartDataTypes";
import { ChartDataUtil } from "../Util/ChartDataUtil";
import { toCountryLabel } from "../Util/LabelUtil";
import { Colors } from "../Types/Colors";

interface Props {
  countryCodes: string[];
  dataByCountry: DataByCountry;
}

const BarChart: FC<Props> = memo(({ countryCodes, dataByCountry }) => {
  const data = {
    labels: countryCodes.map(toCountryLabel),
    datasets: [
      {
        label: "Marketing Spend",
        data: ChartDataUtil.marketingSpendByCountry(
          countryCodes,
          dataByCountry,
          false
        ),
        backgroundColor: Colors.Blue,
        stack: "Actual",
      },
      {
        label: "New Customers",
        data: ChartDataUtil.newCustomersByCountry(
          countryCodes,
          dataByCountry,
          false
        ),
        backgroundColor: Colors.Green,
        stack: "Projected",
      },
      {
        label: "Marketing Spend (Forecast)",
        data: ChartDataUtil.marketingSpendByCountry(
          countryCodes,
          dataByCountry,
          true
        ),
        backgroundColor: Colors.Blue50,
        stack: "Actual",
      },
      {
        label: "New Customers (Forecast)",
        data: ChartDataUtil.newCustomersByCountry(
          countryCodes,
          dataByCountry,
          true
        ),
        backgroundColor: Colors.Green50,
        stack: "Projected",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Market spend vs new customers by country",
      },
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  ChartJS.defaults.color = "white";

  return <Bar data={data} options={options} />;
});

export default BarChart;
