import { FC, memo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { DataByCountry } from "../Types/ChartDataTypes";
import { toCountryLabel } from "../Util/LabelUtil";
import { ChartDataUtil } from "../Util/ChartDataUtil";
import { Colors } from "../Types/Colors";

interface Props {
  countryCodes: string[];
  dataByCountry: DataByCountry;
  type: "Marketing Spend" | "New Customers";
}

const PieChart: FC<Props> = memo(({ countryCodes, dataByCountry, type }) => {
  const data = {
    labels: countryCodes.map(toCountryLabel),
    datasets: [
      {
        label: type,
        data:
          type === "Marketing Spend"
            ? ChartDataUtil.marketingSpendByCountry(
                countryCodes,
                dataByCountry,
                false
              )
            : ChartDataUtil.newCustomersByCountry(
                countryCodes,
                dataByCountry,
                false
              ),
        backgroundColor: [
          Colors.Red80,
          Colors.Green80,
          Colors.Blue80,
          Colors.Orange80,
          Colors.Purple80,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    canvas: {
      width: 20,
    },
    plugins: {
      title: {
        display: true,
        text: type,
      },
    },
    cutout: "50%",
  };

  ChartJS.register(ArcElement);

  ChartJS.defaults.color = "white";

  return <Pie data={data} options={options} />;
});

export default PieChart;
