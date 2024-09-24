import { FC, memo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DataByYear, MarketSpendByYear } from "../Types/ChartDataTypes";
import { Colors } from "../Types/Colors";
import { useChartStyling } from "../Hooks/useChartStyling";

interface Props {
  dataByYear: DataByYear;
  marketSpendByYear: MarketSpendByYear;
}

const LineChart: FC<Props> = memo(({ dataByYear, marketSpendByYear }) => {
  const { legendStyling } = useChartStyling();

  const lineChartData = {
    labels: Object.keys(dataByYear),
    datasets: [
      {
        label: "Actual Spend",
        data: marketSpendByYear.actual,
        borderColor: Colors.Purple,
      },
      {
        label: "Forecast Spend",
        data: marketSpendByYear.forecast,
        borderColor: Colors.Purple50,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Market spend over time",
      },
      legend: legendStyling,
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  ChartJS.defaults.color = "white";

  return <Line data={lineChartData} options={options} />;
});

export default LineChart;
