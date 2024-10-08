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
import { useChartStyling } from "../Hooks/useChartStyling";

interface Props {
  countryCodes: string[];
  dataByCountry: DataByCountry;
}

const BarChart: FC<Props> = memo(({ countryCodes, dataByCountry }) => {
  const { legendStyling } = useChartStyling();

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
        backgroundColor: Colors.Blue80,
        stack: "Actual",
      },
      {
        label: "New Customers",
        data: ChartDataUtil.newCustomersByCountry(
          countryCodes,
          dataByCountry,
          false
        ),
        backgroundColor: Colors.Orange50,
        stack: "Projected",
      },
      {
        label: "Marketing Spend (Forecast)",
        data: ChartDataUtil.marketingSpendByCountry(
          countryCodes,
          dataByCountry,
          true
        ),
        backgroundColor: Colors.Green80,
        stack: "Actual",
      },
      {
        label: "New Customers (Forecast)",
        data: ChartDataUtil.newCustomersByCountry(
          countryCodes,
          dataByCountry,
          true
        ),
        backgroundColor: Colors.Red50,
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
      legend: legendStyling,
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
