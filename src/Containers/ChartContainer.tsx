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

  return (
    <Grid container size={12} direction="row" spacing={2}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid size={{ xs: 12, md: 8 }} direction="column">
            <LineChart
              dataByYear={dataByYear}
              marketSpendByYear={marketSpendByYear}
            />
            <BarChart
              countryCodes={countryCodes}
              dataByCountry={dataByCountry}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} direction="column">
            <PieChart
              countryCodes={countryCodes}
              dataByCountry={dataByCountry}
              type="Marketing Spend"
            />
            <PieChart
              countryCodes={countryCodes}
              dataByCountry={dataByCountry}
              type="New Customers"
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};
