import { useChartData } from "../Hooks/useChartData";
import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
import LineChart from "../Components/LineChart";
import { CircularProgress, Grid2 as Grid } from "@mui/material";

export const ChartContainer = () => {
  const {
    isLoading,
    countryCodes,
    dataByCountry,
    dataByYear,
    marketSpendByYear,
  } = useChartData();

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={2} padding={2} maxWidth="1280px">
      <Grid size={{ xs: 12, sm: 8 }}>
        <LineChart
          dataByYear={dataByYear}
          marketSpendByYear={marketSpendByYear}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <PieChart
          countryCodes={countryCodes}
          dataByCountry={dataByCountry}
          type="Marketing Spend"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 8 }}>
        <BarChart countryCodes={countryCodes} dataByCountry={dataByCountry} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <PieChart
          countryCodes={countryCodes}
          dataByCountry={dataByCountry}
          type="New Customers"
        />
      </Grid>
    </Grid>
  );
};
